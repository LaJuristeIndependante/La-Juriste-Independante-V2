"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import { downloadProductPdf } from "@lib/ProductLib/service/produit";
import { fetchOrdersByUser, deleteOrder } from "@lib/OrderLib/service/orders";
import { OrderDetails } from "@lib/OrderLib/type/OrderType";

const SectionUserOrder = () => {
    const [orders, setOrders] = useState<OrderDetails[]>([]);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const fetchUserOrders = async () => {
            if (!session?.user) {
                console.error("User not authenticated");
                return;
            }
            try {
                const fetchedOrders = await fetchOrdersByUser(session.user.id);
                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchUserOrders();
    }, [session]);

    const handleDeleteOrder = async (orderId: string) => {
        try {
            await deleteOrder(orderId);
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    const handlePaymentRedirect = (orderId: string) => {
        router.push(`/paiement?orderId=${orderId}`);
    };

    const handleDownloadPdf = async (productId: string, productName: string) => {
        try {
            await downloadProductPdf(productId, productName);
        } catch (error) {
            console.error("Erreur lors du téléchargement du PDF:", error);
        }
    };

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
                                className="border border-gray-200 p-6 pb-0 rounded-lg bg-white shadow-lg transition-shadow duration-200 hover:shadow-xl"
                            >
                                <summary className="cursor-pointer text-lg font-semibold">
                                    Order ID: {order._id} - Total Amount: €{order.amount.toFixed(2)}
                                </summary>
                                <div className="mt-4">
                                    <p className="text-md mb-2">
                                        <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-md mb-2">
                                        <strong>Status:</strong> {order.status}
                                    </p>
                                    <p className="text-md mb-2">
                                        <strong>Items:</strong>
                                    </p>
                                    <ul className="list-disc list-inside ml-4">
                                        {order.items.map((item) => (
                                            <li key={item.productId} className="text-sm">
                                                {item.name} (x{item.quantity}) - €{item.price.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex justify-end space-x-3 mt-4">
                                    {order.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => handleDeleteOrder(order._id)}
                                                className="px-5 py-2 bg-red-500 text-primary rounded-lg hover:bg-red-600 transition duration-200"
                                            >
                                                <FiTrash2 className="mr-2" />
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => handlePaymentRedirect(order._id)}
                                                className="px-5 py-2 bg-green-500 text-primary rounded-lg hover:bg-green-600 transition duration-200"
                                            >
                                                Pay
                                            </button>
                                        </>
                                    )}
                                    {order.status === "paid" && (
                                        <div>
                                            {order.items.map((item, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleDownloadPdf(item.productId, item.name)}
                                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition mb-2"
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
                    {renderOrdersByStatus("pending", "Pending Orders")}
                    {renderOrdersByStatus("paid", "Paid Orders")}
                </>
            )}
        </section>
    );
};

export default SectionUserOrder;
