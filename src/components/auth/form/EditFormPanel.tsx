import React, { useState } from 'react';
import GeneralInfoDetail from '@/components/auth/profile/detail/GeneralInfoDetail';
import PasswordDetails from '@/components/auth/profile/detail/passwdDetail';
import EmailDetails from '@/components/auth/profile/detail/EmailDetail';
import {ProfileData} from "@lib/UserLib/type/UserType";

interface EditFormPanelProps {
    isAdmin: boolean;
    userDetails: ProfileData;
    onUpdateUserDetails: (user: ProfileData) => void;
}

const EditFormPanel: React.FC<EditFormPanelProps> = ({ isAdmin, userDetails, onUpdateUserDetails }) => {
    const [activePanel, setActivePanel] = useState<string | null>(null);

    return (
        <div className='sideBar_logged-section flex flex-col items-center justify-center w-full h-full'>
            {/* Composant pour les infos générales */}
            <GeneralInfoDetail
                activePanel={activePanel}
                setActivePanel={setActivePanel}
                userDetails={userDetails}
                onUpdateUserDetails={onUpdateUserDetails}
            />

            {/* Composant pour les détails du mot de passe */}
            <PasswordDetails
                activePanel={activePanel}
                setActivePanel={setActivePanel}
            />

            {/* Composant pour les détails de l'email */}
            <EmailDetails
                activePanel={activePanel}
                setActivePanel={setActivePanel}
            />

            {/* Bouton pour supprimer le compte si Admin */}
            {isAdmin && (
                <button className='delete-account bg-red-500 text-white w-full p-2 rounded-lg mt-3 hover:bg-red-600'>
                    Supprimer compte Admin
                </button>
            )}
        </div>
    );
};

export default EditFormPanel;
