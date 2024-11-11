"use client";

import React, { useState, useEffect } from "react";
import { Profession } from "@lib/ProfessionLib/type/Profession"; // Assuming this is the correct import
import Image from "next/image";
import { getAllProfessions, addProfession, updateProfession, deleteProfession } from "@lib/ProfessionLib/service/professionService"; // Import your service functions

import contract from "@public/images/Utils/contract-icon.png";
import professionIcon from "@public/images/Utils/Contract.png"; // Adjust this image if needed

const ProfessionManagement: React.FC = () => {
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState(0);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        // Fetch all professions on component mount
        const fetchProfessions = async () => {
            try {
                const professionsData = await getAllProfessions();
                setProfessions(professionsData);
            } catch (error) {
                console.error("Erreur lors de la récupération des professions:", error);
            }
        };

        fetchProfessions();
    }, []);

    const openPopup = (profession?: Profession) => {
        setIsSuccess(false);
        if (profession) {
            setSelectedProfession(profession);
            setName(profession.name);
            setDescription(profession.description);
            setYearsOfExperience(profession.yearsOfExperience);
            setIsActive(profession.isActive ?? true);
        } else {
            setSelectedProfession(null);
            setName("");
            setDescription("");
            setYearsOfExperience(0);
            setIsActive(true);
        }
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedProfession(null);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (selectedProfession) {
                // Update profession
                await updateProfession(selectedProfession._id!, { name, description, yearsOfExperience, isActive });
                setIsSuccess(true);
            } else {
                // Add new profession
                await addProfession({ name, description, yearsOfExperience, isActive });
                setIsSuccess(true);
            }
            setShowPopup(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout ou de la modification de la profession:", error);
        } finally {
            setIsLoading(false);
        }

        // Refresh the list of professions after adding/updating
        const professionsData = await getAllProfessions();
        setProfessions(professionsData);
    };

    const handleDelete = async (id: string) => {
        setIsLoading(true);
        try {
            await deleteProfession(id);
            const professionsData = await getAllProfessions();
            setProfessions(professionsData);
        } catch (error) {
            console.error("Erreur lors de la suppression de la profession:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="flex flex-col text-black min-h-screen p-8 w-full space-y-10 z-0">
            <div className={"flex justify-between"}>
                <div className={"h-full w-full"}>
                    <h2 className="font-jost text-4xl font-bold mb-6">Gestionnaire de professions</h2>
                    <button
                        onClick={() => openPopup()}
                        className="mb-6 px-4 py-2 bg-[#D9D9D9] text-black rounded-lg text-md hover:bg-gray-400 transition"
                    >
                        Ajouter une profession +
                    </button>
                </div>
                <div className={"flex justify-center h-full pr-20"}>
                    <Image src={contract} alt={"contract"} className={"h-28 w-auto"} />
                </div>
            </div>

            <div className="space-y-4 w-full">
                {professions.map((profession) => (
                    <div
                        key={profession._id}
                        className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow"
                    >
                        <div className="flex items-center space-x-5">
                            <Image src={professionIcon} alt={"professionIcon"} className={"h-10 w-auto"} />
                            <span className="font-semibold">{profession.name}</span>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => openPopup(profession)}
                                className="px-4 py-2 bg-black text-secondary-color rounded hover:bg-gray-900 transition"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => handleDelete(profession._id!)}
                                className="px-4 py-2 bg-primary-color text-secondary-color rounded transition"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl m-8">
                        <h2 className="text-3xl font-bold mb-6">
                            {selectedProfession ? "Modifier la profession" : "Ajouter une nouvelle profession"}
                        </h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Nom:</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Description:</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                    rows={4}
                                />
                            </div>
                            <div className="mb-4">
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                <label className="block text-lg font-medium mb-2">Années d'expérience:</label>
                                <input
                                    type="number"
                                    value={yearsOfExperience}
                                    onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Active:</label>
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    className="mr-2"
                                />
                                <span>{isActive ? "Actif" : "Inactif"}</span>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-secondary-color px-6 py-2 rounded hover:bg-green-600 transition"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "En cours..." : selectedProfession ? "Enregistrer" : "Ajouter"}
                                </button>
                                <button
                                    type="button"
                                    onClick={closePopup}
                                    className="bg-gray-500 text-secondary-color px-6 py-2 rounded hover:bg-gray-600 transition"
                                >
                                    Annuler
                                </button>
                            </div>
                            {isSuccess && (
                                <p className="text-green-500 mt-4">
                                    {selectedProfession ? "Profession modifiée avec succès !" : "Profession ajoutée avec succès !"}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProfessionManagement;
