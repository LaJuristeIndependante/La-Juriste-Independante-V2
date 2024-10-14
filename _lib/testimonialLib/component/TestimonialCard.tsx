import React from 'react'
import Image from 'next/image';
import { Commentaire } from '@lib/testimonialLib/type/Testimonial';
import UserInitials from "@lib/UserLib/component/UserInitials"
import comment_icon from '@public/images/common/comment-icon.svg';
import { useSession } from 'next-auth/react';

interface User {
    username: string;
    _id: string;
}


interface TestimonialCardProps {
    commentaire: Commentaire;
    handleEditComment: (commentaire: Commentaire) => void;
    handleDeleteComment: (id: string) => void;
}


export default function TestimonialCard({commentaire, handleEditComment, handleDeleteComment}: TestimonialCardProps) {
  const { data: session } = useSession();

  return (
    <div className="border-2 border-black first-card bg-[#D9D9D9] flex flex-col items-center justify-between w-[250px] h-[300px] min-w-[250px] min-h-[300px] rounded-md shadow-lg p-4 relative">
    <div className="flex flex-col w-full">
        <div className="flex justify-between w-full items-center">
            <div className="flex flex-col items-center justify-center relative">
                <div className="flex items-center justify-center mb-2 relative ml-[-10px]">
                    <Image
                        src={comment_icon}
                        alt="comment-icon1"
                        className="w-9 h-9 ml-[5px]"
                    />
                    <Image
                        src={comment_icon}
                        alt="comment-icon2"
                        className="w-9 h-9 ml-[-10px]"
                    />
                </div>
                <p className="text-lg font-semibold w-[100px] md:w-auto ml-[80px] md:ml-0 absolute top-1/4 transform -translate-y-1/3 text-white bg-opacity-50 text-stroke">
                    {commentaire.User.username}
                </p>
            </div>
            <div className="flex justify-center mb-4">
                <UserInitials
                    firstName={session?.user.firstName || "D"}
                    lastName={session?.user.lastName || "N"}
                />
            </div>
        </div>

        {/* Étoiles de notation */}
        <div className="mt-4 flex items-center justify-center">
            {Array.from({ length: 5 }, (_, i) => (
                <span
                    key={i}
                    className={`text-[#8A6300] text-2xl ${i < commentaire.note ? 'star' : 'star-outline'}`}
                >
                    ★
                </span>
            ))}
        </div>

        {/* Message du commentaire */}
        <div className="text-center text-sm text-gray-700 mt-2 break-all overflow-hidden" style={{ wordWrap: 'break-word' }}>
            <p>{commentaire.message}</p>
        </div>
    </div>

    {/* Boutons Modifier et Supprimer */}
    {(session?.user?.id === commentaire.User._id || session?.user?.isAdmin) && (
        <div className="flex justify-center items-center space-x-4 mt-4">
            <button
                className="flex items-center text-blue-500 hover:text-blue-600 text-lg p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition duration-300"
                onClick={() => handleEditComment(commentaire)} // Passe en mode édition
            >
                ✏️
            </button>

            <button
                className="flex items-center text-red-500 hover:text-red-600 text-lg p-2 rounded-full bg-red-100 hover:bg-red-200 transition duration-300"
                onClick={() => handleDeleteComment(commentaire._id)}
            >
                🗑️
            </button>
        </div>
    )}
</div>
  )
}
