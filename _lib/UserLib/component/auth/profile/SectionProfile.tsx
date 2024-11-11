import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Button from "@/styles/Button.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { updateUserData } from "@lib/UserLib/service/auth";
import { ProfileData } from "@lib/UserLib/type/UserType";

import logout_icon from "@public/images/common/logout-icon.svg";
import delete_icon from "@public/images/common/delete-icon.svg";
import admin_icon from "@public/images/common/admin-icon.svg";
import admin_logo from "@public/images/logo/La Juriste indépendante Admin.png";
import normal_logo from "@public/images/logo/La Juriste indépendante.png";

const SectionProfile: React.FC = () => {
    const { data: session, update } = useSession();
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isClient, setIsClient] = useState<boolean>(false);
    const [editingField, setEditingField] = useState<string | null>(null);
    const [formData, setFormData] = useState<ProfileData>({
        nom: '',
        prenom: '',
        email: '',
        username: '',
        dateOfBirth: '',
    });

    const router = useRouter();

    useEffect(() => {
        setIsClient(true);

        const sessionNeedsRefresh = Cookies.get("sessionNeedsRefresh");

        if (sessionNeedsRefresh && session) {
            update();
            Cookies.remove("sessionNeedsRefresh");
        }

        if (session) {
            setFormData({
                nom: session.user.lastName || "",
                prenom: session.user.firstName || "",
                email: session.user.email || "",
                username: session.user.name || "",
                dateOfBirth: session.user.dateOfBirth
                    ? new Date(session.user.dateOfBirth).toLocaleDateString()
                    : "",
            });
        }
    }, [session, update]);

    if (!isClient) {
        return null;
    }

    const handleEditClick = (field: string) => {
        setEditingField(field);
    };

    const handleSaveClick = async (field: string) => {
        setMessage("");
        setError("");

        try {
            await updateUserData({
                userId: session?.user?.id || '',
                field,
                value: formData[field as keyof ProfileData],
            });

            setMessage("Information mise à jour avec succès");
            setEditingField(null);

            await update({
                ...session,
                user: {
                    ...session?.user,
                    [field]: formData[field as keyof ProfileData],
                },
            });

            Cookies.set("sessionNeedsRefresh", "true");
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "Échec de la mise à jour de l'information";
            setError(errorMessage);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        router.push("/admin");
    };

    const handleDelete = async (userId: string) => {
        setMessage("");
        setError("");

        try {
            const response = await axios.delete("/api/user", { data: { userId } });
            if (response.status === 200) {
                setMessage("Utilisateur supprimé avec succès");
                signOut({ callbackUrl: "/" });
            } else {
                setError("Échec de la suppression de l'utilisateur");
            }
        } catch (error) {
            setError("Échec de la suppression de l'utilisateur");
        }
    };

    return (
        <section className="flex flex-col justify-center text-center items-center w-full">
            <div className="pp rounded-full h-28 w-28 bg-[#D9D9D9] mb-5 flex items-center justify-center">
                <Image src={session?.user?.isAdmin ? admin_logo : normal_logo} alt="user icon" width={0} height={0} className="rounded-full h-24 w-24" />    
            </div>
            <h2 className="text-2xl font-bold text-center mb-8">{session?.user?.isAdmin ? "Administateur" : session?.user?.name}</h2>
            <div className="rounded-lg p-8 bg-opacity-80 flex flex-col items-center">
                {/* <div className="mb-8">
                    <FaUserCircle className="text-gray-700 w-36 h-36"/>
                </div> */}
                <div className="w-full text-center text-black">
                <div className="space-y-2 text-center justify-center items-center">
                        <div className={`flex flex-row justify-center items-center space-x-4 mb-6`}>
                            <button
                                className="flex items-center justify-center p-2 rounded-full border border-gray-300  hover:bg-gray-200"
                                onClick={() => signOut({ callbackUrl: "/" })}
                                type="button"
                            >
                                <Image src={logout_icon} alt="logout icon" width={0} height={0} className="w-6 h-6" />
                            </button>
                            <button
                                className="flex items-center justify-center p-2 rounded-full border border-gray-300 hover:bg-gray-200"
                                onClick={() => handleDelete(session?.user?.id ?? "")}
                                type="button"
                            >
                                <Image src={delete_icon} alt="delete icon" width={0} height={0} className="w-6 h-6" />
                            </button>
                            {session?.user?.isAdmin ? (
                                <button
                                    className="flex items-center justify-center p-2 rounded-full border border-gray-300 hover:bg-gray-200"
                                    onClick={handleSubmit}
                                    type="button"
                                >
                                    <Image src={admin_icon} alt="admin icon" width={0} height={0} className="w-6 h-6" />
                                </button>
                            ) : null}
                        </div>
                    </div>
                    {["nom", "prenom", "username", "dateOfBirth", "email"].map((field) => (
                        <div key={field} className="mb-4 flex justify-between items-center">
                            <div>
                                <strong>{field.charAt(0).toUpperCase() + field.slice(1)}: </strong>
                                {editingField === field ? (
                                    <input
                                        type={field === "dateOfBirth" ? "date" : "text"}
                                        name={field}
                                        value={formData[field as keyof ProfileData]}
                                        onChange={handleChange}
                                        className="mt-1 p-1 border-b-2 border-gray-300"
                                    />
                                ) : (
                                    <span>
                                        {field === "dateOfBirth" && formData[field]
                                            ? new Date(formData[field]).toLocaleDateString("fr-FR")
                                            : formData[field as keyof ProfileData]}
                                    </span>
                                )}
                            </div>
                            {editingField === field ? (
                                <button
                                    className="ml-2 text-green-500"
                                    onClick={() => handleSaveClick(field)}
                                    type="button"
                                >
                                    Enregistrer
                                </button>
                            ) : (
                                <FaEdit
                                    className="ml-2 text-gray-500 cursor-pointer"
                                    onClick={() => handleEditClick(field)}
                                />
                            )}
                        </div>
                    ))}

                    
                    {message && <p className="text-green-500 mt-4">{message}</p>}
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </div>
        </section>
    );
};

export default SectionProfile;
