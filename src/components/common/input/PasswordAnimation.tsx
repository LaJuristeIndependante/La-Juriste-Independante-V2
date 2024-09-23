import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import eye_icon from '@public/images/auth/eye-icon.svg';
import lock_icon from '@public/images/auth/lock-icon.svg';

interface PasswordAnimationProps {
    utilitie: 'password' | 'confirmPassword';
    label: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    boolean: boolean;
    type?: string;  
    placeholder?: string;  
    icon?: string; 
}

const PasswordAnimation: React.FC<PasswordAnimationProps> = ({ utilitie, label, onChange, value, boolean }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePassword = () => {
        if (boolean) {
            setShowPassword(!showPassword);
        }
    }

    return (
        <div className={`bg-[#F5F5F5] flex items-center w-full mt-${utilitie === 'confirmPassword' ? '6' : '3'} mb-6 border-gray-200 border rounded-md`}>
            <div className="flex-grow group w-full">
                <input
                    type={showPassword && boolean ? 'text' : 'password'}
                    className='input p-2 bg-[#F5F5F5] w-full'
                    required
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    onChange={onChange}
                    value={value}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className='label-p'>
                    {label}
                </label>
            </div>
            <button type="button" onClick={togglePassword} className="flex-shrink-0 ml-2">
                <Image src={showPassword ? eye_icon : lock_icon} alt={`${utilitie} icon`} className='w-7 h-7 bg-[#F5F5F5]' />
            </button>
        </div>
    );
}

export default PasswordAnimation;
