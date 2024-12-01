// src/app/api/send-invoice/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or your email provider
    auth: {
        user: process.env.GMAIL_USER, // Your email (set in .env file)
        pass: process.env.GMAIL_PASS, // Password or App Password
    },
});

export async function POST(request: Request) {
    try {
        const { to, subject, htmlContent } = await request.json();

        const mailOptions = {
            from: `"Votre Boutique" <${process.env.GMAIL_USER}>`, // Sender address
            to,
            subject,
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email envoyé à ${to}`);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error('Erreur lors de l’envoi de l’email:', err);
        return NextResponse.json({ error: 'Email sending failed' }, { status: 500 });
    }
}
