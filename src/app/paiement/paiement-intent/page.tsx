"use client";

export const dynamic = "force-dynamic";

import React, {useState, FormEvent, useEffect} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, useStripe, useElements, CardElement} from "@stripe/react-stripe-js";
import axios from "axios";
import {fetchOrderDetails, updateOrderPersonalInfo} from "@lib/OrderLib/service/orders";
import {OrderDetails} from "@lib/OrderLib/type/OrderType";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

/**
 * 1) Composant qui gère le formulaire + useStripe()
 */
const PaiementIntentForm = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

    const [personalInfo, setPersonalInfo] = useState({
        name: "",
        email: "",
        phone: "",
        address: {
            line1: "",
            line2: "",
            city: "",
            postalCode: "",
            country: "",
        },
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const stripe = useStripe();
    const elements = useElements();

    const orderId = searchParams.get("orderId");
    const installments = Number(searchParams.get("installments"));

    useEffect(() => {
        if(!installments){
            router.push(`${process.env.NEXTAUTH_URL}`)
        }
    }, [installments, router]);

    useEffect(() => {
        const getOrderDetails = async () => {
            if (!orderId) {
                setErrorMessage("Aucun ID de commande fourni.");
                setLoading(false);
                return;
            }

            try {
                const fetchedOrderDetails = await fetchOrderDetails(orderId);
                setOrderDetails(fetchedOrderDetails);
            } catch (error: any) {
                setErrorMessage(error.message || "Erreur lors de la récupération des détails de la commande.");
            } finally {
                setLoading(false);
            }
        };

        getOrderDetails();
    }, [orderId]);

    const handlePay = async (e: FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        if (!orderDetails?.amount) {
            setErrorMessage("Le montant de la commande est introuvable.");
            return;
        }

        setLoading(true);
        setErrorMessage(null);

        try {
            // Montant total
            const totalCents = orderDetails.amount * 100; // ex. 150€ => 15000
            // Montant par échéance
            const installmentAmount = Math.round(totalCents / installments);

            // 1) Créer un SetupIntent + Customer
            const createPlanRes = await axios.post("/api/payment/create-payment-plan", {
                personalInfo,
            });
            const { setupIntentClientSecret, customerId } = createPlanRes.data;

            // 2) Confirmer le SetupIntent (pour obtenir paymentMethodId)
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) throw new Error("CardElement introuvable.");

            const { setupIntent, error } = await stripe.confirmCardSetup(
                setupIntentClientSecret,
                {
                    payment_method: { card: cardElement },
                }
            );
            if (error) throw new Error(error.message);
            if (!setupIntent) throw new Error("SetupIntent non renvoyé.");

            const paymentMethodId = setupIntent.payment_method;

            // 3) Créer la subscription schedule (3 fois, etc.)
            const chargeRes = await axios.post("/api/payment/charge-installment", {
                customerId,
                paymentMethodId,
                orderId,
                installments,       // 3
                installmentAmount,  // 5000 si total=15000 => 50.00€ par mois
            });

            if (chargeRes.status !== 200) {
                throw new Error(chargeRes.data?.error || "Erreur lors de la création du schedule");
            }

            // Succès => on redirige
            router.push(`/paiement/success?token=${customerId}&orderId=${orderId}`);
        } catch (err: any) {
            console.error(err);
            setErrorMessage(err.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setPersonalInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setPersonalInfo((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value,
            },
        }));
    };

    const validatePersonalInfo = () => {
        const {name, email, phone, address} = personalInfo;
        const {line1, city, postalCode, country} = address;
        return (
            name.trim() !== "" &&
            email.trim() !== "" &&
            phone.trim() !== "" &&
            line1.trim() !== "" &&
            city.trim() !== "" &&
            postalCode.trim() !== "" &&
            country.trim() !== ""
        );
    };

    const handleNextStep = async () => {
        if (!orderId) {
            setErrorMessage("Aucun ID de commande (orderId) !");
            return;
        }

        if (step === 2 && !validatePersonalInfo()) {
            await updateOrderPersonalInfo(orderId, personalInfo)
            alert("Veuillez remplir tous les champs obligatoires avant de continuer.");
            return;
        }

        setStep(step + 1);

    };

    return (
        <div className="p-8 mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Finalisez votre commande</h2>

            {step === 1 && (
                <div className="space-y-4 text-black">
                    <h3 className="text-lg font-bold mb-2">Votre facture</h3>
                    <p>Montant à payer: €{orderDetails?.amount.toFixed(2)}</p>
                    <button
                        onClick={() => setStep(2)}
                        className="text-white w-full py-4 bg-red-500 mt-4 rounded-lg font-bold"
                    >
                        Suivant
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="text-black">
                    <h3 className="text-lg font-bold mb-2">Informations personnelles</h3>
                    <input
                        type="text"
                        name="name"
                        value={personalInfo.name}
                        onChange={handleInputChange}
                        placeholder="Nom complet"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                        type="email"
                        name="email"
                        value={personalInfo.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handleInputChange}
                        placeholder="Téléphone"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                        type="text"
                        name="line1"
                        value={personalInfo.address.line1}
                        onChange={handleAddressChange}
                        placeholder="Adresse ligne 1"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                        type="text"
                        name="line2"
                        value={personalInfo.address.line2}
                        onChange={handleAddressChange}
                        placeholder="Adresse ligne 2 (facultatif)"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                        type="text"
                        name="city"
                        value={personalInfo.address.city}
                        onChange={handleAddressChange}
                        placeholder="Ville"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                        type="text"
                        name="postalCode"
                        value={personalInfo.address.postalCode}
                        onChange={handleAddressChange}
                        placeholder="Code postal"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                        type="text"
                        name="country"
                        value={personalInfo.address.country}
                        onChange={handleAddressChange}
                        placeholder="Pays"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setStep(1)}
                            className="text-white w-1/3 py-2 bg-gray-500 rounded-lg font-bold"
                        >
                            Précédent
                        </button>
                        <button
                            onClick={handleNextStep}
                            className="text-white w-1/3 py-2 bg-red-500 rounded-lg font-bold"
                        >
                            Suivant
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4 text-black">
                    <h3 className="text-lg font-bold mb-2">Informations de paiement</h3>
                    <h1 className="text-2xl font-bold mb-4">Paiement en {installments} fois</h1>

                    {errorMessage && (
                        <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handlePay} className="space-y-4">
                        <div className="border p-4 rounded">
                            <CardElement />
                        </div>
                        <div className="flex space-x-6">
                            <button
                                type="submit"
                                disabled={!stripe || loading}
                                className="bg-red-500 text-white py-2 px-4 rounded font-semibold hover:bg-red-600 disabled:opacity-50"
                            >
                                {loading ? "Traitement..." : `Payer la 1re échéance`}
                            </button>
                            <button
                                onClick={() => setStep(2)}
                                type="button"
                                className="text-white w-1/3 py-2 bg-gray-500 rounded-lg font-bold"
                            >
                                Précédent
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

/**
 * 2) Composant "wrapper" qui met <Elements> autour
 *    et exporte le tout par défaut
 */
export default function PaiementIntentPage() {

    return (
        <section className={"min-h-screen flex justify-center items-center w-full"}>
            <Elements stripe={stripePromise}>
                <PaiementIntentForm/>
            </Elements>
        </section>
    );
}
