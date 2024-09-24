"use client"

import { useState } from 'react';

// Define types for the Testimonial and user
interface User {
    _id: string;
    username: string;
    image: string;
}

interface Commentaire {
    _id: string;
    User: User;
    objet: string;
    message: string;
    note: number;
    dateEnvoie: string;
}

// Define a simple CommentForm modal
function CommentFormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg relative w-[400px]">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-2 right-2 text-xl">
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-4">COMMENTAIRE</h2>

                {/* Star Rating */}
                <div className="flex justify-center mb-4">
                    {Array(5).fill(0).map((_, i) => (
                        <span key={i} className="text-2xl">
                            {i < 2 ? '⭐' : '☆'}
                        </span>
                    ))}
                </div>

                {/* Comment Text Area */}
                <textarea
                    className="w-full h-24 border-2 p-2 rounded-lg mb-4"
                    placeholder="Texte"
                ></textarea>

                {/* Submit Button */}
                <button className="bg-gray-300 py-2 px-4 rounded-lg shadow-md hover:bg-gray-400 w-full flex items-center justify-center">
                    publier <span className="ml-2">✏️</span>
                </button>
            </div>
        </div>
    );
}

export default function TestimonialComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center w-full py-20 bg-white">
            <h2 className="text-3xl font-bold mb-8">Voici ce que disent mes clients:</h2>

            {/* Testimonial cards... */}
            <div className="flex flex-wrap justify-center items-center gap-6">
                {/* Add your Testimonial Cards here */}
            </div>

            {/* Button to open modal */}
            <div className="mt-8">
                <button
                    onClick={handleOpenModal}
                    className="bg-gray-300 py-2 px-4 rounded-lg shadow-md hover:bg-gray-400 flex items-center"
                >
                    Ajouter un commentaire <span className="ml-2">✏️</span>
                </button>
            </div>

            {/* Comment Form Modal */}
            <CommentFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </section>
    );
}

