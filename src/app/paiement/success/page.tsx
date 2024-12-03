"use client"

export const dynamic = 'force-dynamic';

import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import axios from "axios";
import {fetchOrderDetails, updateOrderStatus} from "@lib/OrderLib/service/orders";
import {OrderDetails} from "@lib/OrderLib/type/OrderType";
import {downloadProductPdf} from "@lib/ProductLib/service/produit";


export default function SuccessPage() {
    const [commande, setCommande] = useState<OrderDetails>();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId") || "";
    const token = searchParams.get("token");
    const router = useRouter();
    const [customerData, setCustomerData] = useState<any>(null)
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    useEffect(() => {
        if (token) {
            axios.get(`/api/payment/success`, { params: { token, orderId } })
                .then(res => setCustomerData(res.data))
                .catch(err => console.log(err));
        }

        const updateStatus = async () => {
            try {
                await updateOrderStatus(orderId, 'paid');
            } catch (err: any) {
                setErrorMessage('An error occurred while updating your order.');
                console.error('Erreur lors de la mise à jour de la commande:', err.message);
            }
        };

        updateStatus()
            .catch(err => console.log(err));
    }, [orderId, token]);

    // const recupOrder = async () => {
    //     try {
    //         setCommande(await fetchOrderDetails(orderId));
    //     } catch (err: any) {
    //         setErrorMessage('An error occurred while updating your order.');
    //     }
    // }
    //
    // const handleDownloadPdf = async (productId: string, productName: string) => {
    //     try {
    //         await downloadProductPdf(productId, productName);
    //     } catch (error) {
    //         console.error("Erreur lors du téléchargement du PDF:", error);
    //     }
    // };
    //
    //
    // const InvoiceMail = async () => {
    //     await recupOrder()
    //         .catch(err => console.log(err));
    //
    //     let listProduct = '';
    //     let total = 0;
    //
    //     if (commande?.items && commande.items.length > 0) {
    //         for (let i = 0; i < commande.items.length; i++) {
    //             let item = commande.items[i];
    //             let product = `
    //             <div>
    //                 <p>${item.name} : ${item.price} x ${item.quantity}</p>
    //                 <a href="${process.env.NEXTAUTH_URL}/api/products/${item.productId}/pdf" style="display:inline-block;padding:10px 20px;margin-top:10px;background-color:#28a745;color:#fff;text-decoration:none;border-radius:5px;">Télécharger ${item.name}</a>
    //             </div>
    //         `;
    //             listProduct += product;
    //             total += item.price * item.quantity;
    //         }
    //     }
    //
    //     const html = `
    //     <div>
    //         <h2>Merci pour votre achat, ${commande?.name} !</h2>
    //         <p>Voici votre reçu pour la commande <strong>${orderId}</strong> :</p>
    //         ${listProduct}
    //         <p><strong>Total :</strong> ${total}€</p>
    //     </div>
    // `;
    //     let email = commande?.email;
    //     let subject = "Reçu de la commande numéro " + commande?._id + " commandé par " + commande?.name;
    //
    //     axios.post(`/api/payment/invoice`, {email, subject, html})
    //         .then(res => setCustomerData(res.data))
    //         .catch(err => console.log(err));
    // };

    if (!token) {
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
