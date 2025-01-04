"use client";
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import { SidebarProps } from "@lib/CartLib/type/CartType";
import { useSession } from "next-auth/react";

interface MenuBurgerProps extends SidebarProps {
    isOpenAdmin: boolean;
}

const MenuBurger: React.FC<MenuBurgerProps> = ({ isOpen, onClose, isOpenAdmin }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(isOpen);
    const session = useSession().data;

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            const timeout = setTimeout(() => {
                setIsVisible(true);
            }, 10);

            return () => clearTimeout(timeout);
        } else {
            setIsVisible(false);
            const timeout = setTimeout(() => {
                setShouldRender(false);
            }, 300);

            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    const menuItems = [
        { label: 'Accueil', href: '/' },
        { label: 'Modèles types', href: '/products' },
        { label: 'Support', href: '/support' },
    ];

    const menuAdminItems = [
        { label: 'Accueil', href: '/admin' },
        { label: 'Profession', href: '/admin/profession' },
        { label: 'Contrat', href: '/admin/product' },
        { label: 'Utilisateur', href: '/admin/users' },
        { label: 'Commentaire', href: '/admin/testimonials' },
    ];

    if (session?.user) {
        menuItems.push({ label: 'Commande', href: '/orders' })
    }

    const itemsToRender = isOpenAdmin ? menuAdminItems : menuItems;

    return (
        <div
            className={`${isMobile ? 'w-full' : 'w-96'} fixed top-0 right-0 min-h-screen h-full bg-white shadow-xl transform transition-transform ease-in-out duration-300 z-50
            ${isVisible ? 'translate-x-0 flex flex-col' : 'translate-x-full'}`}
            style={{ maxHeight: '100vh' }}
        >
            <div className="flex items-center justify-between p-4 border-b bg-tertiary">
                <h2 className="text-2xl font-bold text-text-primary">Navigation</h2>
                <button
                    className="text-4xl font-bold text-text-secondary hover:text-text-quinary transition-colors"
                    onClick={() => onClose()}
                >
                    &times;
                </button>
            </div>

            {/* Menu déroulant */}
            <nav className="flex-grow h-[95%] flex flex-col justify-center items-center space-y-8">
                {itemsToRender.map((item, index) => (
                    <Link key={index} href={item.href}>
                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded text-xl transition-colors duration-200 ease-in-out" onClick={onClose}>
                            {item.label}
                        </div>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default MenuBurger;
