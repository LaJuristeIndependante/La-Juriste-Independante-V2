"use client";
import React from 'react';
import Link  from 'next/link';
import logo_la_juriste_independante from '@public/images/common/logo-white-la-juriste-indépendante.svg';
import logo_fleo_web from '@public/images/common/logoSite.png';
import linkedin_icon from '@public/images/common/linkedin-icon.svg';
import website_icon from '@public/images/common/website-icon.svg';
import Image from 'next/image';
import useMediaQuery from 'react-responsive';

function Footer() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <footer className={`z-50 relative w-full bg-[#232222] text-white h-full ${isMobile ? ' py-10' : 'py-5 px-10'}`}>
            <div className={`flex w-full h-full ${isMobile ? 'flex-col items-center justify-center' : ''}`}>
                <div className="footer__content flex flex-col items-start justify-start px-4 w-1/4">
                    <div className="footer__top flex items-start justify-start w-full">
                        <div className="footer__logo flex flex-col items-start justify-start ml-5">
                            <Image src={logo_la_juriste_independante} alt="logo la juriste indépendante" />
                            {!isMobile && (
                                <p className="footer__logo__text cursive-letters text-4xl">La Juriste Indépendante</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`flex w-full h-full ${isMobile ? 'flex-col items-start justify-center pl-5' : 'justify-evenly'}`}>
                    {!isMobile && (
                        <div className="footer_site-pages flex flex-col justify-start space-y-2">
                            <h3 className="footer__site-pages__title font-semibold text-2xl">Plan du site</h3>
                            <ul className="footer__site-pages__list space-y-1">
                                <li className="footer__site-pages list__item">
                                    <Link href="/">Accueil</Link>
                                </li>
                                <li className="footer__site-pages list__item">
                                    <Link href="/products">Contrats</Link>
                                </li>
                                <li className="footer__site-pages list__item">
                                    <Link href="/support">Support</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className="footer_legal-pages flex flex-col justify-start space-y-2 ">
                        <h3 className="footer__legal-pages__title font-semibold text-2xl">Légal</h3>
                        <ul className="footer__legal-pages__list space-y-1">
                            <li className="footer__legal-pages list__item">
                                <Link href="/privacy">Politique de confidentialité</Link>
                            </li>
                            <li className="footer__legal-pages list__item">
                                <Link href="/terms-of-uses">Conditions d&apos;utilisation</Link>
                            </li>
                            <li className="footer__legal-pages list__item">
                                <Link href="/terms-of-sales">Conditions de vente</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer_social-links flex flex-col justify-start space-y-2">
                        <h3 className="footer__social-links__title font-semibold text-2xl">Réseaux</h3>
                        <ul className="footer__social-links__list space-y-1">
                            <li className="footer__social-links list__item">
                                <Link href="https://instagram.com">Instagram</Link>
                            </li>
                            <li className="footer__social-links list__item">
                                <Link href={"https://facebook.com"}>Facebook</Link>
                            </li>
                            <li className="footer__social-links list__item">
                                <Link href="/contact">Nous contacter</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="footer__separator w-[98%] border border-[#4A4A4A] my-5 mx-auto" />
            <div className="footer__fleo-pub flex items-center w-full pl-[1%] h-6 pt-2">
                <Image src={logo_fleo_web} alt="logo fleo web" width={50} height={50} className='w-[50px] h-[50px]' />
                <div className="footer__fleo-pub-content flex flex-col items-start">
                    <p className="footer__fleo-pub__logo text-lg font-semibold">Conçu par Fleo-Web</p>
                    <p className="footer__fleo-pub__text text-sm text-gray-500">Léo Torrès - Florian Filloux - Dorian Blanchet</p>
                </div>
                <div>
                    <ul className="fleo-socials flex justify-between">
                        <li><Image src={linkedin_icon} alt="LinkedIn" width={16} height={16} className='w-4 h-4' /></li>
                        <li><Image src={website_icon} alt="Website" width={16} height={16} className='w-4 h-4' /></li>
                        <li><Image src="" alt="" width={16} height={16} className='w-4 h-4' /></li>
                        <li><Image src="" alt="" width={16} height={16} className='w-4 h-4' /></li>
                        <li><Image src="" alt="" width={16} height={16} className='w-4 h-4' /></li>
                        <li><Image src="" alt="" width={16} height={16} className='w-4 h-4' /></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
