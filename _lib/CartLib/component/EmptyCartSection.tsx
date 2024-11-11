import React from 'react';
import Image from 'next/image';
import empty_card from '@public/images/common/empty-card.svg';

interface EmptyCartSectionProps {
    closeSidebar: () => void;
}

const EmptyCartSection: React.FC<EmptyCartSectionProps> = ({ closeSidebar }) => {
    return (
        <div className="sideBar_container flex flex-col h-[80vh]">
            <div className="sideBar_empty-card-section flex flex-col items-center justify-center w-full h-full">
                <Image  src={empty_card} alt="empty card" className='mb-4 w-[200px] h-[200px]' />
                <h3 className='font-semibold text-xl mb-4 text-[#666666]'>
                    Panier vide
                </h3>
                <p className='text-center p-4 text-[#666666]'>
                    Ajoutez des articles au panier, puis revenez voir par ici !
                </p>
            </div>
        </div>
    );
};

export default EmptyCartSection;
