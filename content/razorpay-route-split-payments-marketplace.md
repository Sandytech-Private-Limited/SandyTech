---
title: "Implementing Razorpay Route & Split Payments for Multi-Vendor Marketplaces"
slug: razorpay-route-split-payments-marketplace
description: A hands-on guide from kothapallisandeep on implementing Razorpay Route for multi-vendor marketplaces — covering linked account creation, transfer objects, split payment logic, webhook handling, idempotency keys, and reconciliation. Real patterns used in production marketplace builds in production.
imageUrl: https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
category: Architecture
date: 2025-03-15
readTime: 11 min read
keywords: ["kothapallisandeep", "sandeepkothapalli", "Razorpay Route", "split payments", "multi-vendor marketplace", "payment gateway", "linked accounts", "vendor payouts", "webhooks", "idempotency", "payment reconciliation", "India payments"]
hashtags: ["#Razorpay", "#Payments", "#Marketplace", "#SplitPayments", "#KothapalliSandeep", "#Fintech", "#NodeJS", "#APIDesign"]
---

# Implementing Razorpay Route & Split Payments for Multi-Vendor Marketplaces

Building a marketplace payment system is one of those problems that looks simple until you are three days into it and questioning your life choices. I have integrated Razorpay Route on multiple marketplace projects — a tutor marketplace (NexusEd), a freelance platform, and a service aggregator — and the same set of problems comes up every time. This post is the guide I wish existed before I started.

---

## The Core Mental Model

Razorpay Route is a **transfer-based system**, not a split-at-source system. When a customer pays ₹1,000:

1. The full ₹1,000 lands in **your platform account** (the route account)
2. You then initiate one or more **Transfer objects** to move money to **Linked Accounts** (your vendors/sellers)
3. Razorpay handles the settlement to those linked accounts on your behalf

This distinction matters for your accounting: you are the merchant of record. The vendor receives a transfer, not a direct payment.

---

## Step 1: Creating Linked Accounts

Each vendor on your platform needs a Razorpay Linked Account. Do this during onboarding:

```javascript
// POST /v1/accounts (Route API)
const razorpay = new Razorpay({
 key_id: process.env.RAZORPAY_KEY_ID,
 key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function createLinkedAccount(vendor) {
 const account = await razorpay.accounts.create({
 email: vendor.email,
 profile: {
 category: "education", // or "services", "ecommerce", etc.
 subcategory: "coaching",
 addresses: {
 registered: {
 street1: vendor.address.street,
 city: vendor.address.city,
 state: vendor.address.state,
 postal_code: vendor.address.pincode,
 country: "IN",
 },
 },
 },
 legal_business_name: vendor.businessName,
 business_type: "individual", // or "route" for a company
 legal_info: {
 pan: vendor.pan,
 },
 type: "route",
 });

 // Store account.id as vendor.razorpayAccountId in your DB
 return account;
}
```

After creating the account, you need to create a **Stakeholder** and submit the account for activation. Until activated, transfers go into a holding state. Build your onboarding flow to collect PAN, bank details, and business category upfront — activation rejections are painful to debug after go-live.

**Bank Account Linking**

```javascript
await razorpay.accounts.createStakeholder(accountId, {
 name: vendor.name,
 email: vendor.email,
 phone: { primary: vendor.phone },
 relationship: {
 director: true,
 },
 kyc_details: {
 pan: vendor.pan,
 },
});
```

---

## Step 2: Capturing a Payment

Standard Razorpay payment capture — nothing special here yet:

```javascript
// After client-side Razorpay checkout completes:
async function capturePayment(paymentId, amount, currency = "INR") {
 return await razorpay.payments.capture(paymentId, amount, currency);
}
```

Store the `payment_id` against the order in your database. You will need it for the transfer.

---

## Step 3: Creating Transfer Objects

This is where Route does its work. After capturing, initiate transfers:

```javascript
async function transferToVendor(payment, order) {
 const platformFeePercent = 0.10; // 10% platform commission
 const vendorAmount = Math.floor(order.amount * (1 - platformFeePercent));

 const transfer = await razorpay.payments.transfer(payment.id, {
 transfers: [
 {
 account: order.vendor.razorpayAccountId,
 amount: vendorAmount, // in paise
 currency: "INR",
 notes: {
 order_id: order.id,
 vendor_id: order.vendor.id,
 },
 linked_account_notes: ["order_id"], // visible to vendor
 on_hold: 0, // 0 = release immediately, 1 = hold
 }],
 });

 return transfer.items[0];
}
```

