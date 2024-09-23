"use client";
import React from 'react';
import ProfileSection from '@/components/SideSection/ProfileSection';
import MenuBurgerSection from '@/components/SideSection/MenuBurgerSection';

type TypeButton = 'auth' | 'cart' | 'menuBurger';

interface SideBarProps {
    isOpen: boolean;
    closeSidebar: () => void;
    typeButton: TypeButton;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, closeSidebar, typeButton }) => {
    return (
        <div
            className={`w-[300px] h-[100vh] bg-white p-[20px] z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0 x-99' : 'translate-x-full'}`}
            style={{ position: 'fixed', top: 0, right: 0, zIndex: 10, borderLeft: '1px solid #a0aec0' }}
        >
            {typeButton === 'auth' ? (
                <ProfileSection closeSidebar={closeSidebar} />
            ) : typeButton === 'menuBurger' ? (
                <MenuBurgerSection closeSidebar={closeSidebar} />
            ) : null}
        </div>
    );
}

export default SideBar;


// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Sidebar from './SideBar';
// import BurgerMenu from './MenuBurger';
// import Link from 'next/link';
// import logo from '../../../../public/assets/images/logo/La Juriste indépendante.png';
// import cart from "../../../../public/assets/images/Utils/black-cart-icon.png";
// import { AiOutlineUser } from "react-icons/ai";

// export default function Navbar() {
//     const [isBlurred, setIsBlurred] = useState(false);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const router = useRouter();
//     const { data: session } = useSession();

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollPosition = window.scrollY;
//             setIsBlurred(scrollPosition > 50);
//         };

