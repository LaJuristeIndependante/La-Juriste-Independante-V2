"use client";

import React, { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from "@lib/UserLib/service/auth";

function ResetForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const checkPasswordStrength = (password: string) => {
        if (password.length < 6) {
            return 'Faible';
        } else if (password.length < 10) {
            return 'Moyenne';
        } else {
            return 'Forte';
        }
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setPasswordStrength(checkPasswordStrength(newPassword));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            if (typeof token === 'string') {
                await resetPassword(token, password);
                setSuccess('Votre mot de passe a été réinitialisé avec succès.');
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } else {
                setError("Jeton de réinitialisation invalide.");
            }
        } catch (error: any) {
            setError(error.message || 'Une erreur est survenue.');
        }
    }

    return (
        <>
        <Suspense fallback={<div>Loading...</div>}>
            <div className="max-w-md w-full bg-white shadow-2xl rounded-lg text-center py-2">
            <h2 className="text-3xl mb-5 text-center md:text-4xl font-bold w-full title_section_contrats">
                Réinitialiser <br /> le mot de passe
            </h2>
            <form onSubmit={handleSubmit} className={`flex flex-col mb-10`}>
                <p className={`mt-1 mb-10 text-sm text-center ${passwordStrength === 'Forte' ? 'text-green-600' : passwordStrength === 'Moyenne' ? 'text-yellow-600' : 'text-red-600'}`}>
                    Force du mot de passe : {passwordStrength}
                </p>
                <div className="group w-3/4 mb-7 md:w-2/3 mx-auto bg-[#F5F5F5] border-gray-300 border rounded-md">
                    <input
                        className='py-2 px-1 input'
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        placeholder="Entrez un nouveau mot de passe" />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className='labelAnimation label-p'>
                        Nouveau mot de passe
                    </label>
                </div>
                <div className="group mb-3 w-3/4 md:w-2/3 mx-auto bg-[#F5F5F5] border-gray-300 border rounded-md">
                    <input
                        className='py-2 px-1 input'
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        placeholder="Confirmez votre nouveau mot de passe" />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className='labelAnimation label-p'>
                        Confirmer le mot de passe
                    </label>
                </div>
                <div className="flex items-center justify-center mb-4">
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)} />
                    <label htmlFor="showPassword" className="ml-2 text-sm">
                        Afficher les mots de passe
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-primary-color w-2/3 mx-auto text-white py-2 px-6 rounded-md hover:bg-red-900 transition"
                >
                    Réinitialiser le mot de passe
                </button>
                {error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}
                {success && <p className="text-green-600 text-sm text-center mt-4">{success}</p>}
            </form>
            </div>
        </Suspense>
        </>
    );
}

export default ResetForm;