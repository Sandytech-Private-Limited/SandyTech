---
title: "Building NexusEd: Real-Time EdTech Platform Architecture with WebRTC & GPT-4o"
slug: nexused-realtime-edtech-architecture
description: kothapallisandeep at SandyTech shares the full architecture behind NexusEd (nexused.net) — a real-time EdTech platform built with WebRTC mesh classrooms, Socket.io signaling, GPT-4o Vision AI tutoring, Razorpay Route marketplace payments, and MongoDB. How sandytech took NexusEd from zero to production in 12 weeks, and the hard lessons learned scaling WebRTC.
imageUrl: https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
category: Architecture
date: 2024-11-05
readTime: 14 min read
keywords: ["kothapallisandeep", "sandeepkothapalli", "sandytech", "NexusEd", "WebRTC", "EdTech architecture", "GPT-4o Vision", "real-time classroom", "Socket.io", "Razorpay Route", "tutor marketplace", "MongoDB", "live video", "AI tutor"]
hashtags: ["#NexusEd", "#WebRTC", "#EdTech", "#GPT4o", "#SandyTech", "#KothapalliSandeep", "#SocketIO", "#RealTimeArchitecture", "#MongoDB", "#TutorMarketplace"]
---

# Building NexusEd: Real-Time EdTech Platform Architecture with WebRTC & GPT-4o

NexusEd (nexused.net) is a tutor marketplace with live multi-party video classrooms, an AI tutoring assistant that can see and analyse whiteboard content, and a full booking and payout system. It went from an architectural concept to production in 12 weeks.

This is the technical story — architecture decisions, the specific problems we hit with WebRTC, how GPT-4o Vision ended up in the classroom, and what I would do differently.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Next.js Frontend (nexused.net)               │
│   Marketplace UI  │  Classroom UI  │  Dashboard  │  AI Tutor    │
└──────────┬─────────────────┬────────────────────────────────────┘
           │                 │
    REST API │         WebSocket│
           │                 │
┌──────────▼──────┐   ┌──────▼────────────┐
│  .NET 8 API     │   │  Node.js Signaling │
│  (App Service)  │   │  Server (Socket.io) │
└──────────┬──────┘   └──────┬────────────┘
           │                 │
    ┌──────┴──────┐   ┌──────┴──────┐
    │  MongoDB    │   │  WebRTC     │
    │  (CosmosDB  │   │  Mesh / SFU │
    │  for Mongo) │   │  (mediasoup)│
    └─────────────┘   └─────────────┘
           │
    ┌──────┴──────────────────────────┐
    │  Azure OpenAI (GPT-4o Vision)   │
    │  Razorpay Route (Payments)      │
    │  Azure Blob Storage (Recordings)│
    └─────────────────────────────────┘
```

---

## WebRTC: Mesh vs. SFU, and the Decision We Changed

The first version of the NexusEd classroom used a **full mesh topology**. Every participant connects directly to every other participant via peer-to-peer WebRTC. Simple to implement, zero server-side media handling.

It worked fine for 2 participants. At 4 participants (1 tutor + 3 students, a common session size), upload bandwidth per client was 3 streams. At 6 participants, it was 5 streams. On an average Indian home connection, 5 simultaneous upload streams at 720p caused visible quality degradation and, worse, occasional connection drops mid-session.

We migrated to **mediasoup** (a Node.js SFU — Selective Forwarding Unit) in week 7 of the project. In an SFU topology, each client sends one stream to the server. The server forwards it to other participants. Upload bandwidth per client stays constant regardless of room size.

The migration was painful because it happened mid-project, but it was the right call. Here is what the signaling flow looks like with mediasoup:

```javascript
// Client side — joining a room
const socket = io(SIGNALING_SERVER_URL);

socket.emit("join-room", { roomId, userId });

socket.on("room-joined", async ({ routerRtpCapabilities }) => {
  await device.load({ routerRtpCapabilities });

  // Create send transport
  socket.emit("create-transport", { direction: "send" });
});