//         window.addEventListener('scroll', handleScroll);
//         handleScroll();

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const handleNavClick = (targetId: string) => {
//         router.push('/');

//         setTimeout(() => {
//             const targetElement = document.getElementById(targetId);

//             if (targetElement) {
//                 window.scrollTo({
//                     top: targetElement.offsetTop,
//                     behavior: "smooth",
//                 });
//             }
//         }, 100);
//     };

//     return (
//         <header
//             className={`fixed top-0 left-0 right-0 transition-all duration-300 ${isBlurred ? 'bg-opacity-50 backdrop-blur-md' : 'bg-transparent'} z-50`}>
//             <nav className="font-thin text-lg py-2">
//                 <div className="flex items-center justify-between">
//                     <div className="flex w-1/3 justify-start items-center pl-1">
//                         <Link href="/">
//                             <Image src={logo} alt="logo" width={60} height={60}/>
//                         </Link>
//                     </div>

//                     <div className="hidden md:flex flex-1 justify-center">
//                         <ul className="flex items-center justify-center font-light  space-x-8">
//                             <li className="whitespace-nowrap">
//                                 <Link href="/">Accueil</Link>
//                             </li>
//                             <li className="whitespace-nowrap cursor-pointer"
//                                 onClick={() => handleNavClick("produits")}>Contrats
//                             </li>
//                             <li className="whitespace-nowrap">
//                                 <Link href="/contact">Contact</Link>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Cart and Profile or Burger Menu */}
//                     <div className="flex w-1/3 justify-end items-center pr-2 space-x-2">
//                         <button onClick={() => setIsSidebarOpen(true)}>
//                             <Image src={cart} alt="cart" width={30} height={30}/>
//                         </button>

//                         {/* Profile button hidden on mobile and tablet screens, Burger Menu visible */}
//                         <div className="hidden md:block">
//                             {!session?.user ? (
//                                 <Link href="/login" className="bg-secondary text-primary rounded-xl px-4 py-2">Se
//                                     connecter</Link>
//                             ) : (
//                                 <Link href="/profile"
//                                       className="bg-secondary text-primary rounded-xl px-4 py-2 flex items-center">
//                                     <AiOutlineUser size={35}/>
//                                 </Link>
//                             )}
//                         </div>

//                         {/* Burger Menu for mobile and tablet screens */}
//                         <div className="md:hidden">
//                             <BurgerMenu/>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//         </header>

//     );
// }





// "use client";

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import logo_sidebar from '../../../../public/assets/images/logo/fleo-web-reversed.png';
// import { useSession } from 'next-auth/react';
// import { FiTrash2 } from 'react-icons/fi';
// import { useRouter } from "next/navigation";

// interface SidebarProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// interface CartItem {
//     product: {
//         _id: string | undefined;
//         productId: string;
//         name: string;
//         price: number;
//         image?: string;
//     };
//     quantity: number;
//     _id: string;
// }

// // Article Component
// const Article: React.FC<{
//     item: CartItem;
//     onDecrement: (id: string) => void;
//     onRemove: (id: string) => void;
//     onIncrement: (id: string) => void
// }> = ({ item, onDecrement, onRemove, onIncrement }) => {
//     const { product, quantity } = item;
//     const base64Image = product.image
//         ? `data:image/png;base64,${Buffer.from(product.image).toString('base64')}`
//         : '';

//     return (
//         <li className="flex items-center justify-between p-2 mb-4 bg-white rounded-lg shadow-sm z-100">
//             <div className="flex items-center space-x-6">
//                 <button
//                     onClick={() => onRemove(item._id)}
//                     className="text-gray-600 hover:text-red-600 transition-colors flex items-center justify-center"
//                 >
//                     <FiTrash2 size={18} />
//                 </button>

//                 <div className="flex items-center">
//                     <button
//                         onClick={() => onDecrement(item._id)}
//                         className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600 transition-colors shadow-md"
//                     >
//                         -
//                     </button>
//                     <div className="text-lg font-semibold text-gray-800 mx-2">
//                         {quantity}
//                     </div>
//                     <button
//                         onClick={() => onIncrement(item._id)}
//                         className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-green-600 transition-colors shadow-md"
//                     >
//                         +
//                     </button>
//                 </div>
//             </div>

//             <div className="flex space-x-6 ml-4">
//                 {base64Image ? (
//                     <div className="relative w-14 h-14 rounded-lg shadow-md overflow-hidden">
//                         <Image
//                             src={base64Image}
//                             alt={`Image of ${product.name}`}
//                             fill
//                             style={{ objectFit: 'cover' }}
//                             quality={100}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 ) : (
//                     <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
//                         <span className="text-gray-500">No Image</span>
//                     </div>
//                 )}
//                 <div>
//                     <p className="text-lg font-semibold text-gray-800">{product.name}</p>
//                     <p className="text-sm text-gray-600">€ {(product.price * quantity).toFixed(2)}</p>
//                 </div>
//             </div>
//         </li>
//     );
// };

// const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
//     const [cartItems, setCartItems] = useState<CartItem[]>([]);
//     const [total, setTotal] = useState<number>(0);
//     const { data: session } = useSession();
//     const router = useRouter();

//     useEffect(() => {
//         const fetchCartItems = async () => {
//             if (!session?.user) {
//                 console.error('user not authenticated');
//                 return;
//             }

//             try {
//                 const res = await fetch(`/api/cart?userId=${session.user.id}`);
//                 if (res.ok) {
//                     const items = await res.json();
//                     setCartItems(items);
//                 } else {
//                     console.error('Failed to fetch cart items:', res.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching cart items:', error);
//             }
//         };

//         fetchCartItems();
//     }, [session]);

//     useEffect(() => {
//         const totalPrice = cartItems.reduce((acc, item) => {
//             const itemPrice = Number(item.product.price);
//             const itemQuantity = Number(item.quantity);
//             return acc + (isNaN(itemPrice) || isNaN(itemQuantity) ? 0 : itemPrice * itemQuantity);
//         }, 0);
//         setTotal(totalPrice);
//     }, [cartItems]);

//     const handleDecrement = async (id: string) => {
//         const item = cartItems.find((cartItem) => cartItem._id === id);
//         if (!item) return;

//         const newQuantity = item.quantity - 1;

//         if (newQuantity <= 0) {
//             await handleRemove(id);
//             return;
//         }

//         const productId = item.product?._id || item.product?.productId;

//         if (!productId) {
//             console.error('Product ID is undefined:', item.product);
//             return;
//         }

//         try {
//             const res = await fetch(`/api/cart`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     productId,
//                     userId: session?.user?.id,
//                     quantity: newQuantity,
//                 }),
//             });

//             if (res.ok) {
//                 const updatedItems = cartItems.map((cartItem) =>
//                     cartItem._id === id ? { ...cartItem, quantity: newQuantity } : cartItem
//                 );
//                 setCartItems(updatedItems);
//             } else {
//                 console.error('Failed to decrement item quantity:', res.statusText);
//             }
//         } catch (error) {
//             console.error('Error decrementing item quantity:', error);
//         }
//     };

//     const handleIncrement = async (id: string) => {
//         const item = cartItems.find((cartItem) => cartItem._id === id);
//         if (!item) return;

//         const newQuantity = item.quantity + 1;

//         const productId = item.product?._id || item.product?.productId;

//         if (!productId) {
//             console.error('Product ID is undefined:', item.product);
//             return;
//         }

//         try {
//             const res = await fetch(`/api/cart`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     productId,
//                     userId: session?.user?.id,
//                     quantity: newQuantity,
//                 }),
//             });

//             if (res.ok) {
//                 const updatedItems = cartItems.map((cartItem) =>
//                     cartItem._id === id ? { ...cartItem, quantity: newQuantity } : cartItem
//                 );
//                 setCartItems(updatedItems);
//             } else {
//                 console.error('Failed to increment item quantity:', res.statusText);
//             }
//         } catch (error) {
//             console.error('Error incrementing item quantity:', error);
//         }
//     };

//     const handleRemove = async (id: string) => {
//         const item = cartItems.find((cartItem) => cartItem._id === id);
//         if (!item) return;

//         try {
//             const res = await fetch(`/api/cart/${item.product._id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     productId: item.product._id,
//                     userId: session?.user?.id,
//                 }),
//             });

//             if (res.ok) {
//                 const updatedItems = cartItems.filter((cartItem) => cartItem._id !== id);
//                 setCartItems(updatedItems);
//             } else {
//                 console.error('Failed to remove item from cart:', res.statusText);
//             }
//         } catch (error) {
//             console.error('Error removing item from cart:', error);
//         }
//     };

//     const handleCheckout = async () => {
//         if (cartItems.length === 0) return;

//         const orderItems = cartItems.map(item => ({
//             productId: item.product._id || item.product.productId,
//             name: item.product.name,
//             price: item.product.price,
//             quantity: item.quantity,
//         }));

//         try {
//             const response = await fetch('/api/orders', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     items: orderItems,
//                     amount: total, // Total calculé précédemment
//                     userId: session?.user?.id,
//                 }),
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 // Suppression des articles du panier après la création réussie de la commande
//                 await clearCartItems();

//                 // Rediriger vers la page de paiement
//                 router.push(`/paiement?orderId=${result.orderId}`);
//             } else {
//                 console.error('Erreur lors de la création de la commande:', result.error);
//             }
//         } catch (error) {
//             console.error('Erreur lors de la commande:', error);
//         }
//     };

//     const clearCartItems = async () => {
//         try {
//             for (const item of cartItems) {
//                 const response = await fetch(`/api/cart/${item.product._id}`, {
//                     method: 'DELETE',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         productId: item.product._id,
//                         userId: session?.user?.id,
//                     }),
//                 });

//                 if (!response.ok) {
//                     console.error(`Erreur lors de la suppression de l'article avec ID ${item.product._id}:`, response.statusText);
//                     return;  // Arrêtez si une suppression échoue
//                 }
//             }

//             console.log('Tous les articles du panier ont été supprimés avec succès.');

//             // Mise à jour de l'état local pour vider le panier
//             setCartItems([]);
//         } catch (error) {
//             console.error('Erreur lors de la suppression des articles du panier:', error);
//         }
//     };

//     return (
//         <div
//             className={`fixed top-0 right-0 h-full bg-white w-96 bg-tertiary text-secondary shadow-xl transform transition-transform ${ // Augmentation de z-50 à z-60
//                 isOpen ? 'translate-x-0' : 'translate-x-full'
//             }`}
//         >
//             <div className="flex items-center justify-between px-4 py-2">
//                 <h2 className="text-2xl font-bold text-text-primary">Mon Panier</h2>
//                 <button
//                     className="text-4xl font-bold text-text-secondary hover:text-text-quinary transition-colors"
//                     onClick={onClose}
//                 >
//                     &times;
//                 </button>
//             </div>
//             <div className="p-4 overflow-y-auto">
//                 <div className="mb-4">
//                     <h3 className="text-lg font-semibold text-text-primary">Articles</h3>
//                     <ul className="list-none mt-2">
//                         {cartItems.length > 0 ? (
//                             cartItems.map((item, index) => (
//                                 <Article
//                                     key={index}
//                                     item={item}
//                                     onDecrement={handleDecrement}
//                                     onIncrement={handleIncrement}
//                                     onRemove={handleRemove}
//                                 />
//                             ))
//                         ) : (
//                             <li className="text-text-secondary">Votre panier est vide.</li>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//             <div className="absolute bottom-6 left-4 right-4">
//                 <hr className="border border-black mb-2"/>
//                 <div className="flex items-center justify-between">
//                     <Image src={logo_sidebar} alt="logo" width={50} height={50}/>
//                     <div className="flex flex-col">
//                         <span className="text-text-secondary">Total</span>
//                         <span className="text-text-primary">€ {total.toFixed(2)}</span>
//                     </div>
//                     <button
//                         className="bg-bg-secondary text-primary font-lazy-dog py-2 w-1/3 rounded-lg hover:bg-bg-tertiary transition-colors"
//                         onClick={handleCheckout}
//                     >
//                         Commander
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;
