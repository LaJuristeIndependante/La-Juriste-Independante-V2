"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { useRouter, usePathname } from 'next/navigation';
import logo_la_juriste_independante from '@public/images/common/logo-la-juriste-indépendante.svg';
import AuthButton from '@/components/common/button/AuthButton';
import MenuBurgerButton from '@/components/common/button/MenuBurgerButton';
import SideBar from "@/components/utils/NavBar/SideBar";
import CartSideBar from "@lib/CartLib/component/SideBarCart";
import cart_icon from '@public/images/common/cart-icon.svg';

function Navbar() {
    const router = useRouter();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const pathname = usePathname();
    const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false);
    const [typeButton, setTypeButton] = useState<'auth' | 'cart' | 'menuBurger'>('auth');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = (buttonType: 'auth' | 'cart' | 'menuBurger') => {
        setSidebarVisible(!isSidebarVisible);
        setTypeButton(buttonType);
    };

    const closeSidebar = () => {
        setSidebarVisible(false);
    };

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
                {!isMobile ? (
                    <>
                        <Link href="/">
                            <Image src={logo_la_juriste_independante} alt="logo-juriste_independante" className="ml-4" />
                        </Link>
                        <ul className="flex justify-between w-1/4 items-center">
                            <li className={`${pathname === '/' ? 'font-bold' : ''} text-center w-[100px]`}>
                                <Link href="/">Accueil</Link>
                            </li>
                            <li className={`${pathname === '/templates' ? 'font-bold' : ''} text-center w-auto min-w-[150px]`}>
                                <Link href="/products">Templates types</Link>
                            </li>
                            <li className={`${pathname === '/support' ? 'font-bold' : ''} text-center w-[100px]`}>
                                <Link href="/support">Support</Link>
                            </li>
                        </ul>
                    </>
                ) : (
                    <>
                        <Link href="/" className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-special cursive-letters text-center mt-1">
                            La juriste indépendante
                        </Link>
                    </>
                )}
                <div className={`flex items-center ${!isMobile && 'mr-2'}`}>
                    <button onClick={() => setIsSidebarOpen(true)} className="btn btn-primary btn-lg cart_button mr-3" >
                         <span className="fa fa-shopping-cart">
                             <Image src={cart_icon} alt="cart-icon" className='w-6 h-6' />
                        </span>
                    </button>
                    <AuthButton toggleSidebar={() => toggleSidebar('auth')} />
                    {isMobile && <MenuBurgerButton toggleSidebar={() => toggleSidebar('menuBurger')} />}
                </div>
            </nav>

            <SideBar isOpen={isSidebarVisible} closeSidebar={closeSidebar} typeButton={typeButton} />
            <CartSideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </header>
    );
}

export default Navbar;

