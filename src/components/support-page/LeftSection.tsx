"use client";
import React from 'react';
import Image from 'next/image';
import mail_icon from '@public/images/common/mail-icon.svg';
import { useMediaQuery } from 'react-responsive';

function LeftSection() {
  const isMobile = useMediaQuery({ query: '(max-width: 803px)' });
  const specialQuery = useMediaQuery({ query: '(max-width: 1222px)' });

  return (
    <div className={`bg-[#232222] flex flex-col text-white p-4 h-auto md:h-[470px] ${isMobile ? 'text-sm w-5/6 rounded-b-xl' : specialQuery ? 'text-sm w-1/3 rounded-l-xl' : 'text-base w-1/3 rounded-l-xl'}`}>
      <div className='ml-4 flex flex-col justify-center space-y-5'>
        <h2 className={`mt-3 mb-5 ${isMobile ? 'text-2xl' : specialQuery ? 'text-3xl' : 'text-4xl'} font-bold`}>
          Mes coordonnées
        </h2>
        <p className={`mt-1 font-bold w-11/12 ${isMobile ? 'text-xs' : specialQuery ? 'text-sm' : 'text-base'}`}>
          Vous n’avez pas trouvé le modèle type qu’il vous faut ?
        </p>
        <p className={`${specialQuery ? 'text-sm' : ''}`}>
          Pas de problème, je suis là pour vous aider ! Si aucun des modèles proposés ne correspond à vos besoins spécifiques, n’hésitez pas à me contacter.
        </p>
        <p className={`${specialQuery ? 'text-sm' : ''}`}>
          Pour toute demande, contactez-moi directement via le formulaile ou à l’adresse email indiquée. Je me ferait un plaisir de répondre
          rapidement et efficacement à vos besoins.
        </p>
        <CoordsCard
          title='Adresse mail'
          icon={mail_icon}
          content='lajuristeindependante@gmail.com'
          isMobile={isMobile}
          specialQuery={specialQuery}
        />
      </div>
    </div>
  );
}

const CoordsCard = ({ title, icon, content, isMobile, specialQuery }: { title: string, icon: string, content: string | JSX.Element, isMobile: boolean, specialQuery: boolean }) => {
  return (
    <div className={`flex flex-col mt-4 ${isMobile ? 'text-xs' : specialQuery ? 'text-sm' : 'text-base'}`}>
      <div className="flex items-center">
        <h3 className={`font-bold ${isMobile ? 'text-lg' : specialQuery ? 'text-xl' : 'text-2xl'}`}>
          {title}
        </h3>
        <Image src={icon} alt={'icon ' + title} className={`ml-4 ${isMobile ? 'w-6 h-6' : specialQuery ? 'w-7 h-7' : 'w-8 h-8'}`} />
      </div>
      <p className='mt-2'>{content}</p>
    </div>
  );
}

export default LeftSection;
