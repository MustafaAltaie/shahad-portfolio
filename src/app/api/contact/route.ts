import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import validator from 'validator';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(req: NextRequest) {
  console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    let { name, email, message } = body;

    name = validator.escape((name || '').trim());
    email = validator.normalizeEmail((email || '').trim()) || '';
    message = validator.escape((message || '').trim());

    if (!validator.isEmail(email) || !name || !message) {
      return NextResponse.json({ success: false, error: 'Invalid input data.' }, { status: 400 });
    }

    const response = await resend.emails.send({
      from: 'contact@mustafaaltaie.uk',
      to: 'mustafaphoto111@gmail.com',
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br>${message.replace(/<[^>]+>/g, '')}</p>
        </div>
      `,
    });

    if ('id' in response && response.id) {
      return NextResponse.json({ success: true, id: response.id }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, error: response.error?.message || 'Unknown error from Resend API.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email.' }, { status: 500 });
  }
}