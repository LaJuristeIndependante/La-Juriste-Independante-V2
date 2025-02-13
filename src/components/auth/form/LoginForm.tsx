"use client";
import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { signIn } from 'next-auth/react';
// import Image from 'next/image';
import id_icon from '@public/images/auth/people-id-icon.svg';
// import google_icon from '@public/images/auth/google-icon.svg';
import InputAnimation from '../../common/input/InputAnimation';
import Link from 'next/link';
import PasswordAnimation from '../../common/input/PasswordAnimation';

interface LoginFormProps {
    handleOnRegisterClick: () => void;
    success: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleOnRegisterClick, success }) => {
    const url = usePathname();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const isInForgotPage = url === '/forgot';

    useEffect(() => {
        if (success) {
            setSuccessMessage(success);
        }
    }, [success]);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await signIn('credentials', {
            email: email,
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
        <div className="sideBar_connexion-section flex flex-col w-full justify-center items-center mt-4">
            <h3 className="font-semibold text-xl mb-4">Se connecter</h3>
            <p className="text-sm">
                Connectez-vous pour partager vos impressions avec les autres acheteurs.
            </p>
            <div className="sideBar_connexion-section__inputs w-full">
                <form
                    className="flex flex-col items-center justify-center w-full border-none rounded-sm mt-8"
                    onSubmit={handleSubmit}
                >
                    <InputAnimation
                        icon={id_icon}
                        utility="id"
                        type="text"
                        name="Email"
                        label="Email"
                        onChange={handleEmailChange}
                        value={email}
                    />
                    <PasswordAnimation
                        utilitie="password"
                        label="Mot de passe"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handlePasswordChange}
                        boolean={true}
                        value={password}
                    />
                    <Link className='mr-60 md:mr-52 text-xs -mt-5 mb-2 hover:underline' href="/forgot">Mot de passe oublié ?</Link>
                    {isMobile && isInForgotPage && (
                        <p className='text-xs text-green-500'>Fermer la sidebar</p>
                    )}
                    <div className="sideBar_logged-section_user-actions flex items-center justify-center w-full mt-3">
                        <button
                            className="text-white bg-black w-full p-2 hover:bg-gray-800 mt-1 rounded-lg"
                            type="submit"
                        >
                            Se connecter
                        </button>
                        {/* <button type="button"
                            className="sideBar_logged-section_googleConnexionButton rounded-full ml-2 w-11 h-10 border-2 border-[#f1f1f1] flex items-center justify-center hover:bg-gray-200"
                            onClick={() => signIn("google")}>
                            <Image src={google_icon} alt="google icon" width={24} height={24} className="w-6 h-6" />
                        </button> */}
                    </div>
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                    {successMessage && <p className='text-green-500 mt-2 text-center mb-4'>{successMessage}</p>}
                </form>
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
