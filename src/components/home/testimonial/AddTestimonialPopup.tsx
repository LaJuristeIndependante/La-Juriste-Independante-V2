import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import close_icon from '@/../public/images/common/close-icon.svg';
import edit_icon from '@/../public/images/common/edit-icon.svg';
import bg_test_popup from '@/../public/images/home/bg-testi-popup.jpg';

interface AddTestimonialPopupProps {
    setIsPopupOpen: (isOpen: boolean) => void;
    newComment: { objet: string; message: string; note: number };
    setNewComment: (comment: { objet: string; message: string; note: number }) => void;
    isEditing: boolean;
    handleSubmitComment: (e: React.FormEvent) => void;
}

export default function AddTestimonialPopup({ setIsPopupOpen, newComment, setNewComment, isEditing, handleSubmitComment, }: AddTestimonialPopupProps) {
    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(newComment.note);

    useEffect(() => {
        setRating(newComment.note);
    }, [newComment.note]);

    const handleMouseOver = (value: number) => {
        setHoverRating(value);
    };

    const handleMouseOut = () => {
        setHoverRating(0);
    };

    const handleClick = (value: number) => {
        setRating(value);
        setNewComment({ ...newComment, note: value });
    };

    const renderStars = (num: number) => {
        return Array.from({ length: num }, (_, i) => (
            <span
                key={i}
                className={`text-3xl cursor-pointer transition-colors duration-200 ${i < (hoverRating || rating) ? 'text-[#8A6300]' : 'text-gray-300'}`}
                onMouseOver={() => handleMouseOver(i + 1)}
                onMouseOut={handleMouseOut}
                onClick={() => handleClick(i + 1)}
            >
                ★
            </span>
        ));
    };

    return (
        <Modal
            className="fixed inset-0 z- bg-black bg-opacity-50 flex justify-center items-center z-50"
            overlayClassName="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-60 backdrop-blur-lg z-50 px-4 py-6 md:px-8 md:py-12"
            isOpen={true}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 relative" style={{ backgroundImage: `url(${bg_test_popup.src})` }}>
                <h2 className="md:text-4xl text-xl text-center font-bold mb-4">
                    COMMENTAIRE
                </h2>
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setIsPopupOpen(false)}
                >
                    <Image src={close_icon} alt="close icon" className="w-6 h-6 md:w-8 md:h-8 cursor-pointer" />
                </button>
                <form onSubmit={handleSubmitComment}>
                    <div className="star-notation flex items-center justify-center space-x-2 mb-6">
                        {renderStars(5)}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium">Objet:</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                            value={newComment.objet}
                            onChange={(e) => setNewComment({ ...newComment, objet: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium">Message:</label>
                        <textarea
                            className="w-full min-h-[140px] p-3 md:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 resize-none break-words"
                            placeholder="Écrivez votre témoignage ici..."
                            value={newComment.message}
                            onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#D9D9D9] flex items-center justify-center px-3 py-2 text-black font-semibold rounded-md mt-4"
                        >
                            {isEditing ? 'Mettre à jour' : 'Publier'}
                            <Image src={edit_icon} alt="edit icon" className='w-5 h-5 ml-2 md:w-6 md:h-6' />
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
