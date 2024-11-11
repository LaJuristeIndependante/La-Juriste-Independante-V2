"use client"

import React, {useState} from 'react'
import Image from 'next/image'
import navIcon from '@/../public/images/logo/La Juriste indépendante Admin.png';
import {useSession} from "next-auth/react";
import MenuBurger from "@/components/utils/NavBar/MenuBurger";
import {usePathname, useRouter} from "next/navigation";
import MenuBurgerButton from "@/components/common/button/MenuBurgerButton";
import {useMediaQuery} from "react-responsive";
import {MdOutlineAdminPanelSettings} from "react-icons/md";
import MenuBurgerAdmin from "@/components/utils/NavBar/MenuBurgerAdmin";
import AuthButton from "@/components/common/button/AuthButton";
import AuthSideBar from "@/components/utils/NavBar/AuthSideBar";
import Link from "next/link";
import logo_la_juriste_independante from "@public/images/common/logo-la-juriste-indépendante.svg";


export default function AdminNavbar() {
    const {data: session, status} = useSession();
    const [menuBurgerIsVisible, setMenuBurgerIsVisible] = useState<boolean>(false);
    const [menuAdminIsVisible, setMenuAdminIsVisible] = useState<boolean>(false);
    const [isAuthSideBarVisible, setAuthSideBarVisible] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();

    const isMobile = useMediaQuery({query: '(max-width: 1070px)'});

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
        <header>
            <nav className="flex items-center justify-between w-full">
                <div
                    className={`cursor-pointer flex items-center justify-center space-x-2 p-4`}
                    onClick={() => router.push('/')}
                >
                    <Image src={navIcon} alt="logo" width={60} height={60} style={{height: "auto"}}/>
                </div>
                {!isMobile ? (
                    <>
                        <ul className="flex justify-center w-1/4 items-center">
                            <li className={`${pathname === '/admin' ? 'font-bold' : ''} text-center w-auto min-w-[150px]`}>
                                <Link href="/admin">Accueil</Link>
                            </li>
                            <li className={`${pathname === '/admin/profession' ? 'font-bold' : ''} text-center w-auto min-w-[150px]`}>
                                <Link href="/admin/profession">Profession</Link>
                            </li>
                            <li className={`${pathname === '/admin/product' ? 'font-bold' : ''} text-center w-auto min-w-[150px]`}>
                                <Link href="/admin/product">Contrat</Link>
                            </li>
                            <li className={`${pathname === '/admin/users' ? 'font-bold' : ''} text-center w-auto min-w-[150px]`}>
                                <Link href="/admin/users">Utilisateur</Link>
                            </li>
                            <li className={`${pathname === '/admin/testimonials' ? 'font-bold' : ''} text-center w-auto min-w-[150px]`}>
                                <Link href="/admin/testimonials">Commentaire</Link>
                            </li>
                        </ul>
                    </>
                ) : (
                    <></>
                )}
                <div className={`flex items-center justify-center space-x-4 p-4`}>
                    <button
                        className={`flex justify-center p-2 font-bold space-x-2 rounded-full border border-gray-300 bg-secondary-color`}
                        onClick={() => setMenuAdminIsVisible(true)}
                    >
                        <MdOutlineAdminPanelSettings className={"w-7 h-auto"}/>
                        <p className='mt-0.5'>Administration</p>
                    </button>
                    <AuthButton toggleSidebar={() => authSidebar()}/>
                    {isMobile && <MenuBurgerButton toggleSidebar={menuIsVisible}/>}
                </div>
            </nav>
            <MenuBurger isOpen={menuBurgerIsVisible} onClose={() => setMenuBurgerIsVisible(false)}/>
            <AuthSideBar isOpen={isAuthSideBarVisible} closeSidebar={closeAuthSidebar}/>
            <MenuBurgerAdmin isOpen={menuAdminIsVisible} onClose={() => setMenuAdminIsVisible(false)}/>
        </header>

    )
}
