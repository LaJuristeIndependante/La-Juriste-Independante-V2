"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import mail_icon from '@public/images/common/mail-icon.svg';
import loca_icon from '@public/images/common/location-icon.svg';
import phone_icon from '@public/images/common/phone-icon.svg';


function LeftSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 803);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={` bg-[#232222] flex flex-col text-white p-4 h-auto md:h-[490px] ${isMobile ? 'text-sm w-5/6 rounded-b-xl ' : 'text-base w-1/3 rounded-l-xl '}`}>
      <div className='ml-4'>
        <h2 className={`mt-6 mb-8 ${isMobile ? 'text-3xl' : 'text-5xl'} font-bold`}>
          Mes coordonnées
        </h2>
        <p className={`mt-1 w-11/12 ${isMobile ? 'text-xs' : 'text-base'}`}>
            Vous n’avez pas trouvé le modèle juridique qu’il vous faut ? <br/>
            Pas de problème, nous sommes là pour vous aider ! Si aucun des modèles proposés ne correspond à vos besoins spécifiques, n’hésitez pas à nous contacter.
            Nous serons ravis de vous accompagner dans la création d’un modèle juridique personnalisé, parfaitement adapté à votre activité.<br/>
            Pour toute demande, contactez-nous directement via le formulaire ci-dessous ou à l’adresse email indiquée. Notre équipe se fera un plaisir de répondre 
            rapidement et efficacement à vos besoins. <br/>
            Ensemble, trouvons la solution qui vous convient !        
        </p>
        <div className="flex flex-col">
          <CoordsCard
            title='Adresse mail'
            icon={mail_icon}
            content='lajuristeindependante@gmail.com'
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
}

const CoordsCard = ({ title, icon, content, isMobile }: { title: string, icon: string, content: string | JSX.Element, isMobile: boolean }) => {
  return (
    <div className={`flex flex-col mt-4 ${isMobile ? 'text-xs' : 'text-base'}`}>
      <div className="flex items-center">
        <h3 className={`font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>
          {title}
        </h3>
        <Image src={icon} alt={'icon ' + title} className={`ml-4 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
      </div>
      <p className='mt-2'>{content}</p>
    </div>
  );
}

export default LeftSection;
