"use client"

import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import axios from "axios";
import {updateOrderStatus} from "@lib/OrderLib/service/orders";
import {useRouter} from "next/navigation";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId") || "";
    const token = searchParams.get("token");
    const router = useRouter();
    const [customerData, setCustomerData] = useState<any>(null)
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    useEffect(()=>{
        if(token){
            axios.get(`/api/payment/success`, {params: {token, orderId}})
            .then(res => setCustomerData(res.data))
                .catch(err => console.log(err))
        }
        const updateStatus = async (): Promise<void> => {
            try {
                await updateOrderStatus(orderId, 'paid');
            } catch (err: any) {
                setErrorMessage('An error occurred while updating your order.');
                console.error('Erreur lors de la mise à jour de la commande:', err.message);
            }
        };

        updateStatus();
    }, [customerData, orderId, token])

    if(!token){
        return <div>Loading...</div>;
    }

    const orderPageReturn = () => {
        router.push("/orders");
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
            <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg text-center">
                {/* Cercle avec icône */}
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
                    <svg
                        className="w-12 h-12 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m0 0a9 9 0 11-9-9 9 9 0 019 9z"
                        ></path>
                    </svg>
                </div>
                {/* Titre principal */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Paiement réussi 🎉
                </h1>
                {customerData ? (
                    <div className="mt-4">
                        {/* Message de succès */}
                        <p className="text-lg text-gray-700 mb-6">
                            Merci pour votre achat, <span className="font-semibold">{customerData?.name}</span> !
                        </p>
                        {/* Détails du client */}
                        <ul className="text-base text-gray-600 mb-6">
                            <li>
                                <strong>Email :</strong> {customerData?.email}
                            </li>
                        </ul>
                        {/* Bouton pour voir le produit */}
                        <button
                            onClick={() => orderPageReturn()}
                            className="bg-green-500 text-white text-lg font-medium px-8 py-3 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                        >
                            Voir mon produit
                        </button>
                    </div>
                ) : (
                    <p className="text-lg text-gray-600">Chargement des données...</p>
                )}
            </div>
        </div>
    );
}
