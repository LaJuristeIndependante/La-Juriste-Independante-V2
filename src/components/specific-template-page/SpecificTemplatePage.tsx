"use client";
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { } from '../../../_lib/UserLib/service/auth';
import { getProfessionByContractId } from '@lib/services/contratProfession';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import left_arrow_icon from '@/../public/assets/images/common/left-arrow-icon2.svg';
import arrow_right_icon from '@/../public/assets/images/common/arrow-right-icon.svg';
import card_icon from '@/../public/assets/images/common/cart-icon.svg';
import TemplateCart3 from './TemplateCart3';
import { Template } from '@/types/Template';


const whichProfession = async (templateId: string): Promise<string | undefined> => {
    const response = await getProfessionByContractId(templateId);
    return response.data[0]?.name;
};

interface SpecificTemplatePageProps {
    template: Template | null;
    templateId: string;
}

const SpecificTemplatePage: React.FC<SpecificTemplatePageProps> = ({ template, templateId }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const { isAuthenticated } = useAuth();

    const { data: profession } = useQuery<string | undefined>(
        ['profession', templateId],
        () => whichProfession(templateId),
        {
            enabled: !!templateId,
        }
    );

    useEffect(() => {
        document.title = 'Modèle spécifique';

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1153);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const { data: cartData, isLoading: cartLoading, refetch: refetchCart } = useQuery(
        'userCart',
        getUserCart,
        {
            enabled: isAuthenticated,
        }
    );

    const { mutate: addToCartMutation, isLoading: addingToCart } = useMutation(
        addContractToCart,
        {
            onSuccess: () => {
                refetchCart();
            },
            onError: (error: unknown) => {
                console.error('Erreur lors de l\'ajout au panier:', error);
            }
        }
    );

    const handleAddToCart = async () => {
        if (isAuthenticated && template?._id) {
            try {
                const quantity = 1;
                await addToCartMutation({ productId: template._id, quantity });
            } catch (error) {
                console.error('Erreur lors de l\'ajout au panier:', error);
            }
        } else if (!isAuthenticated) {
            let cart = JSON.parse(localStorage.getItem('cart') ?? '') || { items: [] };

            if (!Array.isArray(cart.items)) {
                cart.items = [];
            }

            const itemIndex = cart.items.findIndex((item: { product: string }) => item.product === template?._id);

            if (itemIndex !== -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                cart.items.push({ product: template?._id, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Produit ajouté au panier', cart);
        }
    };

    const handleBuyNow = () => {
        console.log("Acheter directement");
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center justify-start">
                    <button onClick={() => window.history.back()} className='flex items-center'>
                        <Image src={left_arrow_icon} alt="left arrow icon" className='w-12 h-12' />
                    </button>
                    <div className="flex flex-col ml-3">
                        <h1 className='text-3xl font-semibold text-center mt-10 mb-10 ml-3'>
                            <span>{template?.name || 'Modèle'}</span>
                        </h1>
                        <p className='bg-gray-200 p-2 rounded-lg text-center ml-3 mb-8'>
                            <span className='w-full text-center'>
                                {profession || 'Profession non disponible'}
                            </span>
                        </p>
                    </div>
                </div>
                <hr className="md:w-[500px] border-[12px] md:border-l-8 rounded-l-xl border-special-red my-10" />
            </div>
            <div className="flex md:justify-evenly items-center w-full justify-between">
                <TemplateCart3
                    template={template && template.image ? {
                        name: template.name,
                        image: { type: "default", data: template.image.data }, 
                        price: template.price ?? 0
                    } : undefined}
                />

                <div className="flex-col items-center w-full md:max-w-[700px] mt-10 md:mt-0">
                    {!isMobile ? (
                        <p className='max-w-[700px] text-lg xs:text-xl md:text-xl xl:text-xl text-justify'>
                            {template?.description || 'Description non disponible'}
                        </p>
                    ) : (
                        <details>
                            <summary className='text-lg font-bold text-center'>Description</summary>
                            <p className='text-center'>
                                {template?.description || 'Description non disponible'}
                            </p>
                        </details>
                    )}
                    <div className='flex items-center justify-center w-full md:w-auto space-x-4 mt-10'>
                        {!isMobile ? (
                            <>
                                <button
                                    onClick={handleBuyNow}
                                    className='bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center w-full md:w-[14.77vw] hover:bg-red-500 hover:text-white transition duration-300 sm:text-lg md:text-lg lg:text-base xl:text-sm'>
                                    Acheter directement
                                    <span className="arrow-right ml-2">
                                        <Image src={arrow_right_icon} alt="arrow right" className='w-6 h-6' />
                                    </span>
                                </button>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={addingToCart}
                                    className='text-black bg-white border-2 border-black px-4 py-2 rounded-lg flex items-center justify-center w-full md:w-[14.77vw] h-[42px] hover:bg-red-600 hover:text-black transition duration-300 sm:text-lg md:text-lg lg:text-base xl:text-sm'
                                >
                                    {addingToCart ? 'Ajout en cours...' : 'Ajouter au panier'}
                                    <span className="">
                                        <Image src={card_icon} alt="card icon" className="w-6 h-6" />
                                    </span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="flex items-center justify-center w-[70px] h-[70px] bg-red-500 text-white rounded-md"
                                    onClick={handleBuyNow}
                                >
                                    <span className="text-4xl pb-1">+</span>
                                    <span className="arrow-right"></span>
                                </button>
                                <button className="flex items-center justify-center w-[70px] h-[70px] text-black bg-white border-2 border-black rounded-xl"
                                    onClick={handleAddToCart}
                                    disabled={addingToCart}
                                >
                                    <span className="">
                                        <Image src={card_icon} alt="card icon" className="w-6 h-6" />
                                    </span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpecificTemplatePage;
