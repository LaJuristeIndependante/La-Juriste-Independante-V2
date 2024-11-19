"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import close_icon from '@public/images/common/close-icon.svg';
import home_icon from '@public/images/common/home-icon.svg';
import models_icon from '@public/images/common/contract-icon.svg';
import support_icon from '@public/images/common/phone2-icon.svg';
import next_icon from '@public/images/common/next-icon.svg';

interface MenuBurgerSectionProps {
    closeSidebar: () => void;
}

const MenuBurgerSection: React.FC<MenuBurgerSectionProps> = ({ closeSidebar }) => {
    return (
        <div className="sideBar_container flex flex-col">
            <div className="sideBar_top_close_icon flex justify-end" style={{ zIndex: 20 }} onClick={closeSidebar}>
                <span className="fa fa-close">
                    <Image src={close_icon} alt="close icon" className='w-6 h-6' />
                </span>
            </div>
            <ul className="flex flex-col w-full items-center">
                <li className="w-full">
                    <NavItemCard
                        icon={home_icon}
                        title="Accueil"
                        link="/"
                        closeSidebar={closeSidebar}
                    />
                </li>
                <li className="w-full">
                    <NavItemCard
                        icon={models_icon}
                        title="Modèles"
                        link="/models"
                        closeSidebar={closeSidebar}
                    />
                </li>
                <li className="w-full">
                    <NavItemCard
                        icon={support_icon}
                        title="Support"
                        link="/support"
                        closeSidebar={closeSidebar}
                    />
                </li>
            </ul>
        </div>
    );
}

interface NavItemCardProps {
    icon: string;
    title: string;
    link: string;
    closeSidebar: () => void;
}

const NavItemCard: React.FC<NavItemCardProps> = ({icon, title, link, closeSidebar}) => {
    const router = useRouter();

    const handleClick = () => {
        closeSidebar();
        router.push(link);
    };

    return (
        <div className='flex bg-[#E8E8E8] rounded-md w-full mt-3 button-effect' onClick={handleClick}>
            <div className='flex items-center justify-center bg-[#E8E8E8] rounded-full mt-2 mb-2 ml-1'>
                <Image src={icon} alt={`${title} icon`} className='w-14 h-14' />
            </div>
            <div className="flex flex-col items-center w-20">
                <h3 className='font-bold text-lg mt-1 mb-1'>
                    {title}
                </h3>
            </div>
            <div className='flex items-center justify-center ml-auto'>
                <Image src={next_icon} alt="next icon" className='w-12 h-12' style={{ marginLeft: 'auto', marginRight: '10px' }} />
            </div>
        </div>
    );
};

export default MenuBurgerSection;
