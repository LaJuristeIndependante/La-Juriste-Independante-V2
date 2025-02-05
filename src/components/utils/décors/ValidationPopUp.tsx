// components/ValidationPopup.tsx

import React from 'react';
import Link from 'next/link';
interface ValidationPopupProps {
    title: string;
    text: string;
    link?: string;
    onClose: () => void;
}

const ValidationPopUp: React.FC<ValidationPopupProps> = ({ title, text, onClose, link }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center text-black bg-black backdrop-blur bg-opacity-50 font-light">
            <div className="bg-white flex flex-col items-center justify-center text-black shadow-lg w-full max-w-lg mx-4 p-6 rounded-lg">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                <p className="">{text}</p>
                {link && <Link className='mb-3 underline' target='_blank' href={link}>Politique de confidentialité</Link>}
                <button
                    onClick={onClose}
                    className="w-full bg-primary-color text-white py-2 rounded-md hover:opacity-90 transition"
                    >
                    FERMER LA POPUP
                </button>
            </div>
        </div>
    );
};

export default ValidationPopUp;
