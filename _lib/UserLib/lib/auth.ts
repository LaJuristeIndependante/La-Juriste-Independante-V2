import {connectDB} from "@lib/MongoLib/mongodb";
import User from "../models/User";
import type {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({
                    $or: [
                        { email: credentials?.email },
                        { username: credentials?.email }, // Connexion via username
                    ],
                }).select("+password");

                if (!user) throw new Error("Utilisateur introuvable");

                const passwordMatch = await bcrypt.compare(
                    credentials!.password,
                    user.password
                );

                if (!passwordMatch) throw new Error("Mot de passe incorrect");

                return {
                    id: user._id.toString(),
                    name: user.username,
                    email: user.email,
                    firstName: user.prenom,
                    lastName: user.nom,
                    isAdmin: user.isAdmin,
                    isVerified: user.isVerified,
                    dateOfBirth: user.dateOfBirth,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 3600,
        updateAge: 300,
    },
    callbacks: {
        async jwt({ token, user, account, profile }) {
            await connectDB();

            // Si l'utilisateur se connecte pour la première fois avec Google
            if (account && profile) {
                let existingUser = await User.findOne({ email: profile.email });

                if (existingUser) {
                    // Mettez à jour le token avec les données existantes
                    token.id = existingUser._id.toString();
                    token.name = existingUser.username;
                    token.email = existingUser.email;
                    token.firstName = existingUser.prenom;
                    token.lastName = existingUser.nom;
                    token.isAdmin = existingUser.isAdmin;
                    token.isVerified = existingUser.isVerified;
                    token.dateOfBirth = existingUser.dateOfBirth;
                } else {
                    // Créez un nouvel utilisateur si aucune entrée n'existe
                    existingUser = await User.create({
                        username: profile.name || "Utilisateur Google",
                        email: profile.email,
                        prenom: profile.name || "",
                        nom: profile.name || "",
                        isVerified: true, // Vérifié par Google
                    });

                    token.id = existingUser._id.toString();
                    token.name = existingUser.username;
                    token.email = existingUser.email;
                    token.firstName = existingUser.prenom;
                    token.lastName = existingUser.nom;
                    token.isAdmin = existingUser.isAdmin;
                    token.isVerified = existingUser.isVerified;
                    token.dateOfBirth = existingUser.dateOfBirth;
                }
            }

            // Si l'utilisateur est connecté via email/mot de passe
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.isAdmin = user.isAdmin;
                token.isVerified = user.isVerified;
                token.dateOfBirth = user.dateOfBirth;
            } else {
                // Vérifiez et mettez à jour les données du token depuis la base de données
                const updatedUser = await User.findById(token.id);
                if (updatedUser) {
                    token.name = updatedUser.username;
                    token.email = updatedUser.email;
                    token.firstName = updatedUser.prenom;
                    token.lastName = updatedUser.nom;
                    token.isAdmin = updatedUser.isAdmin;
                    token.isVerified = updatedUser.isVerified;
                    token.dateOfBirth = updatedUser.dateOfBirth;
                }
            }

            return token;
        },
        async session({ session, token }) {
            // Mettez à jour la session avec les données du token
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.firstName = token.firstName;
            session.user.lastName = token.lastName;
            session.user.isAdmin = token.isAdmin;
            session.user.dateOfBirth = token.dateOfBirth;
            session.user.isVerified = token.isVerified;

            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};
