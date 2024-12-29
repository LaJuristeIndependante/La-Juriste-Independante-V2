"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { useRouter, usePathname } from 'next/navigation';
import logo_la_juriste_independante from '@public/images/common/logo-la-juriste-indépendante.svg';
import AuthButton from '@/components/common/button/AuthButton';
import MenuBurgerButton from '@/components/common/button/MenuBurgerButton';
import AuthSideBar from "@/components/utils/NavBar/AuthSideBar";
import CartSideBar from "@lib/CartLib/component/SideBarCart";
import cart_icon from '@public/images/common/cart-icon.svg';
import MenuBurger from "@/components/utils/NavBar/MenuBurger";
import { useSession } from "next-auth/react";

function Navbar() {
    const router = useRouter();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const pathname = usePathname();
    const [isAuthSideBarVisible, setAuthSideBarVisible] = useState<boolean>(false);
    const [typeButton, setTypeButton] = useState<'auth' | 'cart' | 'menuBurger'>('auth');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [menuBurgerIsVisible, setMenuBurgerIsVisible] = useState<boolean>(false);
    const session = useSession().data;

    const authSidebar = () => {
        setAuthSideBarVisible(!isAuthSideBarVisible);
    };

    const closeAuthSidebar = () => {
        setAuthSideBarVisible(false);
    };

    const menuIsVisible = () => {
        setMenuBurgerIsVisible(true);
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavClick = (targetId: string) => {
        router.push('/');

        setTimeout(() => {
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth",
                });
            }
        }, 100);
    };

    return (
        <header>
            <nav className="flex items-center justify-between w-full">
                <Link href="/">
                    {!isMobile ? (
                        <Image src={logo_la_juriste_independante} alt="logo-juriste_independante" className="ml-4" />
                    ) : (
                        <Link
                            className="text-3xl sm:text-2xl md:text-3xl ml-2 lg:text-4xl xl:text-5xl font-special cursive-letters text-center mt-3"
                            href="/">
                            La juriste indépendante
                        </Link>
                    )}
                </Link>
                {!isMobile && (
                    <ul className="flex justify-between w-1/4 items-center">
                        <li className={`${pathname === '/' ? 'font-bold' : ''} text-center w-[100px]`}>
                            <Link href="/">Accueil</Link>
                        </li>
                        <li className={`${pathname === '/products' ? 'font-bold' : ''} text-center w-auto min-w-[150px]`}>
                            <Link href="/products">Modèles types</Link>
                        </li>
                        <li className={`${pathname === '/support' ? 'font-bold' : ''} text-center w-[100px]`}>
                            <Link href="/support">Support</Link>
                        </li>
                        {session?.user && (
                            <li className={`${pathname === '/orders' ? 'font-bold' : ''} text-center w-auto min-w-[150px]`}>
                                <Link href="/orders">Commande</Link>
                            </li>
                        )}
                    </ul>
                )}
                <div className={`flex items-center ${!isMobile && 'mr-2'}`}>
                    <button onClick={() => setIsSidebarOpen(true)} className="btn btn-primary btn-lg cart_button mr-3">
                        <span className="fa fa-shopping-cart">
                            <Image src={cart_icon} alt="cart-icon" className='w-6 h-6' />
                        </span>
                    </button>
                    <AuthButton toggleSidebar={() => authSidebar()} />
                    {isMobile && <MenuBurgerButton toggleSidebar={menuIsVisible} />}
                </div>
            </nav>
            <MenuBurger isOpen={menuBurgerIsVisible} onClose={() => setMenuBurgerIsVisible(false)} isOpenAdmin={false} />
            <AuthSideBar isOpen={isAuthSideBarVisible} closeSidebar={closeAuthSidebar} />
            <CartSideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </header>
    );
}

export default Navbar;
