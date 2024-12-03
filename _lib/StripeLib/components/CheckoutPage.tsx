"use client";

import React, { useState } from "react";
import axios from "axios";
import {updateOrderPersonalInfo} from "@lib/OrderLib/service/orders";

const CheckoutPage = ({ amount, orderId }: { amount: number; orderId: string }) => {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // État pour les étapes

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

    const checkout = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/payment', { amount, orderId, personalInfo });
            const responseData = response.data;
            window.location.href = responseData.url;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPersonalInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPersonalInfo((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value,
            },
        }));
    };

    const validatePersonalInfo = () => {
        const { name, email, phone, address } = personalInfo;
        const { line1, city, postalCode, country } = address;
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
        if (step === 2 && !validatePersonalInfo()) {
            await updateOrderPersonalInfo(orderId, personalInfo)
            alert("Veuillez remplir tous les champs obligatoires avant de continuer.");
            return;
        }
        setStep(step + 1);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center mb-6">Finalisez votre commande</h2>

            {step === 1 && (
                <div className="space-y-4 text-black">
                    <h3 className="text-lg font-bold mb-2">Votre facture</h3>
                    <p>Montant à payer: €{amount.toFixed(2)}</p>
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
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setStep(2)}
                            type="button"
                            className="text-white w-1/3 py-2 bg-gray-500 rounded-lg font-bold"
                        >
                            Précédent
                        </button>
                        <button
                            onClick={checkout}
                            className="text-white w-1/3 py-2 bg-red-500 rounded-lg font-bold disabled:opacity-50 disabled:animate-pulse"
                        >
                            {!loading ? `Payer €${amount.toFixed(2)}` : "Traitement..."}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
