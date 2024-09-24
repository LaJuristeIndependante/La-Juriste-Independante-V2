import React, {useEffect, useState} from 'react';
import { FaUserCircle } from "react-icons/fa";
import Link from 'next/link';
import {SidebarProps} from "@lib/CartLib/type/CartType";

const MenuBurger: React.FC<SidebarProps> = ({isOpen, onClose}) => {

    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(isOpen); // Pour gérer le moment où l'élément est dans le DOM

    useEffect(() => {
        if (isOpen) {
            // Quand isOpen devient vrai, rendre visible et commencer l'animation
            setShouldRender(true);
            // Attendre un court instant avant d'appliquer `flex` pour éviter les sauts
            const timeout = setTimeout(() => {
                setIsVisible(true);
            }, 10); // Petit délai pour permettre l'application de la classe CSS d'animation

            return () => clearTimeout(timeout);
        } else {
            // Quand isOpen devient faux, lancer l'animation de fermeture puis cacher l'élément
            setIsVisible(false);
            const timeout = setTimeout(() => {
                setShouldRender(false); // Retirer complètement l'élément après l'animation
            }, 300); // Correspond à la durée de l'animation (300ms)

            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    if (!shouldRender) return null; // Ne pas rendre la div si elle ne doit pas être visible

    // Liste des éléments du menu pour modularité
    const menuItems = [
        { label: 'Accueil', href: '/' },
        { label: 'Produits', href: '/products' },
        { label: 'A propos', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Profil', href: '/profile', icon: FaUserCircle },
    ];

    return (
        <div
            className={`absolute top-0 right-0 min-h-screen h-full w-96 bg-white shadow-xl transform transition-transform ease-in-out duration-300 z-50 ${
                isVisible ? 'translate-x-0 flex flex-col' : 'translate-x-full'
            }`}
            style={{ maxHeight: '100vh' }}
        >
            {/* Bouton pour fermer */}
            <button onClick={onClose} className="p-4 self-end">
                <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </button>

            {/* Menu déroulant */}
            <nav className="flex-grow flex flex-col justify-center items-center space-y-8">
                {menuItems.map((item, index) => (
                    <Link key={index} href={item.href}>
                        <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer rounded text-xl transition-colors duration-200 ease-in-out">
                            {item.icon && <item.icon className="inline-block mr-2" />}
                            {item.label}
                        </div>
                    </Link>
                ))}
            </nav>
        </div>
    );
};



export default MenuBurger;
