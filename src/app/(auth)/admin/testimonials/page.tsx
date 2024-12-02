"use client";
import React, { useEffect, useState } from 'react';
import edit_icon from '@/../public/images/common/edit-icon.svg';
import Image from 'next/image';
import {
    createTestimonial,
    getTestimonials,
    deleteTestimonial,
    updateTestimonial
} from '@lib/testimonialLib/service/testimonials';
import { CommentaireDocument, Commentaire } from "@lib/testimonialLib/type/Testimonial";
import { useSession } from "next-auth/react";
import { useMediaQuery } from 'react-responsive';

export default function AdminTestimonialsPage() {
    const [commentaires, setCommentaires] = useState<CommentaireDocument[]>([]);
    const [newComment, setNewComment] = useState({ objet: '', message: '', note: 0 });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const { data: session } = useSession();
    const isMobile = useMediaQuery({ query: '(max-width: 881px)' });

    useEffect(() => {
        const loadCommentaires = async () => {
            try {
                const fetchedCommentaires = await getTestimonials();
                setCommentaires(fetchedCommentaires);
            } catch (error) {
                console.error('Erreur lors du chargement des commentaires:', error);
            }
        };

        loadCommentaires();
    }, []);

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session || !session.user) {
            console.error("Vous devez être connecté pour soumettre un commentaire.");
            return;
        }

        try {
            if (isEditing && editingCommentId) {
                await updateTestimonial(editingCommentId, session.user.id, {
                    newMessage: newComment.message,
                    newObjet: newComment.objet,
                    newNote: newComment.note,
                });
                console.log("Commentaire mis à jour avec succès");
            } else {
                await createTestimonial({
                    User: {
                        _id: session.user.id,
                        username: session.user.name || 'Anonyme',
                    },
                    objet: newComment.objet,
                    message: newComment.message,
                    note: newComment.note,
                });
                console.log("Commentaire ajouté avec succès");
            }

            const updatedCommentaires = await getTestimonials();
            setCommentaires(updatedCommentaires);

            setIsEditing(false);
            setEditingCommentId(null);
        } catch (error) {
            console.error('Erreur lors de la soumission du commentaire:', error);
        }
    };

    const handleDeleteComment = async (commentaireId: string) => {
        if (!session?.user?.id) {
            console.error('Utilisateur non connecté, suppression non autorisée');
            return;
        }

        try {
            await deleteTestimonial(commentaireId, session.user.id, session.user.isAdmin);
            const updatedCommentaires = await getTestimonials();
            setCommentaires(updatedCommentaires);
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire:', error);
        }
    };

    const handleEditComment = (commentaire: Commentaire) => {
        setIsEditing(true);
        setEditingCommentId(commentaire._id);
        setNewComment({
            objet: commentaire.objet,
            message: commentaire.message,
            note: commentaire.note,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewComment({ ...newComment, [e.target.name]: e.target.value });
    };

    return (
        <main className="relative flex items-center justify-center min-h-screen">

            <div className="flex flex-col text-black min-h-screen p-8 w-full space-y-10 z-0">
                <div className="flex justify-between">
                    <div className="h-full w-full">
                        <h2 className="font-jost text-2xl md:text-4xl font-bold mb-6">Gestionnaire de témoignages</h2>
                    </div>
                    <div className="flex justify-center h-full pr-20">
                        <Image src={edit_icon} alt="edit icon" className="h-28 w-auto" />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center space-x-4 md:w-1/3 md:ml-4 underline">
                    <p>Objet</p>
                    <p>Message</p>
                    <p>Note</p>
                </div>
                <div className="space-y-4 w-full">
                    {commentaires.map((commentaire) => (
                        <div
                            key={commentaire._id}
                            className={`flex ${isMobile ? 'flex-col justify-center' : 'flex-row justify-between '} items-center p-4 bg-gray-100 rounded-md shadow`}
                        >
                            <div className={`flex items-center ${isMobile ? 'flex-col space-y-2 justify-center' : 'flex-row  space-x-5'}`}>
                                {isEditing && editingCommentId === commentaire._id ? (
                                    <>
                                        <input
                                            type="text"
                                            name="objet"
                                            value={newComment.objet}
                                            onChange={handleChange}
                                            className="font-semibold border border-gray-100 px-2 h-[40px] rounded-md"
                                        />
                                        <textarea
                                            name="message"
                                            value={newComment.message}
                                            onChange={handleChange}
                                            className="font-semibold border resize-none border-gray-100 h-[40px] rounded-md"
                                        />
                                        <input
                                            type="number"
                                            name="note"
                                            value={newComment.note}
                                            onChange={handleChange}
                                            className="font-semibold border border-gray-100 px-2 h-[40px] rounded-md"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <span className="font-semibold">{commentaire.objet}</span>
                                        <span className="font-semibold truncate max-w-xs">{commentaire.message.length > 100 ? commentaire.message.substring(0, 100) + '...' : commentaire.message}</span>
                                        <span className="font-semibold">{commentaire.note}</span>
                                    </>
                                )}
                            </div>
                            <div className="flex space-x-4">
                                {isEditing && editingCommentId === commentaire._id ? (
                                    <button
                                        onClick={handleSubmitComment}
                                        className="px-4 py-2 bg-black text-secondary-color rounded hover:bg-gray-900 transition"
                                    >
                                        Enregistrer
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEditComment(commentaire)}
                                        className="px-4 py-2 bg-black text-secondary-color rounded hover:bg-gray-900 transition"
                                    >
                                        Modifier
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteComment(commentaire._id)}
                                    className="px-4 py-2 bg-primary-color text-secondary-color rounded transition"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}