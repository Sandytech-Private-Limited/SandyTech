# Email Setup Guide

This guide explains how to set up the contact form to send emails to `sandeepdotnet@hotmail.com`.

## Option 1: Using Resend (Recommended)

Resend is a modern email API service that's easy to set up and reliable.

### Steps:

1. **Sign up for Resend**
   - Go to [https://resend.com](https://resend.com)
   - Create a free account (100 emails/day free tier)

2. **Get your API Key**
   - Navigate to API Keys section in Resend dashboard
   - Create a new API key
   - Copy the API key (starts with `re_`)

3. **Verify your domain (Optional but Recommended)**
   - For production, verify your domain `kothapallisandeep.com`
   - Add DNS records as instructed by Resend
   - This allows you to send from `contact@kothapallisandeep.com`

4. **Set Environment Variables**
   - Create a `.env.local` file in the root directory
   - Add the following:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   FROM_EMAIL=contact@kothapallisandeep.com
   ```
   - For testing without domain verification, use: `FROM_EMAIL=onboarding@resend.dev`

5. **Deploy**
   - Add the same environment variables to your hosting platform (Vercel, Netlify, etc.)
   - The contact form will now send emails to `sandeepdotnet@hotmail.com`

## Option 2: Using Nodemailer with SMTP

If you prefer using SMTP directly (e.g., with Gmail, Outlook, or custom SMTP):

1. **Install Nodemailer**
   ```bash
   npm install nodemailer
   ```

2. **Update the API route** to use Nodemailer instead of Resend

3. **Set Environment Variables**
   ```env
   SMTP_HOST=smtp-mail.outlook.com
   SMTP_PORT=587
   SMTP_USER=sandeepdotnet@hotmail.com
   SMTP_PASS=your_app_password
   ```

## Testing

1. **Development Mode**
   - Without API key: Form will log to console
   - With API key: Form will send actual emails

2. **Production Mode**
   - Must have `RESEND_API_KEY` set
   - Otherwise, form will show error message

## Troubleshooting

- **Emails not sending**: Check that `RESEND_API_KEY` is set correctly
- **Domain not verified**: Use `onboarding@resend.dev` for testing
- **Rate limits**: Resend free tier allows 100 emails/day
- **Spam folder**: Check spam folder if emails aren't received

## Current Configuration

- **To Email**: `sandeepdotnet@hotmail.com` (hardcoded in API route)
- **From Email**: Configurable via `FROM_EMAIL` environment variable
- **Reply To**: Uses the sender's email from the form

