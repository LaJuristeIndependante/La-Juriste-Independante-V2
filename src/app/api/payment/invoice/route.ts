export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

export async function POST(request: Request) {
    try {
        console.log("Début de la requête POST /api/payment/invoice");

        const { email, subject, html } = await request.json();
        console.log("Requête reçue avec les données :", { email, subject });

        const mailOptions = {
            from: `"Votre Boutique" <${process.env.GMAIL_USER}>`,
            to: email,
            subject,
            html,
        };

        console.log("Options d'email configurées :", mailOptions);

        await transporter.sendMail(mailOptions);
        console.log(`Email envoyé avec succès à ${email}`);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err: any) {
        console.error("Erreur dans la fonction API :", err.message);
        console.error("Détails de l'erreur :", err);
        return NextResponse.json(
            { error: "Email sending failed", details: err.message },
            { status: 500 }
        );
    }
}


