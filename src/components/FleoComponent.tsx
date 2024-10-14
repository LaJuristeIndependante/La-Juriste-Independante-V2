import React from 'react'
import Image from 'next/image';
import logo_fleo_web from '@public/images/common/logoSite.png';
import linkedin_icon from '@public/images/common/linkedin-icon.svg';
import website_icon from '@public/images/common/website-icon.svg';

export default function FleoComponent() {
    return (
        <>
            <div className="footer__fleo-pub-logo flex flex-col md:flex-row md:items-center mb-3 sm:mb-0">
                <Image src={logo_fleo_web} alt="logo fleo web" className="w-[50px] h-[50px] mr-3" />
                <div className="footer__fleo-pub-content">
                    <p className="text-lg font-semibold">Conçu par Fleo-Web</p>
                    <p className="text-sm text-gray-500">Léo Torrès - Florian Filloux</p>
                </div>
                <div className="mt-3 md:mt-0 md:ml-auto flex">
                    <ul className="fleo-socials flex justify-between space-x-3">
                        <li><Image src={linkedin_icon} alt="LinkedIn" className='w-4 h-4' /></li>
                        <li><Image src={website_icon} alt="Website" className='w-4 h-4' /></li>
                    </ul>
                </div>
            </div >
        </>
    )
}