import { getSession } from "next-auth/react";
import { hash, compare } from "bcryptjs";
import { connectDB } from "@lib/MongoLib/mongodb"

export default async function handler(req, res) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    // Get session (to check if user is authenticated)
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    const { oldPassword, newPassword } = req.body;

    if (!newPassword || newPassword.trim().length < 6) {
        return res.status(422).json({ message: "New password must be at least 6 characters long." });
    }

    const client = await connectDB();


    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    // Optional: Check if the old password is correct
    if (!isValidPassword) {
        return res.status(403).json({ message: "Old password is incorrect." });
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 12);

    // Update password in the database
    await usersCollection.updateOne(
        { email: session.user.email },
        { $set: { password: hashedPassword } }
    );

    client.close();
    res.status(200).json({ message: "Password updated successfully!" });
}