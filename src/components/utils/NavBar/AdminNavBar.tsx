"use client"

import React, {useState} from 'react'
import Image from 'next/image'
import navIcon from '@/../public/images/logo/La Juriste indépendante Admin.png';
import {useSession} from "next-auth/react";
import {FaUserCircle} from "react-icons/fa";
import MenuBurger from "@/components/utils/NavBar/MenuBurger";
import {useRouter} from "next/navigation";
import MenuBurgerButton from "@/components/common/button/MenuBurgerButton";
import {useMediaQuery} from "react-responsive";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import MenuBurgerAdmin from "@/components/utils/NavBar/MenuBurgerAdmin";
import AuthButton from "@/components/common/button/AuthButton";
import AuthSideBar from "@/components/utils/NavBar/AuthSideBar";


export default function AdminNavbar() {
    const {data: session, status} = useSession();
    const [menuBurgerIsVisible, setMenuBurgerIsVisible] = useState<boolean>(false);
    const [menuAdminIsVisible, setMenuAdminIsVisible] = useState<boolean>(false);
    const [isAuthSideBarVisible, setAuthSideBarVisible] = useState<boolean>(false);
    const router = useRouter();

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const menuIsVisible = () => {
        setMenuBurgerIsVisible(true);
    }

    const authSidebar = () => {
        setAuthSideBarVisible(!isAuthSideBarVisible);
    };

    const closeAuthSidebar = () => {
        setAuthSideBarVisible(false);
    };

    return (
        <header className="flex justify-between transition-all duration-300 text-xl letter-spacing fixed top-0 left-0 right-0 z-50 pt-0 pb-0 hover:bg-black hover:bg-opacity-50 hover:backdrop-blur-md">
            <div
                className={`cursor-pointer flex items-center justify-center space-x-2 p-4`}
                onClick={() => router.push('/admin')}
            >
                <Image src={navIcon} alt="logo" width={60} height={60} style={{height: "auto"}}/>
            </div>
            <div className={`flex items-center justify-center space-x-4 p-4`}>
                <button
                    className={`flex justify-center p-2 font-bold space-x-2 rounded-full bg-[#CACACA]`}
                    onClick={() => setMenuAdminIsVisible(true)}
                >
                    <MdOutlineAdminPanelSettings className={"w-7 h-auto"}/>
                    <p>Administration</p>
                </button>
                <AuthButton toggleSidebar={() => authSidebar()} />
                {isMobile && <MenuBurgerButton toggleSidebar={menuIsVisible}/>}
            </div>
            <MenuBurger isOpen={menuBurgerIsVisible} onClose={() => setMenuBurgerIsVisible(false)}/>
            <AuthSideBar isOpen={isAuthSideBarVisible} closeSidebar={closeAuthSidebar} />
            <MenuBurgerAdmin isOpen={menuAdminIsVisible} onClose={() => setMenuAdminIsVisible(false)}/>
        </header>

    )
}
