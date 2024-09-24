import React, { ChangeEvent, FormEvent, useState } from 'react';
import PasswordAnimation from '@/components/common/input/PasswordAnimation';  // Assurez-vous que le chemin est correct

interface PasswordDetailsProps {
    activePanel: string | null;
    setActivePanel: React.Dispatch<React.SetStateAction<string | null>>;
}

const PasswordDetails: React.FC<PasswordDetailsProps> = ({ activePanel, setActivePanel }) => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Ajouter la logique de mise à jour du mot de passe ici
        console.log({ currentPassword, newPassword });
        setSuccess("Mot de passe mis à jour avec succès.");
    };

    return (
        <div className='w-full bg-[#F5F5F5] p-4 rounded-md mt-3 shadow-md'>
            <div className='flex justify-between items-center'>
                <h3 className='font-bold text-sm'>Changer le mot de passe</h3>
            </div>
            {activePanel === 'password' && (
                <form onSubmit={handleSubmit} className='mt-2'>
                    <PasswordAnimation
                        label='Ancien mot de passe'
                        utilitie='password'
                        value={currentPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
                        boolean={true}  // Utilisé pour activer le bouton de montrer/cacher
                    />
                    <PasswordAnimation
                        label='Nouveau mot de passe'
                        utilitie='password'
                        value={newPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                        boolean={true}  // Utilisé pour activer le bouton de montrer/cacher
                    />
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

export default PasswordDetails;
