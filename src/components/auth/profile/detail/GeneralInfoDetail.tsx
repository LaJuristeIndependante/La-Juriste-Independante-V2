import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import InputAnimation from '@/components/common/input/InputAnimation'; // Assurez-vous que le chemin est correct
import user_icon from '@public/images/auth/people-id-icon.svg';
import details_icon from '@public/images/common/details-icon.svg';
import { ProfileData } from '@lib/UserLib/type/UserType';

interface GeneralInfoProps {
    activePanel: string | null;
    setActivePanel: React.Dispatch<React.SetStateAction<string | null>>;
    userDetails: ProfileData;
    onUpdateUserDetails: (user: ProfileData) => void;
}

const GeneralInfoDetail: React.FC<GeneralInfoProps> = ({ activePanel, setActivePanel, userDetails, onUpdateUserDetails }) => {
    const [username, setUsername] = useState<string>(userDetails.username || '');
    const [firstName, setFirstName] = useState<string>(userDetails.nom || '');
    const [lastName, setLastName] = useState<string>(userDetails.prenom || '');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const toggleDetails = () => {
        setActivePanel(activePanel === 'general' ? null : 'general');
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'firstName') setFirstName(value);
        if (name === 'lastName') setLastName(value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!username || !firstName || !lastName) {
                setError("Tous les champs doivent être remplis.");
                return;
            }

            const updatedUser: ProfileData = {
                ...userDetails,
                username,
                nom: firstName,
                prenom: lastName,
            };

            await onUpdateUserDetails(updatedUser); // Appel de la fonction de mise à jour

            setSuccess("Informations mises à jour avec succès.");
            setError(null);
        } catch (err) {
            setError("Une erreur s'est produite lors de la mise à jour.");
            setSuccess(null);
        }
    };

    return (
        <div className='w-full bg-[#F5F5F5] p-4 rounded-md mt-3 shadow-md'>
            <div className='flex justify-between items-center'>
                <div className="flex items-center">
                    <Image src={user_icon} alt="user icon" className='w-8 h-8 mr-2' />
                    <h3 className='font-bold text-sm'>Infos générales</h3>
                </div>
                <button onClick={toggleDetails} className='p-1'>
                    <Image src={details_icon} alt="details icon" className='w-6 h-6' />
                </button>
            </div>
            {activePanel === 'general' && (
                <form onSubmit={handleSubmit} className='mt-2'>
                    <InputAnimation
                        label='Username'
                        type='text'
                        name='username'
                        value={username}
                        icon={user_icon}
                        onChange={handleInputChange}
                        placeholder="Entrez votre nom d'utilisateur"
                        utility={'username'}
                    />
                    <InputAnimation
                        label='Prénom'
                        type='text'
                        name='firstName'
                        value={firstName}
                        icon={user_icon}
                        onChange={handleInputChange}
                        placeholder="Entrez votre prénom"
                        utility={'prenom'}
                    />
                    <InputAnimation
                        label='Nom'
                        type='text'
                        name='lastName'
                        value={lastName}
                        icon={user_icon}
                        onChange={handleInputChange}
                        placeholder="Entrez votre nom"
                        utility={'nom'}
                    />
                    {error && <p className='text-red-500 text-center'>{error}</p>}
                    {success && <p className='text-green-500 text-center'>{success}</p>}
                    <button type='submit' className="text-white bg-black w-full p-2 hover:bg-gray-800 rounded-lg">
                        Mettre à jour
                    </button>
                </form>
            )}
        </div>
    );
};

export default GeneralInfoDetail;
