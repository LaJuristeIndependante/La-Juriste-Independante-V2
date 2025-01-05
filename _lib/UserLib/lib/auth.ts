import { connectDB } from "@lib/MongoLib/mongodb";
import User from "../models/User";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        // Google OAuth Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // Credentials Provider (email/password login)
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Connect to MongoDB
                await connectDB();

                // Find user by email or username
                const user = await User.findOne({
                    $or: [
                        { email: credentials?.email },
                        { username: credentials?.email }, // Login via username
                    ],
                }).select("+password"); // Explicitly include password field

                if (!user) throw new Error("Utilisateur introuvable");

                // Compare passwords
                const passwordMatch = await bcrypt.compare(
                    credentials!.password,
                    user.password
                );

                if (!passwordMatch) throw new Error("Mot de passe incorrect");

                // Return user data
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
        maxAge: 3600, // 1 hour
        updateAge: 300, // Refresh session every 5 minutes
    },
    callbacks: {
        async jwt({ token, user, account, profile }) {
            // Connect to MongoDB
            await connectDB();

            // Handle Google login
            if (account && profile) {
                let existingUser = await User.findOne({ email: profile.email });

                if (existingUser) {
                    // Update token with existing user data
                    token.id = existingUser._id.toString();
                    token.name = existingUser.username;
                    token.email = existingUser.email;
                    token.firstName = existingUser.prenom;
                    token.lastName = existingUser.nom;
                    token.isAdmin = existingUser.isAdmin;
                    token.isVerified = existingUser.isVerified;
                    token.dateOfBirth = existingUser.dateOfBirth;
                } else {
                    // Create a new user if not found
                    const newUser = await User.create({
                        username: profile.name || "Utilisateur Google",
                        email: profile.email,
                        prenom: "",
                        nom: "",
                        isVerified: true, // Verified by Google
                        dateOfBirth: new Date().toISOString(),
                    });

                    // Update token with new user data
                    token.id = newUser._id.toString();
                    token.name = newUser.username;
                    token.email = newUser.email;
                    token.firstName = newUser.prenom;
                    token.lastName = newUser.nom;
                    token.isAdmin = newUser.isAdmin;
                    token.isVerified = newUser.isVerified;
                    token.dateOfBirth = newUser.dateOfBirth;
                }
            }

            // Handle login via credentials
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.isAdmin = user.isAdmin;
                token.isVerified = user.isVerified;
                token.dateOfBirth = user.dateOfBirth;
            } else if (token.id) {
                // Refresh user data from database
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
            // Update session with token data
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.firstName = token.firstName;
            session.user.lastName = token.lastName;
            session.user.isAdmin = token.isAdmin;
            session.user.isVerified = token.isVerified;
            session.user.dateOfBirth = token.dateOfBirth;

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
