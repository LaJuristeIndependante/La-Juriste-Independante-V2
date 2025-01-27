"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import logo_la_juriste_independante from '@public/images/common/logo-la-juriste-indépendante.svg';
import RegisterForm from '@/components/auth/form/RegisterForm';
import LoginForm from '@/components/auth/form/LoginForm';

interface LoginSectionProps {
    closeSidebar: () => void;
}

const LoginSection: React.FC<LoginSectionProps> = ({ closeSidebar }) => {
    const [registerSection, setRegisterSection] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');


    const handleOnRegisterClick = () => {
        setRegisterSection(true);
    };

    const handleOnSuccessLoginClick = (text: string) => {
        setSuccessMessage(text);
        setRegisterSection(false);
    };

    const handleOnLoginClick = () => {
        setRegisterSection(false);
    }



    return (
        <div className="flex flex-col items-center justify-center w-full mb-6">
            <Image src={logo_la_juriste_independante} alt="logo la juriste indépendante" />
            <p className="font-special cursive-letters text-4xl mt-1">La Juriste indépendante</p>
            {!registerSection ? (
                <LoginForm handleOnRegisterClick={handleOnRegisterClick} success={successMessage || ""} />
            ) : (
                <RegisterForm handleOnLoginClick={handleOnLoginClick} handleOpenLogin={handleOnSuccessLoginClick} />

            )}
        </div>
    );
}

export default LoginSection;    
