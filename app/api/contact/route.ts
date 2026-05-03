import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailContent = `
New Contact Form Submission from kothapallisandeep.com

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the contact form on kothapallisandeep.com
Timestamp: ${new Date().toISOString()}
    `.trim();

    const TO_EMAIL = 'sandeepdotnet@hotmail.com';

    // Check if SMTP credentials are provided
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    
    if (!SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { error: 'SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS environment variables.' },
        { status: 500 }
      );
    }

    // Configure SMTP transporter
    // Note: Hotmail/Outlook has disabled basic authentication
    // Recommended: Use Gmail SMTP or a transactional email service
    const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
    const useSSL = SMTP_PORT === 465;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: useSSL, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS, // App password (required)
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
        ciphers: 'SSLv3'
      }
    });

    // Send email using Nodemailer
    try {
      const mailOptions = {
        from: `"${name}" <${email}>`, // User's email as sender
        to: TO_EMAIL, // Your email where you receive submissions
        replyTo: email, // User's email for replies
        subject: `Contact Form: ${subject}`,
        text: emailContent,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">kothapallisandeep.com</p>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Name:</strong> ${name}</p>
                <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a> <em style="color: #6b7280; font-size: 12px;">(Reply to this address)</em></p>
                <p style="margin: 0;"><strong style="color: #667eea;">Subject:</strong> ${subject}</p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3 style="color: #667eea; margin-top: 0;">Message:</h3>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #667eea;">
                  <p style="white-space: pre-wrap; margin: 0; color: #374151;">${message.replace(/\n/g, '<br>')}</p>
                </div>
              </div>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                  This message was sent from the contact form on <a href="https://kothapallisandeep.com" style="color: #667eea;">kothapallisandeep.com</a><br>
                  Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      
      console.log('Email sent successfully:', info.messageId);

      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      );
    } catch (smtpError: any) {
      console.error('SMTP error:', smtpError);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to send email. Please try again later or contact directly at sandeepdotnet@hotmail.com';
      
      if (smtpError.code === 'EAUTH') {
        const response = (smtpError as any).response || '';
        if (response.includes('basic authentication is disabled') || response.includes('OUTLOOK.COM')) {
          errorMessage = 'Hotmail/Outlook SMTP is no longer supported. Please update your .env.local file to use Gmail SMTP:\n\nSMTP_HOST=smtp.gmail.com\nSMTP_PORT=587\nSMTP_USER=your-email@gmail.com\nSMTP_PASS=your_gmail_app_password\n\nSee EMAIL_SETUP.md for detailed instructions.';
          console.error('❌ Hotmail/Outlook basic auth disabled. Update .env.local to use Gmail SMTP.');
          console.error('📝 Required .env.local settings:');
          console.error('   SMTP_HOST=smtp.gmail.com');
          console.error('   SMTP_PORT=587');
          console.error('   SMTP_USER=your-email@gmail.com');
          console.error('   SMTP_PASS=your_gmail_app_password');
        } else {
          errorMessage = 'Email authentication failed. Please check SMTP credentials and ensure you are using an App Password (not your regular password). For Gmail, get an App Password from: https://myaccount.google.com/apppasswords';
          console.error('SMTP authentication error. Check SMTP_USER and SMTP_PASS environment variables.');
        }
      } else if (smtpError.code === 'ECONNECTION') {
        errorMessage = 'Could not connect to email server. Please check SMTP_HOST and SMTP_PORT settings.';
        console.error('SMTP connection error. Check SMTP_HOST and SMTP_PORT.');
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
