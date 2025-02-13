"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {updateOrderStatus} from "@lib/OrderLib/service/orders";
import Link from "next/link";

export default function SuccessPage() {
    const router = useRouter();
    const [orderId, setOrderId] = useState<string>("");
    const [token, setToken] = useState<string | null>(null);
    const [customerData, setCustomerData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    useEffect(() => {
        // Vérifier que le code s'exécute côté client
        if (typeof window !== "undefined") {
            // Récupérer les paramètres de l'URL
            const params = new URLSearchParams(window.location.search);
            const orderIdParam = params.get("orderId") || "";
            const tokenParam = params.get("token");

            setOrderId(orderIdParam);
            setToken(tokenParam);

            if (tokenParam) {
                axios
                    .get(`/api/payment/success`, {params: {token: tokenParam, orderId: orderIdParam}})
                    .then((res) => setCustomerData(res.data))
                    .catch((err) => console.log(err));
            }

            const updateStatus = async () => {
                try {
                    await updateOrderStatus(orderIdParam, "paid");
                } catch (err: any) {
                    setErrorMessage("An error occurred while updating your order.");
                    console.error("Erreur lors de la mise à jour de la commande:", err.message);
                }
            };

            updateStatus().catch((err) => console.log(err));
        }
    }, []);

    if (!token) {
        return <div>Loading...</div>;
    }

    const orderPageReturn = () => {
        router.push("/orders");
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4">
            {/* Icône de succès animée */}
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <svg
                    className="animate-bounce w-12 h-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>
            {/* Titre */}
            <h1 className="mt-6 text-3xl font-bold text-green-700">
                Paiement réussi 🎉
            </h1>
            {customerData ? (
                <>
                    {/* Message personnalisé */}
                    <p className="mt-2 text-gray-600 text-center max-w-md">
                        Merci pour votre achat,{" "}
                        <span className="font-semibold">{customerData.name}</span> !
                    </p>
                    {/* Détails du client */}
                    <ul className="mt-4 text-base text-gray-600">
                        <li>
                            <strong>Email :</strong> {customerData.email}
                        </li>
                    </ul>
                </>
            ) : (
                <p className="mt-4 text-lg text-gray-600">Chargement des données...</p>
            )}
            {/* Lien pour revenir à l'accueil */}
            <div className="flex space-x-8 p-6">
                <button
                    onClick={orderPageReturn}
                    className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring focus:ring-green-300"
                >
                    Voir mon produit
                </button>
                <Link
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-300"
                    href="/"
                >
                    Accueil
                </Link>
            </div>
        </div>
    );
}
