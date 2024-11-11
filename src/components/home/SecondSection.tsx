"use client";
import React from 'react';
import Image from 'next/image';
import lajuriste_icon from '@public/images/common/lajuriste-icon.svg';
import { useMediaQuery } from 'react-responsive';

function SecondSectionComponent(): React.ReactElement {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <div className={`${isMobile ? 'h-[80vh]' : 'h-[90vh]'} flex flex-col md:flex-row justify-evenly items-center mb-5`}>
            <div className='flex items-center justify-center w-full md:w-1/3 h-48 md:h-72'>
                {isMobile ? (
                    <div className="flex items-center flex-col justify-center h-[350px] w-[220px] mb-10" style={{
                        backgroundImage: `url(${lajuriste_icon.src})`, backgroundSize: 'cover', backgroundPosition: 'center'
                    }}>
                        <p className="text-right text-white text-stroke text-sm mt-2 md:mt-4 mr-3">A PROPOS</p>
                        <h2
                            className="text-white text-2xl text-stroke font-bold text-center w-48 h-24 flex items-center justify-center"
                        >
                            Qui suis-je ?
                        </h2>
                    </div>
                ) : (
                    <Image src={lajuriste_icon} alt="lajuriste-img" />
                )}
            </div>
            <div className='flex flex-col items-center md:items-end w-11/12 md:w-1/3'>
                {!isMobile && (
                    <div className='border-8 border-primary-color w-48 md:w-[300px] h-24 md:h-[120px] mr-5 md:mr-0 mb-5 md:mb-0'>
                        <p className="text-right text-sm mt-2 md:mt-4 mr-3">A PROPOS</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-right mr-3">Qui suis-je ?</h2>
                    </div>
                )}
                <p className='text-center md:text-left md:w-full mt-3 md:mt-5 mx-4 md:mx-0'>
                    Bienvenue sur mon site ! Je suis une juriste indépendante spécialisée dans l&apos;accompagnement juridique des micro-entrepreneurs.
                    Avec plus de 10 ans d&apos;expérience et un bac+5 en droit, je propose des templates/ modèles type juridique. Ensemble, assurons la
                    protection et la réussite de votre entreprise.
                </p>
            </div>
        </div>
    );
}

export default SecondSectionComponent;
