"use client"

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deleteUser, sendValidationEmail } from "@lib/UserLib/service/auth";

const EmailValidationSection: React.FC = () => {
    const { data: session } = useSession();
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleSendValidationEmail = async () => {
        setMessage("");
        setError("");

        try {
            await sendValidationEmail(session?.user?.name ?? "");
            setMessage("Email de validation envoyé avec succès !");
            router.push("/");
        } catch (error: any) {
            console.error(error.message || "Échec de l'envoi de l'email de validation");
            setError(error.message || "Échec de l'envoi de l'email de validation");
        }
    };

    const handleDelete = async (userId: string) => {
        setMessage("");
        setError("");

        try {
            await deleteUser(userId);
            setMessage("Utilisateur supprimé avec succès");
            signOut({ callbackUrl: "/" });
        } catch (error: any) {
            setError(error.message || "Échec de la suppression de l'utilisateur");
        }
    };

    const handleReturnToShop = () => {
        router.push("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white shadow-2xl bg-opacity-50 rounded-lg text-center">
                <div className="p-8">
                    <h2 className="text-3xl md:text-4xl font-bold w-full mb-12 md:mb-6 title_section_contrats">
                        Bienvenue dans l'aventure !</h2>
                    <p className="mb-6 max-w-md">Cliquez sur valider pour recevoir un mail et valider votre compte, sinon vous pouvez supprimer votre compte... </p>
                    <div className="space-x-4">
                        {session?.user?.isVerified ? (
                            <button
                                onClick={handleReturnToShop}
                                className="bg-primary-color text-white py-2 px-6 rounded-md mb-4 hover:bg-red-900 transition"
                            >
                                Retour dans la boutique
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleSendValidationEmail}
                                    className="bg-[#232222] text-white py-2 px-6 rounded-md hover:bg-black transition"
                                >
                                    Validation
                                </button>
                                <button
                                    onClick={() => handleDelete(session?.user?.id ?? "")}
                                    className="bg-primary-color text-white py-2 px-6 rounded-md hover:bg-red-900 transition"
                                >
                                    Supprimer
                                </button>
                            </>
                        )}
                    </div>
                    {message && <p className="mt-4 text-green-500">{message}</p>}
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default EmailValidationSection;
