import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { EmailData } from '@/types/email';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

export async function POST(request: Request) {
    try {
        const body: EmailData = await request.json();

        // Validate the request body
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Missing required fields'
                },
                { status: 400 }
            );
        }

        // Sanitize the message to treat it as a string literal only
        const sanitizedMessage = String(body.message)
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
            .replace(/\n/g, "<br>");

        // Verify SMTP connection configuration
        await transporter.verify();

        // Send email with defined transport object
        const info = await transporter.sendMail({
            from: `"${body.name}" <${body.email}>`, // sender address with name
            to: `ptkurto3@gmail.com`,
            subject: `Portfolio Contact: ${body.name}`,
            text: `
From: ${body.name}
Email: ${body.email}

Message:
${body.message}
            `,
            html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #333;">New Portfolio Contact Message</h2>
    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
        <p><strong>From:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: white; padding: 15px; border-radius: 3px;">
            ${sanitizedMessage}
        </div>
    </div>
</div>
            `,
        });

        console.log('Message sent: %s', info.messageId);

        return NextResponse.json(
            {
                success: true,
                message: 'Email sent successfully',
                messageId: info.messageId
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to send email',
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            },
            { status: 500 }
        );
    }
}