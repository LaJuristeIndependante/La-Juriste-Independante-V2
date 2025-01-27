"use client"

import React, { useEffect, useState } from 'react';
import { FaCommentDots, FaFileContract, FaGraduationCap, FaUser, FaUserCircle, FaShieldAlt, FaEdit, FaSignOutAlt } from "react-icons/fa";
import { SidebarProps } from "@lib/CartLib/type/CartType";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LJIAdmin from "@public/images/logo/AdminJuristeMenu.png"

const MenuBurger: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(isOpen);

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

    const handleProfessions = () => {
        router.push("/admin/professions");
    };

    const handleProducts = () => {
        router.push("/admin/products");
    };

    const handleComptes = () => {
        router.push("/admin/comptes");
    };

    const handleCommentaires = () => {
        router.push("/admin/commentaires");
    };

    return (
        <div
            className={`absolute top-0 right-0 min-h-screen h-full w-96 bg-white shadow-xl transform transition-transform ease-in-out duration-300 z-50 ${isVisible ? 'translate-x-0 flex flex-col' : 'translate-x-full'
                }`}
            style={{ maxHeight: '100vh' }}
        >
            {/* Bouton pour fermer */}
            <button onClick={onClose} className="p-4 self-end">
                <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </button>

            {/* Nouvelle section Administrateur */}
            <div className="flex flex-col items-center p-6 ">
                <Image src={LJIAdmin} alt={"la juriste"} className="text-6xl text-gray-600" />
                <h2 className="text-2xl font-semibold mt-4">Administrator</h2>
                <p className="text-gray-500 mt-2">27 products • 5 commandes</p>
                <div className="flex space-x-6 mt-4">
                    <button className="flex flex-col items-center">
                        <FaShieldAlt className="text-red-500 text-3xl" />
                    </button>
                    <button className="flex flex-col items-center">
                        <FaEdit className="text-gray-500 text-3xl" />
                    </button>
                    <button className="flex flex-col items-center">
                        <FaSignOutAlt className="text-gray-500 text-3xl" />
                    </button>
                </div>
            </div>

            {/* Menu déroulant */}
            <nav className="flex-grow flex flex-col justify-center items-center space-y-8">
                <button
                    onClick={handleProfessions}
                    className="flex items-center justify-between w-full h-24 bg-gray-100 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                >
                    <div className="flex items-center space-x-4">
                        <FaGraduationCap className="text-3xl" />
                        <div className="text-left">
                            <p className="text-lg font-semibold">Professions</p>
                            <p className="text-sm text-gray-600">14 disponibles, 2 masquées</p>
                        </div>
                    </div>
                    <IoIosArrowForward className="text-2xl" />
                </button>
                <button
                    onClick={handleProducts}
                    className="flex items-center justify-between w-full h-24 bg-gray-100 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                >
                    <div className="flex items-center space-x-4">
                        <FaFileContract className="text-3xl" />
                        <div className="text-left">
                            <p className="text-lg font-semibold">Products</p>
                            <p className="text-sm text-gray-600">27 disponibles, 14 réservés</p>
                        </div>
                    </div>
                    <IoIosArrowForward className="text-2xl" />
                </button>
                <button
                    onClick={handleComptes}
                    className="flex items-center justify-between w-full h-24 bg-gray-100 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                >
                    <div className="flex items-center space-x-4">
                        <FaUser className="text-3xl" />
                        <div className="text-left">
                            <p className="text-lg font-semibold">Comptes</p>
                            <p className="text-sm text-gray-600">48 actifs, 2 en attente, 1 désactivé</p>
                        </div>
                    </div>
                    <IoIosArrowForward className="text-2xl" />
                </button>
                <button
                    onClick={handleCommentaires}
                    className="flex items-center justify-between w-full h-24 bg-gray-100 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                >
                    <div className="flex items-center space-x-4">
                        <FaCommentDots className="text-3xl" />
                        <div className="text-left">
                            <p className="text-lg font-semibold">Commentaires</p>
                            <p className="text-sm text-gray-600">154 postés, 17 suspects</p>
                        </div>
                    </div>
                    <IoIosArrowForward className="text-2xl" />
                </button>
            </nav>
        </div>
    );
};

export default MenuBurger;
