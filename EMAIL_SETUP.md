# Email Setup Guide

This guide explains how to set up the contact form to send emails to `sandeepdotnet@hotmail.com` using Nodemailer with SMTP.

## ⚠️ Important: Hotmail/Outlook Basic Auth Disabled

**Microsoft has disabled basic authentication for Hotmail/Outlook accounts.** You cannot use Hotmail/Outlook SMTP directly anymore.

## Recommended Solution: Use Gmail SMTP

Gmail still supports App Passwords and works reliably with Nodemailer.

### Steps:

1. **Get a Gmail App Password**
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Click "Security" → "2-Step Verification" (enable it if not already enabled)
   - Scroll down to "App passwords"
   - Create a new app password for "Mail"
   - Copy the 16-character password (you'll need this for `SMTP_PASS`)

2. **Set Environment Variables**
   - Create a `.env.local` file in the root directory
   - Add the following:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your_16_character_app_password
   ```

3. **Alternative: Use a Transactional Email Service**
   For production, consider using:
   - **SendGrid** (free tier: 100 emails/day)
   - **Mailgun** (free tier: 5,000 emails/month)
   - **Amazon SES** (very affordable)
   
   These services are more reliable and don't have authentication issues.

4. **Deploy**
   - Add the same environment variables to your hosting platform (Vercel, Netlify, etc.)
   - The contact form will now send emails from the user's email address to `sandeepdotnet@hotmail.com`

## How It Works

- **From**: The user's email address (from the contact form)
- **To**: `sandeepdotnet@hotmail.com` (your email)
- **Reply To**: The user's email address (so you can reply directly)

## Testing

1. **Development Mode**
   - Set the environment variables in `.env.local`
   - Test the form - emails will be sent from the user's email address

2. **Production Mode**
   - Make sure all SMTP environment variables are set
   - The form will send actual emails

## Troubleshooting

- **"Basic authentication is disabled" error**: 
  - **Hotmail/Outlook no longer supports basic auth**
  - **Solution**: Switch to Gmail SMTP (recommended) or use a transactional email service
  - See "Recommended Solution" above for Gmail setup

- **Authentication failed (EAUTH)**: 
  - Make sure you're using an App Password, not your regular password
  - For Gmail: Generate a new App Password from Google Account Settings
  - Make sure 2-Step Verification is enabled on your Google account
  - The App Password should be 16 characters (no spaces)

- **Connection failed (ECONNECTION)**:
  - Check that `SMTP_HOST` and `SMTP_PORT` are correct
  - For Gmail: `smtp.gmail.com:587` (or `465` for SSL)
  - Make sure your firewall isn't blocking the connection

- **Emails not received**:
  - Check your spam folder
  - Verify the `SMTP_USER` email address is correct
  - Make sure the app password is correct

- **"From" address issues**:
  - Some SMTP servers may override the "from" address for security
  - The email will still show the user's email in the content and reply-to field

## Current Configuration

- **To Email**: `sandeepdotnet@hotmail.com` (hardcoded in API route)
- **SMTP Host**: Configurable via `SMTP_HOST` (default: `smtp-mail.outlook.com`)
- **SMTP Port**: Configurable via `SMTP_PORT` (default: `587`)
- **SMTP User**: Configurable via `SMTP_USER` (default: `sandeepdotnet@hotmail.com`)
- **SMTP Password**: Configurable via `SMTP_PASS` (required - use App Password)
- **From**: User's email address from the form
- **Reply To**: User's email address from the form

## Security Notes

- Never commit `.env.local` to version control
- Use App Passwords, not your regular account password
- App Passwords are more secure and can be revoked if needed
