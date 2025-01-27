"use client";

import React, { useState, FormEvent } from 'react';
import { forgotPassword } from "@lib/UserLib/service/auth";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        try {
            await forgotPassword(email);
            setSuccess('Vérifiez votre email pour le lien de réinitialisation.');
        } catch (error: any) {
            setError(error.message || 'Une erreur est survenue.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white shadow-2xl bg-opacity-50 rounded-lg text-center">
            <div className="p-8">
                    <h2 className="text-3xl md:text-4xl font-bold w-full title_section_contrats">
                        Mot de passe oublié
                    </h2>
                    <p className="text-sm md:text-base w-11/12 my-3">
                        Entrez votre adresse e-mail <br /> pour recevoir un lien de réinitialisation.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className={`flex flex-col space-y-4 mb-10`}>
                    <div className="group w-3/4 md:w-2/3 mx-auto bg-[#F5F5F5] border-gray-300 border rounded-md">
                        <input
                            className='py-2 px-1 input'
                            type="text"
                            name="query"
                            required
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Adresse e-mail"
                        />

                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className='labelAnimation label-p'>
                            Adresse e-mail
                        </label>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-primary-color text-white py-2 px-6 rounded-md hover:bg-red-900 transition"
                        >
                            Envoyer le lien de réinitialisation
                        </button>
                    </div>
                    {error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}
                    {success && <p className="text-green-600 text-sm text-center mt-4">{success}</p>}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
