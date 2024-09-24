import React from 'react';
import { convertBufferToBase64 } from '@/components/utils/ConvertBufferToBase64';
import Image from 'next/image';
import model_card_background_image from '@/../public/assets/images/models-page/model-card-background-image.svg';
import default_model_image from '@/../public/assets/images/models-page/model-card-title-icon.png';   

type TemplateCart3Props = {
    template?: {
        name: string;
        image: {
        type: string;
        data: Buffer;
    } | null;
        price: number;
    };
};
const TemplateCart3: React.FC<TemplateCart3Props> = ({ template }) => {
    if (!template || !template.image) return null;

    // Provide a default type if not present
    const title_icon_Url = template.image.data ? convertBufferToBase64(template.image.data) : default_model_image;

    return (
        <div className='flex flex-col items-center justify-center h-[320px] w-[250px] md:w-[400px] z-999'>
            <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-md h-full w-full md:w-[400px]" style={{ background: `url(${model_card_background_image}) no-repeat bottom right, #FFFFFF`, backgroundSize: '150px 115px' }}>
                <div className="flex items-center justify-center w-full border-1 border-black h-full">
                    <div className="flex-col items-center justify-center w-full z-20 h-full mt-10">
                        <h2 className="text-xl font-bold text-center z-19 mb-[35px]">{template.name}</h2>
                        <Image src={title_icon_Url.toString()} alt={`product ${template.name}`} className="w-20 h-20 mx-auto" />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center rounded-full w-[75%] bg-gray-200 mx-auto mt-[-6%] shadow-md">
                <p className='font-bold text-2xl p-2 text-center'>
                    {template.price} €
                </p>
            </div>
        </div>
    );
};

export default TemplateCart3;