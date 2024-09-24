import React, { ChangeEvent, FormEvent, useState } from 'react';
import InputAnimation from '@/components/common/input/InputAnimation';
import email_icon from '@public/images/auth/email-icon.svg';
import axios from 'axios'; // Axios pour les requêtes API

interface EmailDetailsProps {
    activePanel: string | null;
    setActivePanel: React.Dispatch<React.SetStateAction<string | null>>;
}

const EmailDetails: React.FC<EmailDetailsProps> = ({ activePanel, setActivePanel }) => {
    const [email, setEmail] = useState<string>('');
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Fonction de validation pour l'email
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Réinitialiser les messages d'erreur et de succès
        setError(null);
        setSuccess(null);

        // Validation des champs
        if (!validateEmail(email)) {
            setError("Veuillez entrer un email valide.");
            return;
        }
        if (!verificationCode) {
            setError("Le code de vérification est requis.");
            return;
        }

        // Requête API pour mettre à jour l'email
        try {
            const response = await axios.put('/api/user/updateEmail', { email, verificationCode });

            if (response.status === 200) {
                setSuccess("Email mis à jour avec succès.");
            } else {
                setError("Une erreur est survenue lors de la mise à jour de l'email.");
            }
        } catch (error) {
            setError("Erreur serveur : impossible de mettre à jour l'email.");
        }
    };

    return (
        <div className='w-full bg-[#F5F5F5] p-4 rounded-md mt-3 shadow-md'>
            <div className='flex justify-between items-center'>
                <h3 className='font-bold text-sm'>Mettre à jour l&apo;email</h3>
            </div>
            {activePanel === 'email' && (
                <form onSubmit={handleSubmit} className='mt-2'>
                    <InputAnimation
                        label='Email'
                        type='email'
                        name='email'
                        value={email}
                        icon={email_icon}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        utility='email'
                        placeholder='Entrez votre nouvel email'
                    />
                    <InputAnimation
                        label='Code de vérification'
                        type='text'
                        name='verificationCode'
                        value={verificationCode}
                        icon={email_icon}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setVerificationCode(e.target.value)}
                        utility='verificationCode'
                        placeholder='Entrez votre code de vérification'
                    />

                    {/* Affichage des messages d'erreur et de succès */}
                    {error && <p className='text-red-500 text-center text-xs mt-1'>{error}</p>}
                    {success && <p className='text-green-500 text-center text-xs mt-1'>{success}</p>}

                    <button className="text-white bg-black w-full p-2 hover:bg-gray-800 rounded-lg" type='submit'>
                        Mettre à jour
                    </button>
                </form>
            )}
        </div>
    );
};

export default EmailDetails;
