"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import close_icon from '@public/images/common/close-icon.svg';
import Loader from '@/components/common/animations/Loader';
import Cookies from 'js-cookie';
import LoginSection from '@/components/auth/LoginSection';
import LoggedAsAdmin from '@/components/auth/LoggedAsAdmin';
import LoggedSection from '@/components/auth/LoggedSection';
import axios from 'axios';

interface FormData {
    nom: string;
    prenom: string;
    email: string;
    username: string;
    dateOfBirth: string;
}

interface UserDetails {
    userId: string;
    username: string;
    estAdmin?: boolean;
    _id: string;
    firstName: string;
    lastName: string;
}

const ProfileSection: React.FC<{ closeSidebar: () => void }> = ({ closeSidebar }) => {
    const { data: session, update } = useSession();
    const [formData, setFormData] = useState<FormData>({
        nom: '',
        prenom: '',
        email: '',
        username: '',
        dateOfBirth: ''
    });
    const [editingField, setEditingField] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [isClient, setIsClient] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
        console.log("Effect running. Session:", session);

        if (session) {
            setFormData({
                nom: session.user?.lastName || '',
                prenom: session.user?.firstName || '',
                email: session.user?.email || '',
                username: session.user?.name || '',
                dateOfBirth: session.user?.dateOfBirth
                    ? new Date(session.user.dateOfBirth).toLocaleDateString()
                    : '',
            });
            setLoading(false);
        } else {
            console.log("Session is null or undefined.");
            setLoading(true);
        }

        const sessionNeedsRefresh = Cookies.get("sessionNeedsRefresh");
        if (sessionNeedsRefresh) {
            console.log("Refreshing session...");
            update().then(() => Cookies.remove("sessionNeedsRefresh"));
        }
    }, [session, update]);

    

    const handleEditClick = (field: string) => {
        setEditingField(field);
    };

    const handleSaveClick = async (field: keyof FormData) => {
        setMessage("");
        setError("");

        try {
            const response = await axios.put("/api/user", {
                userId: session?.user?.id,
                updateData: { [field]: formData[field] },
            });

            if (response.status === 200) {
                setMessage("Information mise à jour avec succès");
                setEditingField(null);
                await update();
                Cookies.set("sessionNeedsRefresh", "true");
            } else {
                setError("Échec de la mise à jour de l'information");
            }
        } catch (error) {
            console.error("Error updating information:", error);
            setError("Échec de la mise à jour de l'information");
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
                await signOut({ callbackUrl: "/" });
            } else {
                setError("Échec de la suppression de l'utilisateur");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            setError("Échec de la suppression de l'utilisateur");
        }
    };

    const handleLoginSuccess = () => {
        // Update the session after login success
        update();
    };

    if (!isClient) return null;

    if (session) {
        const userDetails: UserDetails = {
            userId: session.user?.id as string,
            username: session.user?.name || '',
            estAdmin: session.user?.isAdmin,
            _id: session.user?._id || '',
            firstName: session.user?.firstName || '',
            lastName: session.user?.lastName || ''
        };

        return (
            <div className="sideBar_container flex flex-col">
                <div className="sideBar_top_close_icon flex justify-end" onClick={closeSidebar}>
                    <Image src={close_icon} alt="close icon" className='w-6 h-6'/>
                    <div className="flex items-center justify-between p-4 border-b bg-tertiary">
                        <button
                            className="text-4xl font-bold text-text-secondary hover:text-text-quinary transition-colors"
                            onClick={() => closeSidebar()}
                        >
                            &times;
                        </button>
                    </div>
                </div>
                {session.user?.isAdmin ? (
                    <LoggedAsAdmin
                        userDetails={userDetails}
                        handleLogout={async () => await signOut({callbackUrl: "/"})}
                        closeSidebar={closeSidebar}
                        generalUserDetails={userDetails}
                    />
                ) : (
                    <LoggedSection
                        userDetails={userDetails}
                        handleLogout={async () => await signOut({ callbackUrl: "/" })}
                        handleDeleteAccount={async () => await handleDelete(session.user.id)}
                        generalUserDetails={userDetails}
                    />
                )}
            </div>
        );
    }

    return (
        <LoginSection onLoginSuccess={handleLoginSuccess} />
    );
};

export default ProfileSection;
