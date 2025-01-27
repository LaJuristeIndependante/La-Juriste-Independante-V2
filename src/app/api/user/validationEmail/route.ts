import { NextResponse } from 'next/server';
import { connectDB } from '@/../_lib/MongoLib/mongodb';
import User from '@/../_lib/UserLib/models/User';
import nodemailer from 'nodemailer';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/../_lib/UserLib/lib/auth';
import { NextRequest } from 'next/server';
import * as process from "node:process";

export async function POST(request: NextRequest) {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: 'Non autorisé' }, { status: 401 });
    }

    const { userName } = await request.json();

    try {
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
        }

        const verificationToken = user._id.toString();
        const verificationLink = `${process.env.NEXTAUTH_URL}/api/user/verifyUser?token=${verificationToken}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7; border-radius: 10px;">
            <h2 style="color: #333333; text-align: center;">Validation de votre compte</h2>
            <p style="font-size: 16px; color: #555555;">
            Bonjour ${userName},
            </p>
            <p style="font-size: 16px; color: #555555;">
            Merci de vous être inscrit sur notre site ! Pour finaliser votre inscription et commencer à utiliser tous nos services, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :
            </p>
            <div style="text-align: center; margin: 20px 0;">
            <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #232222; text-decoration: none; border-radius: 5px;">
            Confirmer mon adresse email
            </a>
            </div>
            <p style="font-size: 14px; color: #999999; text-align: center;">
            Si vous n'avez pas créé de compte chez nous, vous pouvez ignorer cet email en toute sécurité.
            </p>
            <p style="font-size: 14px; color: #999999; text-align: center;">
            Merci,<br />L'équipe de support
            </p>
            <div style="text-align: center; padding: 10px; font-size: 12px; color: #999999;">
                <p>&copy; 2024 lajuristeindependante. Tous droits réservés.</p>
            </div>
        </div>
        `;

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: session.user.email,
            subject: 'Validation de votre compte',
            text: `Cliquez sur ce lien pour valider votre compte : ${verificationLink}`,
            html: emailHtml,
        };
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ', info.response);
        return NextResponse.json({ message: 'Email de validation envoyé avec succès' }, { status: 200 });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        return NextResponse.json({ message: 'Erreur lors de l\'envoi de l\'email' }, { status: 500 });
    }
}
