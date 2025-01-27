"use client";
import { FaChevronDown } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import { downloadProductPdf } from "@lib/OrderLib/service/orders";
import { fetchOrdersByUser, deleteOrder } from "@lib/OrderLib/service/orders";
import { OrderDetails } from "@lib/OrderLib/type/OrderType";
import { useMediaQuery } from "react-responsive";

const SectionUserOrder = () => {
    const [orders, setOrders] = useState<OrderDetails[]>([]);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const fetchUserOrders = async () => {
            if (!session?.user) {
                console.error("Utilisateur non authentifié");
                return;
            }
            try {
                const fetchedOrders = await fetchOrdersByUser(session.user.id);
                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes:", error);
            }
        };

        fetchUserOrders();
    }, [session]);

    const handleDeleteOrder = async (orderId: string) => {
        try {
            await deleteOrder(orderId);
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        } catch (error) {
            console.error("Erreur lors de la suppression de la commande:", error);
        }
    };

    const handlePaymentRedirect = (orderId: string) => {
        router.push(`/paiement?orderId=${orderId}`);
    };

    const handleDownloadPdf = async (orderId: string, productId: string, productName: string) => {
        try {
            await downloadProductPdf(orderId, productId, productName);
            console.log(`Fichier PDF pour le produit ${productName} téléchargé avec succès.`);
        } catch (error: any) {
            console.error(`Erreur lors du téléchargement du fichier PDF pour ${productName}:`, error.message);
            alert(`Impossible de télécharger le fichier PDF pour ${productName}.`);
        }
    };


    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const renderOrdersByStatus = (status: "pending" | "paid", title: string) => {
        const filteredOrders = orders.filter((order) => order.status === status);

        return (
            <section className="font-lazy-dog text-black mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">{title}</h2>
                {filteredOrders.length === 0 ? (
                    <p className="text-gray-500">Aucune commande {status === "pending" ? "en attente" : "payée"} pour le moment.</p>
                ) : (
                    <ul className="space-y-6">
                        {filteredOrders.map((order) => (
                            <details
                                key={order._id}
                                className="border border-gray-200 p-6 rounded-lg bg-white shadow-lg transition-shadow duration-200 hover:shadow-xl"
                            >
                                <summary className="cursor-pointer flex flex-col md:flex-row justify-between w-full items-center text-lg font-semibold">
                                    <span className="flex items-center">
                                        <FaChevronDown />
                                        <p className="ml-2">PID de la commande: {order._id}</p>
                                    </span>
                                    {!isMobile && (
                                        <span>
                                            Montant total: €{order.amount.toFixed(2)}
                                        </span>
                                    )}
                                </summary>
                                <div className="mt-4">
                                    <p className="text-md mb-2">
                                        <strong>Montant total:</strong> €{order.amount.toFixed(2)}
                                    </p>
                                    <p className="text-md mb-2">
                                        <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-md mb-2">
                                        <strong>Statut:</strong> {order.status === "pending" ? "en attente" : order.status}
                                    </p>
                                    <p className="text-md mb-2">
                                        <strong>Articles:</strong>
                                    </p>
                                    <ul className="list-disc list-inside ml-4">
                                        {order.items.map((item) => (
                                            <li key={item.productId} className="text-sm">
                                                {item.name} (x{item.quantity}) - €{item.price.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-3 mt-4">
                                    {order.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => handleDeleteOrder(order._id)}
                                                className="px-5 py-2 bg-primary-color text-secondary-color rounded-lg hover:bg-red-900 transition duration-200 flex items-center"
                                            >
                                                Supprimer
                                                <FiTrash2 className="mr-2" />
                                            </button>
                                            <button
                                                onClick={() => handlePaymentRedirect(order._id)}
                                                className="px-5 py-2 bg-black text-secondary-color rounded hover:bg-gray-900 transition duration-200"
                                            >
                                                Payer
                                            </button>
                                        </>
                                    )}
                                    {order.status === "paid" && (
                                        <div>
                                            {order.items.map((item, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleDownloadPdf(order._id, item.productId, item.name)}
                                                    className="px-4 py-2 bg-black text-secondary-color hover:bg-gray-900 rounded transition mb-2"
                                                >
                                                    Télécharger le PDF pour {item.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </details>
                        ))}
                    </ul>
                )}
            </section>
        );
    };

    return (
        <section className="container mx-auto px-6 py-10 z-10 relative mb-20">
            {orders.length === 0 ? (
                <p className="text-center text-gray-500 text-xl">Aucune commande pour le moment.</p>
            ) : (
                <>
                    {renderOrdersByStatus("pending", "Commandes en attente")}
                    {renderOrdersByStatus("paid", "Commandes payées")}
                </>
            )}
        </section>
    );
};

export default SectionUserOrder;
