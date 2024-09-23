import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { updateUserData, resetPassword } from '@lib/UserLib/service/auth';
import InputAnimation from '../../common/input/InputAnimation';
import PasswordAnimation from '../../common/input/PasswordAnimation';
import user_icon from '@public/images/auth/people-id-icon.svg';
import lock_icon from '@public/images/auth/lock-icon.svg';
import details_icon from '@public/images/common/details-icon.svg';
import email_icon from '@public/images/auth/email-icon.svg';

// Define types for props
interface UserDetails {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
}

interface EditFormPanelProps {
    isAdmin: boolean;
    userDetails: UserDetails;
    onUpdateUserDetails: (user: UserDetails) => void;
}

const EditFormPanel: React.FC<EditFormPanelProps> = ({ isAdmin, userDetails, onUpdateUserDetails }) => {
    const [activePanel, setActivePanel] = useState<string | null>(null);

    return (
        <div className='sideBar_logged-section flex flex-col items-center justify-center w-full h-full'>
            <GeneralsInfosDetails
                activePanel={activePanel}
                setActivePanel={setActivePanel}
                userDetails={userDetails}
                onUpdateUserDetails={onUpdateUserDetails}
            />
            <PasswordDetails activePanel={activePanel} setActivePanel={setActivePanel} />
            <EmailDetails activePanel={activePanel} setActivePanel={setActivePanel} />
            {isAdmin && (
                <button className='delete-account bg-red-500 text-white w-full p-2 rounded-lg mt-3 hover:bg-red-600'>
                    Supprimer compte Admin
                </button>
            )}
        </div>
    );
};

interface GeneralsInfosDetailsProps {
    activePanel: string | null;
    setActivePanel: React.Dispatch<React.SetStateAction<string | null>>;
    userDetails: UserDetails;
    onUpdateUserDetails: (user: UserDetails) => void;
}

const GeneralsInfosDetails: React.FC<GeneralsInfosDetailsProps> = ({
    activePanel,
    setActivePanel,
    userDetails,
    onUpdateUserDetails
}) => {
    const [username, setUsername] = useState<string>(userDetails.username || '');
    const [firstName, setFirstName] = useState<string>(userDetails.firstName || '');
    const [lastName, setLastName] = useState<string>(userDetails.lastName || '');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const toggleDetails = () => {
        setActivePanel(activePanel === 'general' ? null : 'general');
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'firstName') setFirstName(value);
        if (name === 'lastName') setLastName(value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updatedUser = { _id: userDetails._id, username, firstName, lastName };
            await updateUserData();
            setSuccess("Informations mises à jour avec succès.");
            setError(null);
            onUpdateUserDetails(updatedUser);
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
                <div className='mt-2 flex w-full'>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-4 w-full'>
                            <InputAnimation
                                label='Username'
                                type='text'
                                name='username'
                                value={username}
                                icon={user_icon}
                                onChange={handleInputChange}
                                utility={''} />
                            <InputAnimation
                                label='Prénom'
                                type='text'
                                name='firstName'
                                value={firstName}
                                icon={user_icon}
                                onChange={handleInputChange}
                                utility={''} />
                            <InputAnimation
                                label='Nom'
                                type='text'
                                name='lastName'
                                value={lastName}
                                icon={user_icon}
                                onChange={handleInputChange}
                                utility={''}
                            />
                            {error && <p className='text-red-500 text-center text-xs mt-1'>{error}</p>}
                        </div>
                        {error && <p className='text-red-500 text-center text-xs mt-1'>{error}</p>}
                        {success && <p className='text-green-500 text-center text-xs mt-1'>{success}</p>}
                        <button className="text-white bg-black w-full p-2 hover:bg-gray-800 rounded-lg" type='submit'>
                            Mettre à jour
                        </button>
                    </form>
                </div >
            )}
        </div >
    );
};

interface PasswordDetailsProps {
    activePanel: string | null;
    setActivePanel: React.Dispatch<React.SetStateAction<string | null>>;
}

