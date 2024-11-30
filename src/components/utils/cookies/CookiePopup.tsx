'use client';

import React from 'react';
import Link from 'next/link';

interface CookiePopupProps {
    isOpen: boolean;
    onClose: (consentGiven: boolean) => void;
}

const CookiePopup: React.FC<CookiePopupProps> = ({ isOpen, onClose }) => {
    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div className="bg-white text-black shadow-lg w-full max-w-lg mx-4 p-6 rounded-lg">
                <h2 className="text-lg font-bold mb-4">LES COOKIES SUR LAJURISTEINDEPENDANTE.COM</h2>
                <p className="text-sm mb-6">
                    LAJURISTEINDEPENDANTE utilise des cookies pour personnaliser le contenu et vous offrir une expérience sur mesure.
                    Vous pouvez gérer vos préférences et en savoir plus en cliquant sur
                    <span className='font-bold'> &quot;Paramètres des cookies&quot;</span> et à tout moment dans notre{' '}
                    <Link href="/privacy" className="underline">Politique de confidentialité</Link>.
                </p>
                <div className="flex flex-col gap-3">
                    <button
                        className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
                        onClick={() => onClose(true)}
                    >
                        TOUT ACCEPTER
                    </button>
                    <button
                        className="w-full bg-primary-color text-white py-2 rounded-md hover:opacity-90 transition"
                        onClick={() => onClose(false)}
                    >
                        ACCEPTER LES COOKIES STRICTEMENT NÉCESSAIRES
                    </button>
                    <button
                        className="w-full text-gray-500 hover:text-black underline text-sm"
                        onClick={() => console.log('Paramètres des cookies ouverts')}
                    >
                        Refuser tous les cookies
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookiePopup;
