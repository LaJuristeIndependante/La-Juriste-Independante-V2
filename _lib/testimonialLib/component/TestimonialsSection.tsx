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
import Carroussel from "@/components/utils/décors/Carroussel";
import PopupTestimonial from "@/components/home/testimonial/AddTestimonialPopup";
import TestimonialCard from './TestimonialCard';


export default function TestimonialsSection() {
    const [commentaires, setCommentaires] = useState<CommentaireDocument[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // Pour la popup
    const [newComment, setNewComment] = useState({ objet: '', message: '', note: 0 });
    const [isEditing, setIsEditing] = useState<boolean>(false); // Détermine si on est en mode édition
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // Stocke l'ID du commentaire à modifier
    const { data: session } = useSession(); // Récupère les données de session

    // Charger les commentaires depuis l'API
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

    // Gestion de la soumission du commentaire (ajout ou modification)
    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session || !session.user) {
            console.error("Vous devez être connecté pour soumettre un commentaire.");
            return;
        }

        try {
            if (isEditing && editingCommentId) {
                // Mode édition : Mettre à jour le commentaire existant
                await updateTestimonial(editingCommentId, session.user.id, {
                    newMessage: newComment.message,
                    newObjet: newComment.objet,
                    newNote: newComment.note,
                });
                console.log("Commentaire mis à jour avec succès");

            } else {
                // Mode ajout : Créer un nouveau témoignage
                await createTestimonial({
                    User: {
                        _id: session.user.id, // Récupère l'ID de l'utilisateur connecté
                        username: session.user.name || 'Anonyme',
                    },
                    objet: newComment.objet,
                    message: newComment.message,
                    note: newComment.note,
                });
                console.log("Commentaire ajouté avec succès");
            }

            // Recharger les commentaires après soumission
            const updatedCommentaires = await getTestimonials();
            setCommentaires(updatedCommentaires);

            // Fermer la popup après la soumission
            setIsPopupOpen(false);
            setIsEditing(false); // Quitte le mode édition
            setEditingCommentId(null); // Réinitialise l'ID du commentaire en édition
        } catch (error) {
            console.error('Erreur lors de la soumission du commentaire:', error);
        }
    };

    // Gestion de la suppression d'un commentaire
    const handleDeleteComment = async (commentaireId: string) => {
        if (!session?.user?.id) {
            console.error('Utilisateur non connecté, suppression non autorisée');
            return;
        }

        try {
            // Supprime le commentaire si l'utilisateur est l'auteur ou un administrateur
            await deleteTestimonial(commentaireId, session.user.id, session.user.isAdmin);
            // Recharger les commentaires après la suppression
            const updatedCommentaires = await getTestimonials();
            setCommentaires(updatedCommentaires);
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire:', error);
        }
    };

    // Gestion de l'ouverture de la popup en mode édition
    const handleEditComment = (commentaire: Commentaire) => {
        setIsEditing(true);
        setEditingCommentId(commentaire._id); // Stocke l'ID du commentaire à modifier
        setNewComment({
            objet: commentaire.objet,
            message: commentaire.message,
            note: commentaire.note,
        });
        setIsPopupOpen(true); // Ouvre la popup
    };

    return (
        <section className="relative min-h-screen bg-white flex flex-col justify-center items-center py-10">
            <div className="absolute top-0 left-0">
                <hr
                    className="w-[200px] md:w-[500px] border-[12px] md:border-l-8 rounded-r-xl border-[#DA1A32] my-10 mx-auto"
                />
            </div>
            <div className={`flex w-full px-10 py-0 text-start`}>
                <h2 className="font-bold mb-10 text-gray-800 md:text-4xl mt-12 md:mt-0 text-2xl">
                    Voici ce que disent mes clients :
                </h2>
            </div>
            <div className="w-full max-w-lg p-4">
                <Carroussel
                    items={commentaires.map((commentaire, index) => (
                        <div key={index} className="p-4">
                            <TestimonialCard
                                commentaire={commentaire}
                                handleEditComment={handleEditComment}
                                handleDeleteComment={handleDeleteComment}
                            />
                        </div>
                    ))}
                />
            </div>
            {session?.user ? (
                <button
                    className="bg-[#D9D9D9] flex items-center justify-center px-3 py-2 text-black font-semibold rounded-md mt-4"
                    onClick={() => {
                        setIsEditing(false);
                        setIsPopupOpen(true);
                        setNewComment({ objet: '', message: '', note: 0 });
                    }}
                >
                    Ajouter un commentaire
                    <Image src={edit_icon} alt="edit icon" className='w-5 h-5 ml-2 md:w-6 md:h-6' />
                </button>
            ) : (
                <p>Connecté vous pour ajouté un commentaire</p>
            )}

            {/* Popup personnalisée pour ajouter ou modifier un commentaire */}
            {isPopupOpen && (
                <PopupTestimonial setIsPopupOpen={setIsPopupOpen} newComment={newComment} setNewComment={setNewComment} isEditing={isEditing} handleSubmitComment={handleSubmitComment} />
            )}
        </section>
    );
}
