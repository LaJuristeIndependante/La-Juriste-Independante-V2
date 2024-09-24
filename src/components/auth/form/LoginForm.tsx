"use client";
import React, { FormEvent, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import id_icon from '@public/images/auth/people-id-icon.svg';
import google_icon from '@public/images/auth/google-icon.svg';
import apple_icon from '@public/images/auth/apple-icon.svg';
import disqus_icon from '@public/images/auth/disqus-icon.svg';
import InputAnimation from '../../common/input/InputAnimation';
import PasswordAnimation from '../../common/input/PasswordAnimation';

interface LoginFormProps {
    handleOnRegisterClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleOnRegisterClick }) => {
    const [identifiant, setIdentifiant] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

    const handleIdentifiantChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIdentifiant(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await signIn('credentials', {
            email: identifiant,
            password: password,
            redirect: false,
        });

        if (res?.error) {
            setErrorMessage(res.error);
        } else if (res?.ok) {
            router.push('/validation');
        }
    };

    return (
        <div className="sideBar_connexion-section mt-4">
            <h3 className="font-semibold text-xl mb-4">Se connecter</h3>
            <p className="text-sm">
                Connectez-vous pour partager vos impressions avec les autres acheteurs.
            </p>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            <div className="sideBar_connexion-section__inputs">
                <form
                    className="flex flex-col items-center justify-center max-w-xl border-none rounded-sm mt-8"
                    onSubmit={handleSubmit}
                >
                    <InputAnimation
                        icon={id_icon}
                        utility="id"
                        type="text"
                        name="identifiant"
                        label="Identifiant"
                        onChange={handleIdentifiantChange}
                        value={identifiant}
                    />
                    <PasswordAnimation
                        utilitie="password"
                        label="Mot de passe"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handlePasswordChange}
                        boolean={true}
                        value={password}
                    />

                    <button
                        className="text-white bg-black w-full p-2 hover:bg-gray-800 mt-1 rounded-lg"
                        type="submit"
                    >
                        Se connecter
                    </button>
                </form>
            </div>
            <div className="sideBar_hr_ou_hr flex items-center justify-center mt-5">
                <hr className="border-t-2 border-gray-400 w-1/3" />
                <p className="text-sm p-1 text-black">ou</p>
                <hr className="border-t-2 border-gray-400 w-1/3" />
            </div>
            <div className="sideBar_logged-section_user-actions flex items-center justify-center w-full mt-3">
                <button className="sideBar_logged-section_googleConnexionButton rounded-full w-10 h-10 border-2 border-[#f1f1f1] flex items-center justify-center hover:bg-gray-200">
                    <span>
                        <Image src={google_icon} alt="google icon" width={24} height={24} className="w-6 h-6" />
                    </span>
                </button>
                <button className="sideBar_logged-section_appleConnexionButton rounded-full w-10 h-10 border-2 ml-3 border-[#f1f1f1] flex items-center justify-center hover:bg-gray-200">
                    <span>
                        <Image src={apple_icon} alt="apple icon" width={24} height={24} className="w-6 h-6" />
                    </span>
                </button>
                <button className="sideBar_logged-section_discusConnexionButton rounded-full w-10 h-10 border-2 ml-3 border-[#f1f1f1] flex items-center justify-center hover:bg-gray-200">
                    <span>
                        <Image src={disqus_icon} alt="disqus icon" width={24} height={24} className="w-6 h-6" />
                    </span>
                </button>
            </div>
            <p className="text-xs text-center mt-4">
                Vous n&apos;avez pas de compte ?{' '}
                <button
                    className="text-xs mt-3 text-blue-400 list-underlined hover:text-blue-600"
                    onClick={handleOnRegisterClick}
                >
                    Inscrivez-vous !
                </button>
            </p>
        </div>
    );
};

export default LoginForm;
