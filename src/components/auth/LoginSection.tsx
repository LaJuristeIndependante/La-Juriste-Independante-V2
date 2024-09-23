"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import logo_la_juriste_independante from '@public/images/common/logo-la-juriste-indépendante.svg';
import RegisterForm from '@/components/auth/form/RegisterForm';
import LoginForm from '@/components/auth/form/LoginForm';

interface LoginSectionProps {
    onLoginSuccess: () => void;
}

function LoginSection({ onLoginSuccess }: LoginSectionProps): JSX.Element {
    const [registerSection, setRegisterSection] = useState(false);

    const handleOnRegisterClick = () => {
        console.log('register');
        setRegisterSection(true);
    };

    const handleOnLoginClick = () => {
        console.log('login');
        setRegisterSection(false);
    };


    return (
        <div className="sideBar_logo-section flex flex-col items-center justify-center w-full mb-6">
            <Image src={logo_la_juriste_independante} alt="logo la juriste indépendante" />
            <p className="font-special cursive-letters text-4xl mt-1">La Juriste indépendante</p>
            {!registerSection ? (
                <LoginForm handleOnRegisterClick={handleOnRegisterClick} onLoginSuccess={onLoginSuccess} />
            ) : (
                <RegisterForm handleOnLoginClick={handleOnLoginClick} />

            )}
        </div>
    );
}

export default LoginSection;    
