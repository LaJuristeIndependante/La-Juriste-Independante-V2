import React from 'react';
import Image from 'next/image';
import close_icon from '@public/images/common/close-icon.svg';

type FlashResponseProps = {
    title: string;
    content: string;
    icon: string;
    onClose: () => void;
};

const FlashResponse: React.FC<FlashResponseProps> = ({ title, content, icon, onClose }) => {
    return (
        <div className='flash-response p-4 rounded-md flex items-center justify-between xs:w-1/4 sm:w-1/2 md:w-1/3 bg-white shadow-lg'>
            <div className="flex items-center">
                <Image src={icon} alt={`${title} icon`} className="w-6 h-6" />
                <div className="flex flex-col ml-2">
                    <h3 className="text-black text-xl font-semibold">{title}</h3>
                    <p className="text-black text-sm">{content}</p>
                </div>
            </div>
            <div className="flex justify-end cursor-pointer" onClick={onClose}>
                <Image src={close_icon} alt="close icon" className="w-6 h-6" />
            </div>
        </div>
    );
};


export default FlashResponse;
