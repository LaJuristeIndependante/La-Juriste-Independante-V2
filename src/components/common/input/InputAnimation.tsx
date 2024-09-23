import React, { ChangeEvent } from 'react';
import Image from 'next/image';

interface InputAnimationProps {
  icon: string;
  utility: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'date';
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name: string;
  value: string;
  placeholder?: string; 
}

const InputAnimation: React.FC<InputAnimationProps> = ({ icon, utility, type, label, onChange, name, value }) => {
  return (
    <div className='bg-[#F5F5F5] flex items-center w-full mb-6 border-gray-200 border rounded-md'>
      <div className="flex-grow group w-full">
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void} // Type assertion
            placeholder={label}
            className="bg-[#F5F5F5] p-2 resize-none flex items-center w-full mb-6 border-gray-200 border rounded-md"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void} // Type assertion
            className='input w-full p-2 bg-[#F5F5F5]'
            required
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        )}
        <span className="highlight"></span>
        <span className="bar"></span>
        <label className='label-p'>{label}</label>
      </div>
      <span className="flex-shrink-0 ml-2">
        <Image src={icon} alt={`${utility} icon`} className='w-7 h-7 bg-[#F5F5F5]' />
      </span>
    </div>
  );
}

export default InputAnimation;
