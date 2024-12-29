"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useMediaQuery from 'react-responsive';
import logo_la_juriste_independante from '@public/images/common/logo-white-la-juriste-indépendante.svg';
import FleoComponent from './FleoComponent';

function Footer() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    return (
        <footer className={`footer relative  w-full bg-[#232222] z-10 text-white h-full ${isMobile ? ' py-10' : 'py-5 px-10'}`}>
            <div className={`flex w-full h-full flex-col md:flex-row items-start justify-start`}>
                <div className="footer__content flex md:flex-col md:items-start items-center justify-center md:justify-start px-4 w-full md:w-1/4">
                    <div className="footer__top flex items-center md:items-start justify-center md:justify-start md:w-[450px]">
                        <div className="footer__logo flex flex-col items-start justify-start w-full ml-5">
                            <Image src={logo_la_juriste_independante} alt="logo la juriste indépendante" />
                            <p className="footer__logo__text hidden md:block cursive-letters text-2xl md:text-3xl lg:text-4xl">
                                La Juriste Indépendante
                            </p>
                        </div>
                    </div>
                </div>
                <div className={`flex w-full h-full space-y-7 md:space-y-0 flex-col md:flex-row items-start  justify-center md:justify-evenly md:pl-5`}>
                    <div className="footer_site-pages flex flex-col justify-start space-y-2">
                        <h3 className="footer__site-pages__title font-semibold text-2xl">Plan du site</h3>
                        <ul className="footer__site-pages__list space-y-1">
                            <li className="footer__site-pages list__item">
                                <Link href="/">Accueil</Link>
                            </li>
                            <li className="footer__site-pages list__item">
                                <Link href="/products">Modèles types</Link>
                            </li>
                            <li className="footer__site-pages list__item">
                                <Link href="/support">Support</Link>
                            </li>
                        </ul>
                    </div>
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
                            {/* <li className="footer__social-links list__item">
                                <Link target='blank' href="https://www.instagram.com/arianebarrons/">Instagram</Link>
                            </li>
                            <li className="footer__social-links list__item">
                                <Link target='blank' href="https://facebook.com">Facebook</Link>
                            </li> */}
                            <li className="footer__social-links list__item">
                                <Link href="/support">Me contacter</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="footer__separator w-[98%] border border-[#4A4A4A] my-5 mx-auto" />
            <FleoComponent />
        </footer>
    );
}

export default Footer;