socket.on("transport-created", async ({ transportParams, direction }) => {
  if (direction === "send") {
    sendTransport = device.createSendTransport(transportParams);

    sendTransport.on("connect", ({ dtlsParameters }, callback) => {
      socket.emit("connect-transport", {
        transportId: sendTransport.id,
        dtlsParameters,
      });
      socket.once("transport-connected", callback);
    });

    sendTransport.on("produce", async ({ kind, rtpParameters }, callback) => {
      socket.emit("produce", { transportId: sendTransport.id, kind, rtpParameters });
      socket.once("producer-created", ({ producerId }) => callback({ id: producerId }));
    });

    // Start producing from camera/mic
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    await sendTransport.produce({ track: stream.getVideoTracks()[0] });
    await sendTransport.produce({ track: stream.getAudioTracks()[0] });
  }
});
```

### Socket.io for Signaling

mediasoup handles media routing but not signaling (offer/answer, ICE candidate exchange). We use Socket.io for this, running in a Node.js server on Azure App Service.

Key decisions:
- **Sticky sessions** are required — Socket.io's in-memory state means a client must reconnect to the same instance. We use Azure App Service with ARR affinity enabled (the `ARRAffinity` cookie).
- **Redis adapter** for Socket.io when scaling beyond one instance — room state and socket-to-room mappings are stored in Redis so any instance can handle any socket event.

```javascript
// Signaling server — room management
const rooms = new Map(); // roomId → { router, producers, transports }

