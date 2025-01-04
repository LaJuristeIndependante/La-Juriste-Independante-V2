import React, { ChangeEvent } from 'react';
import Image from 'next/image';

interface InputAnimationProps {
    utility: string;
    type: 'text' | 'email' | 'password' | 'textarea' | 'date';
    label: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    name: string;
    value: string;
    placeholder?: string;
}

const InputAnimation2: React.FC<InputAnimationProps> = ({ utility, type, label, onChange, name, value, placeholder }) => {
    return (
        <div className='bg-[#F5F5F5] flex items-center w-full mb-6 border-gray-200 border rounded-md'>
            <div className="flex-grow group w-full">
                {type === 'textarea' ? (
                    <textarea
                        name={name}
                        value={value}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e)} // Type casting pour textarea
                        placeholder={placeholder || label}
                        className="bg-[#F5F5F5] p-2 resize-none flex items-center w-full mb-6 border-gray-200 border rounded-md"
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                        placeholder={label === 'Date de naissance' ? '' : (placeholder || label)}
                        className='input w-full p-2 bg-[#F5F5F5]'
                        required
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                    />
                )}
                <label className='label-p'>{label === 'Date de naissance' ? '' : label}</label>
            </div>
        </div>
    );
}

export default InputAnimation2;
