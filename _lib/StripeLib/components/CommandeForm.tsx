"use client";

import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import convertToSubcurrency from "@lib/StripeLib/convertToSubcurrency";
import CheckoutPage from "@lib/StripeLib/components/CheckoutPage";
import {OrderDetails} from "@lib/OrderLib/type/OrderType";
import {fetchOrderDetails} from "@lib/OrderLib/service/orders";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentPage: React.FC = () => {
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    useEffect(() => {
        const getOrderDetails = async () => {
            if (!orderId) {
                setError("Aucun ID de commande fourni.");
                setLoading(false);
                return;
            }

            try {
                const fetchedOrderDetails = await fetchOrderDetails(orderId);
                setOrderDetails(fetchedOrderDetails);
            } catch (error: any) {
                setError(error.message || "Erreur lors de la récupération des détails de la commande.");
            } finally {
                setLoading(false);
            }
        };

        getOrderDetails();
    }, [orderId]);

    if (!orderDetails || (!orderDetails && !error) || loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <svg
                    className="animate-spin h-12 w-12 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                </svg>
                <p className="mt-4 text-xl text-gray-700">
                    Commande en cours de création...
                </p>
            </div>
        );
    }

    if (orderDetails?.status === 'paid') {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <svg
                    className="animate-bounce h-16 w-16 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
                <h1 className="mt-4 text-2xl font-bold text-green-700">
                    La commande a déjà été payée
                </h1>
            </div>
        );
    }

    return (
        <section className="min-h-screen flex flex-col justify-center p-10 text-center m-10 rounded-md text-black">
            <div className="md-10">
                <h1 className="text-4xl font-extrabold mb-2">Résumé de la commande</h1>
                <h2 className="text-2xl ">Total : <span
                    className="text-green-600">€ {orderDetails.amount.toFixed(2)}</span></h2>
            </div>
            <CheckoutPage orderId={orderDetails._id} amount={orderDetails.amount}/>
        </section>
    );
};

export default PaymentPage;
