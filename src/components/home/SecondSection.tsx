"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import lajuriste_icon from '@public/images/common/lajuriste-icon.svg';

function SecondSectionComponent() : React.ReactElement {
    const [isFlex, setIsFlex] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsFlex(window.innerWidth < 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`${isFlex ? 'h-[80vh]' : 'h-[90vh]'} flex flex-col md:flex-row justify-evenly items-center mb-5`}>
            <div className='flex items-center justify-center w-full md:w-1/3 h-48 md:h-72'>
                {isFlex ? (
                    <div className="flex items-center justify-center h-[250px] md:h-72 w-48 md:w-72 bg-cover bg-center mb-10" style={{
                        background: `url(${lajuriste_icon}) no-repeat center / cover`,
                    }}>
                        <p className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-special cursive-letters text-white text-stroke text-center mt-1">
                            Qui suis-je ?
                        </p>
                    </div>
                ) : (
                    <Image src={lajuriste_icon} alt="lajuriste-img" />
                )}
            </div>
            <div className='flex flex-col items-center md:items-end w-full md:w-1/3'>
                {!isFlex && (
                    <div className='border-8 border-red-500 w-48 md:w-[300px] h-24 md:h-[120px] mr-5 md:mr-0 mb-5 md:mb-0'>
                        <p className="text-right text-sm mt-2 md:mt-4 mr-3">A PROPOS</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-right mr-3">Qui suis-je ?</h2>
                    </div>
                )}
                <p className='text-center md:text-left text-sm md:text-lg w-11/12  mt-5 mx-4 md:mx-0 special-text'>
                    Bienvenue sur mon site ! Je suis une juriste indépendante spécialisée dans l&apos;accompagnement juridique des micro-entrepreneurs.
                    Avec plus de 10 ans d&apos;expérience et un bac+5 en droit, je propose des templates/ modèles type juridique. Ensemble, assurons la
                    protection et la réussite de votre entreprise.
                </p>
            </div>
        </div>
    );
}

export default SecondSectionComponent;
