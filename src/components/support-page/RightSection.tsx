"use client";
import React, { useEffect, useState } from 'react';
import InputAnimation from '../common/input/InputAnimation';
import Image from 'next/image';
import user_icon from '@public/images/common/auth-icon.svg';
import mail_icon from '@public/images/common/mail-icon2.svg';
import object_icon from '@public/images/common/object-icon.svg';
import textarea_icon from '@public/images/common/textarea-icon.svg';

function RightSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 803);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`border-2 border-black max-w-[600px] flex flex-col items-start justify-center p-4 h-auto md:h-[500px] ${isMobile ? 'text-sm w-11/12' : 'text-base w-full'}`}>
      <div className="w-full">
        <h3 className={`font-bold mt-6 mb-8 w-full ${isMobile ? 'text-3xl' : 'text-5xl'}`}>
          Contactez-nous
        </h3>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full space-y-4 md:space-y-0">
          <div className='w-full md:w-[48%] flex items-center'>
            <InputAnimation
              label='Nom'
              icon={user_icon}
              utility='text'
              type='text'
              onChange={function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
                throw new Error('Function not implemented.');
              }}
              name={''}
              value={''}
            />
          </div>
          <div className='w-full md:w-[48%] flex items-center'>
            <InputAnimation
              label='Adresse mail'
              icon={mail_icon}
              utility='text'
              type='email'
              onChange={function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
                throw new Error('Function not implemented.');
              }}
              name={''}
              value={''}
            />
          </div>
        </div>
        <div className="w-full mb-6">
          <InputAnimation
            label='Objet'
            icon={object_icon}
            utility='text'
            type={'text'}
            onChange={function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
              throw new Error('Function not implemented.');
            }}
            name={''}
            value={''}
          />
        </div>
        <div className='w-full h-40 bg-[#F5F5F5] flex items-center mb-6 border-gray-200 border rounded-md'>
          <textarea
            className='w-11/12 h-full p-4 bg-[#F5F5F5] resize-none outline-none'
            placeholder='Texte'
          ></textarea>
          <span className='w-1/12 h-full flex items-center justify-center bg-[#F5F5F5]'>
            <Image src={textarea_icon} alt='textarea_icon' className='w-6 h-6' />
          </span>
        </div>
        <button className='w-full bg-[#DD2A27] text-white focus:outline-none py-2 rounded-md hover:bg-[#FF4D4D]'>
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default RightSection;
