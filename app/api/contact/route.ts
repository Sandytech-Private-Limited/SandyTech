import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

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
    const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    // Send email using Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: TO_EMAIL,
          replyTo: email,
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
                  <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
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
        });

        if (error) {
          console.error('Resend API error:', error);
          return NextResponse.json(
            { error: 'Failed to send email. Please try again later or contact directly at sandeepdotnet@hotmail.com' },
            { status: 500 }
          );
        }

        return NextResponse.json(
          { message: 'Email sent successfully' },
          { status: 200 }
        );
      } catch (resendError) {
        console.error('Resend error:', resendError);
        return NextResponse.json(
          { error: 'Failed to send email. Please try again later or contact directly at sandeepdotnet@hotmail.com' },
          { status: 500 }
        );
      }
    } else {
      // Development fallback - log to console
      console.log('📧 Email would be sent (RESEND_API_KEY not set):', {
        to: TO_EMAIL,
        from: FROM_EMAIL,
        subject: `Contact Form: ${subject}`,
        replyTo: email,
        content: emailContent
      });

      // In development, return success for testing
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json(
          { message: 'Email logged to console (development mode). Set RESEND_API_KEY for production.' },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: 'Email service not configured. Please contact directly at sandeepdotnet@hotmail.com' },
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