const PasswordDetails: React.FC<PasswordDetailsProps> = ({ activePanel, setActivePanel }) => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const toggleDetails = () => {
        setActivePanel(activePanel === 'password' ? null : 'password');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await changePassword(currentPassword, newPassword);
            setSuccess('Mot de passe changé avec succès.');
            setError(null);
        } catch (err) {
            setError("Une erreur s'est produite lors du changement de mot de passe.");
            setSuccess(null);
        }
    };

    const handleForgotPassword = () => {
        console.log('Forgot password');
    };

    return (
        <div className='w-full bg-[#F5F5F5] p-4 rounded-md mt-3 shadow-md'>
            <div className='flex justify-between items-center'>
                <div className="flex items-center">
                    <Image src={lock_icon} alt="password icon" className='w-8 h-8 mr-2' />
                    <h3 className='font-bold text-sm'>Mot de passe</h3>
                </div>
                <button onClick={toggleDetails} className='p-1'>
                    <Image src={details_icon} alt="details icon" className='w-6 h-6' />
                </button>
            </div>
            {activePanel === 'password' && (
                <div className='mt-2 flex'>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-4 w-full'>
                            <PasswordAnimation
                                label='Ancien mot de passe'
                                utilitie='password'
                                placeholder='Ancien mot de passe'
                                icon={lock_icon}
                                boolean={true}
                                value={currentPassword}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
                            />
                            <PasswordAnimation
                                label='Nouveau mot de passe'
                                utilitie='password'
                                placeholder='Nouveau mot de passe'
                                icon={lock_icon}
                                boolean={false}
                                value={newPassword}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className='text-red-500 text-center text-xs mt-[-15px] mb-2'>{error}</p>}
                        {success && <p className='text-green-500 text-xs text-center mt-[-15px] mb-2'>{success}</p>}
                        <button className="text-white bg-black w-full p-2 hover:bg-gray-800 rounded-lg" type='submit'>
                            Mettre à jour
                        </button>
                        <div className="flex items-center justify-center mt-[8px] mb-2">
                            <a className="text-xs text-center w-full text-[#DA1A32] hover:underline" onClick={handleForgotPassword}>
                                J’ai oublié mon mot de passe
                            </a>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

interface EmailDetailsProps {
    activePanel: string | null;
    setActivePanel: React.Dispatch<React.SetStateAction<string | null>>;
}

const EmailDetails: React.FC<EmailDetailsProps> = ({ activePanel, setActivePanel }) => {
    const [email, setEmail] = useState<string>('');
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const toggleDetails = () => {
        setActivePanel(activePanel === 'email' ? null : 'email');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add logic to handle email update here
        // For now, just logging values
        console.log({ email, verificationCode });
    };

    return (
        <div className='w-full bg-[#F5F5F5] p-4 rounded-md mt-3 shadow-md'>
            <div className='flex justify-between items-center'>
                <div className="flex items-center">
                    <Image src={email_icon} alt="email icon" className='w-8 h-8 mr-2' />
                    <h3 className='font-bold text-sm'>Email</h3>
                </div>
                <button onClick={toggleDetails} className='p-1'>
                    <Image src={details_icon} alt="details icon" className='w-6 h-6' />
                </button>
            </div>
            {activePanel === 'email' && (
                <div className='mt-2 flex'>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-4 w-full'>
                            <InputAnimation
                                label='Email'
                                type='email'
                                name='email'
                                value={email}
                                icon={email_icon}
                                onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(e.target.value)}
                                utility='email'
                                placeholder='Email'
                            />
                            <InputAnimation
                                label='Code de vérification'
                                type='text'
                                name='verificationCode'
                                value={verificationCode}
                                icon={email_icon}
                                onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setVerificationCode(e.target.value)}
                                utility='verificationCode'
                                placeholder='Code de vérification'
                            />
                        </div>
                        {error && <p className='text-red-500 text-center text-xs mt-1'>{error}</p>}
                        <button className="text-white bg-black w-full p-2 hover:bg-gray-800 rounded-lg" type='submit'>
                            Mettre à jour
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EditFormPanel;
