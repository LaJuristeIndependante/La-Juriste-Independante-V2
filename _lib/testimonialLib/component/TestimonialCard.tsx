import React from 'react';
import Image from 'next/image';
import { Commentaire } from '@lib/testimonialLib/type/Testimonial';
import comment_icon from '@public/images/common/comment-icon.svg';
import { useSession } from 'next-auth/react';
import edit_icon from '@public/images/common/edit-icon.svg';
import delete_icon from '@public/images/common/delete-icon.svg';

interface TestimonialCardProps {
    commentaire: Commentaire;
    handleEditComment: (commentaire: Commentaire) => void;
    handleDeleteComment: (id: string) => void;
}

export default function TestimonialCard({ commentaire, handleEditComment, handleDeleteComment }: TestimonialCardProps) {
    const { data: session } = useSession();

    return (
        <div className="border border-gray-300 bg-white rounded-lg shadow-md p-6 mx-auto w-[300px] min-h-[250px] relative">
            <div className="flex items-center mb-4">
                <div className="relative flex items-center">
                    <Image
                        src={comment_icon}
                        alt="comment-icon"
                        className="rounded-full"
                    />
                    <Image
                        src={comment_icon}
                        alt="comment-icon"
                        className="rounded-full"
                    />
                </div>
                <div className="ml-4">
                    <p className=""><span className='font-semibold text-lg'>{commentaire.User.username}</span> - <span className="text-base">{commentaire.objet}</span></p>
                    <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span
                                key={i}
                                className={`text-yellow-500 text-xl ${i < commentaire.note ? 'star' : 'star-outline'}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-gray-700 mb-4 max-w-xs max-h-32 overflow-auto">{commentaire.message}</p>
            {(session?.user?.id === commentaire.User._id || session?.user?.isAdmin) && (
                <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button
                        className="text-black hover:text-gray-900"
                        onClick={() => handleEditComment(commentaire)}
                    >
                        <Image src={edit_icon} alt="edit icon" className='w-5 h-5' />
                    </button>
                    <button
                        className="text-primary-color"
                        onClick={() => handleDeleteComment(commentaire._id)}
                    >
                        <Image src={delete_icon} alt="delete icon" className='w-5 h-5' />
                    </button>
                </div>
            )}
        </div>
    );
}