**On-hold transfers** are useful if you have a dispute window. Set `on_hold: 1` and release with a PATCH call after 7 days if no dispute is raised. We use this pattern on the NexusEd tutor marketplace — tutors receive payment 3 days after the class is marked complete.

---

## Step 4: Idempotency Keys

Network failures happen. Without idempotency, a retry can double-pay a vendor. Razorpay supports idempotency via the `X-Razorpay-Idempotency-Key` header on transfer requests. Use a deterministic key derived from your order:

```javascript
async function safeTransferToVendor(payment, order) {
 const idempotencyKey = `transfer-${order.id}-${payment.id}`;

 const response = await fetch(
 `https://api.razorpay.com/v1/payments/${payment.id}/transfers`,
 {
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 "X-Razorpay-Idempotency-Key": idempotencyKey,
 Authorization: "Basic " + Buffer.from(
 `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
 ).toString("base64"),
 },
 body: JSON.stringify({ transfers: [/* ... */] }),
 }
 );

 return response.json();
}
```

If the same key is sent twice, Razorpay returns the original response — no duplicate transfer.

---

## Step 5: Webhook Handling

Never poll for payment status. Subscribe to webhooks and process them asynchronously.

Key events for a marketplace:

| Event | Action |
|---|---|
| `payment.captured` | Trigger transfer to vendor |
| `transfer.processed` | Mark vendor payout as settled |
| `transfer.failed` | Alert ops, retry logic |
| `payment.failed` | Update order status, notify user |
| `refund.processed` | Reverse vendor transfer if within window |

```javascript
// Express webhook handler
app.post("/webhooks/razorpay", express.raw({ type: "application/json" }), async (req, res) => {
 const signature = req.headers["x-razorpay-signature"];
 const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

 const isValid = razorpay.webhooks.validateWebhookSignature(
 req.body.toString(),
 signature,
 secret
 );

 if (!isValid) return res.status(400).send("Invalid signature");

 const event = JSON.parse(req.body);

 // Idempotent processing — check if we've already handled this event
 const alreadyProcessed = await db.webhookEvents.findOne({ eventId: event.id });
 if (alreadyProcessed) return res.status(200).send("Already processed");

 await db.webhookEvents.insert({ eventId: event.id, processedAt: new Date() });

 switch (event.event) {
 case "payment.captured":
 await paymentService.handleCapture(event.payload.payment.entity);
 break;
 case "transfer.processed":
 await payoutService.handleTransferSuccess(event.payload.transfer.entity);
 break;
 // ...
 }

 res.status(200).send("OK");
});
```

Always return `200` quickly and do heavy processing in a background queue (BullMQ, Azure Service Bus). Razorpay retries webhooks with exponential backoff for up to 24 hours on non-200 responses.

---

## Step 6: Reconciliation

At month-end, you need to verify that every order's transfer matches what Razorpay actually settled. Build a daily reconciliation job:

```javascript
async function dailyReconciliation(date) {
 // Fetch all orders marked "transfer_initiated" for the date
 const orders = await db.orders.findByDate(date, "transfer_initiated");

 for (const order of orders) {
 const transfer = await razorpay.transfers.fetch(order.transferId);

 if (transfer.status === "processed") {
 await db.orders.update(order.id, {
 status: "transfer_settled",
 settledAt: new Date(transfer.processed_at * 1000),
 settledAmount: transfer.amount,
 });
 } else if (transfer.status === "failed") {
 await alertOps(`Transfer failed for order ${order.id}`);
 await retryTransfer(order);
 }
 }
}
```

Export this data to your accounting system daily. Razorpay also provides a Settlement API to fetch your own platform settlement data separately from vendor transfers.

---

## Test Mode vs. Production Mode

A few things that bite people:

1. **Test mode linked accounts** exist in isolation — you cannot use a test account ID in production. Re-create all vendor accounts after going live.
2. **KYC is not required in test mode**. Test with `on_hold: 1` to simulate the KYC-pending state you will encounter with new vendors in production.
3. **Use different webhook endpoints** for test and production. A common mistake is pointing both to the same handler and processing test events as real payouts.
4. **Razorpay fee deduction** in production means `vendor_amount + platform_fee + razorpay_fee = payment_amount`. Account for this in your reconciliation.

---

Building payment infrastructure correctly takes longer than the "it's just a Stripe integration" conversation in your sprint planning. But done right, it becomes a durable competitive advantage. The payout reliability we built into NexusEd is one of the features tutors specifically call out — they trust the platform because it pays on time, every time.