io.on("connection", (socket) => {
  socket.on("join-room", async ({ roomId, userId }) => {
    let room = rooms.get(roomId);

    if (!room) {
      const router = await worker.createRouter({ mediaCodecs });
      room = { router, producers: new Map(), transports: new Map() };
      rooms.set(roomId, room);
    }

    socket.join(roomId);
    socket.data.roomId = roomId;
    socket.data.userId = userId;

    socket.emit("room-joined", {
      routerRtpCapabilities: room.router.rtpCapabilities,
      existingProducers: Array.from(room.producers.values()),
    });
  });
});
```

---

## The AI Tutor: GPT-4o Vision on the Whiteboard

This feature started as a stretch goal and became the most-demoed capability of the platform. During a live session, the tutor or student can click "Ask AI Tutor" — it captures a frame from the whiteboard canvas (or their screen share), sends it to GPT-4o Vision along with the student's question, and streams the response back into the classroom chat.

### Whiteboard to Image

The classroom whiteboard is a `<canvas>` element (using Fabric.js). Capturing it is straightforward:

```javascript
async function captureWhiteboardAndAsk(question: string): Promise<void> {
  const canvas = fabricCanvasRef.current;
  const imageDataUrl = canvas.toDataURL({ format: "png", quality: 0.8 });

  const base64Image = imageDataUrl.split(",")[1];

  const response = await fetch("/api/ai-tutor/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      imageBase64: base64Image,
      sessionId: currentSession.id,
    }),
  });

  // Stream the response
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    appendToAiChat(decoder.decode(value));
  }
}
```

### Backend: Streaming GPT-4o Vision Response

```csharp
// .NET 8 Minimal API
app.MapPost("/api/ai-tutor/ask", async (AiTutorRequest request, HttpResponse response) =>
{
    response.Headers.ContentType = "text/plain; charset=utf-8";
    response.Headers.CacheControl = "no-cache";

    var messages = new List<ChatMessage>
    {
        new SystemChatMessage(
            "You are a helpful tutor assistant. The student has shared a whiteboard image. " +
            "Explain clearly, step by step. If there is a math problem or diagram, analyse it carefully."),
        new UserChatMessage(
            ChatMessageContentPart.CreateTextPart(request.Question),
            ChatMessageContentPart.CreateImagePart(
                new BinaryData(Convert.FromBase64String(request.ImageBase64)),
                "image/png")),
    };

    await foreach (var update in openAiClient.CompleteChatStreamingAsync(
        "gpt-4o", messages))
    {
        foreach (var part in update.ContentUpdate)
        {
            await response.WriteAsync(part.Text);
            await response.Body.FlushAsync();
        }
    }
});
```

The streaming response means the first token appears in the classroom chat within ~300ms of the request — it feels responsive even for long explanations.

---

## MongoDB: The Right Call for EdTech

NexusEd's data model is inherently document-shaped. A session has a tutor, multiple students, metadata, recordings, chat messages, AI interactions, and a booking. In a relational model, this is 7+ tables with joins. In MongoDB, it is a coherent document with embedded arrays for the simple nested data.

We use **Azure Cosmos DB for MongoDB** (the MongoDB-compatible API on Azure), which gives us:
- Familiar MongoDB driver compatibility
- Multi-region replication without operational overhead
- Serverless tier for dev/staging (cost-effective for non-prod traffic)

Schema for a session:

```javascript
{
  _id: ObjectId,
  sessionCode: "nx-abc123",
  tutorId: ObjectId,
  subject: "Mathematics",
  level: "Grade 10",
  scheduledAt: ISODate,
  durationMinutes: 60,
  status: "completed", // scheduled | active | completed | cancelled
  participants: [
    { userId: ObjectId, name: "Student Name", joinedAt: ISODate, leftAt: ISODate }
  ],
  recording: {
    blobUrl: "https://...",
    durationSeconds: 3580,
  },
  aiInteractions: [
    {
      questionText: "Can you explain this equation?",
      imageUrl: "https://...",
      response: "...",
      timestamp: ISODate,
    }
  ],
  payment: {
    razorpayPaymentId: "pay_...",
    transferId: "trf_...",
    amount: 80000, // paise
    platformFee: 8000,
    vendorAmount: 72000,
  }
}
```

---

## Booking and Payments: Razorpay Route

NexusEd is a marketplace. Tutors are independent vendors. When a student books a session, the payment flows through our platform account, with 10% retained as platform commission and 90% transferred to the tutor.

We use Razorpay Route with `on_hold: 1` — the transfer to the tutor is created at payment capture but held for 72 hours. If a student raises a dispute (class did not happen, technical failure), ops can cancel the transfer during the hold window. After 72 hours with no dispute, an Azure Function automatically releases the hold:

```csharp
// Azure Function — daily timer trigger
[Function("ReleasePendingPayouts")]
public async Task Run([TimerTrigger("0 9 * * *")] TimerInfo timer)
{
    var cutoff = DateTime.UtcNow.AddHours(-72);
    var pendingTransfers = await db.Sessions
        .Where(s => s.Payment.TransferStatus == "on_hold"
                 && s.Payment.TransferCreatedAt < cutoff
                 && s.Payment.DisputeStatus == null)
        .ToListAsync();

    foreach (var session in pendingTransfers)
    {
        await razorpayService.ReleaseTransferHold(session.Payment.TransferId);
        session.Payment.TransferStatus = "released";
    }

    await db.SaveChangesAsync();
}
```

---

## Lessons Learned Scaling WebRTC

**1. TURN servers are not optional.** About 15% of users are behind symmetric NATs (corporate networks, some ISPs) where STUN-based hole-punching fails. Without a TURN server, these users get connection errors that look like bugs. We use Cloudflare's TURN service (included in Cloudflare Stream pricing) — zero operational overhead.

**2. Plan for mobile.** WebRTC on iOS Safari has quirks around audio session interruption (calls, Siri). We added explicit reconnection logic with exponential backoff that re-establishes the peer connection after an interruption.

**3. Network quality UX.** Add a connection quality indicator early. When a participant's connection degrades, they need visible feedback — otherwise they assume the platform is broken. We measure round-trip time and packet loss via the WebRTC Stats API and show a simple 3-state indicator.

**4. Recording is harder than streaming.** Recording multi-party sessions requires server-side mixing (you cannot ask a browser to record other participants' streams). mediasoup can pipe producer streams to `ffmpeg` via a `PlainTransport`. Budget time for this — it is non-trivial.

**5. Start with SFU.** Do not build mesh and migrate later like we did. Unless your max room size is 2 people, go SFU from day one.

---

Building NexusEd was the most technically varied project I have shipped in a long time — real-time media, AI vision, marketplace payments, and institutional analytics all in one platform. The 12-week timeline was achievable because of aggressive scope discipline in week 1 and a stable architecture foundation by the end of week 2. The same principles that make a 6-week MVP possible scaled cleanly to 12 weeks.
