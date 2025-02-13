import React from "react";
import Link from "next/link";

const PaymentCancelledPage = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
            {/* Icône d'annulation avec animation */}
            <svg
                className="animate-pulse w-20 h-20 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>

            <h1 className="mt-4 text-3xl font-bold text-red-700">
                Paiement annulé
            </h1>
            <p className="mt-2 text-gray-600 text-center max-w-md">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Votre paiement a été annulé. Vous pouvez réessayer ou revenir à la page d'accueil pour
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                explorer d'autres options.
            </p>

            <div className="mt-6 flex space-x-4">
                <Link className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300" href="/paiement">
                    Réessayer le paiement
                </Link>
                <Link className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-300" href="/">
                   Accueil
                </Link>
            </div>
        </div>
    );
};

export default PaymentCancelledPage;
