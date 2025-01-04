"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import slugify from 'slugify';
import { ProductData } from "@lib/ProductLib/type/Product";
import { fetchProductsByProfession } from "@lib/ProductLib/service/produit";
import { SlArrowRight } from "react-icons/sl";
import BubbleDecoration from "@lib/ProductLib/component/BubbleDecoration";
import BackgroundBubbles from "@/components/utils/décors/BubbleBackground";
import TitleSectionModels from './TitleSectionModels';
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductData }) => {
    const truncateDescription = (description: string) => {
        if (description.length > 200) {
            return description.substring(0, 150) + '...';
        }
        return description;
    };

    return (
        <div className='flex items-center justify-center flex-col'>
            <div
                className="relative flex flex-col items-center justify-center w-full max-w-[270px] h-[320px] p-2 pb-0 bg-[#EAEAEA] rounded-lg cursor-pointer transition shadow-lg hover:shadow-xl overflow-hidden">
                <p className="font-bold text-xl p-5 text-center mt-2">{product.name}</p>
                <div className="flex flex-col items-start justify-start w-full p-5 pl-5 pt-0">
                    <p className="text-sm justify-start">{truncateDescription(product.description || '')}</p>
                    <Link
                        href={`/products/${product._id}`}
                        className="text-primary-color font-bold text-xs md:text-sm flex justify-center p-2 pl-0"
                    >
                        Aperçu <span className={" p-1"}><SlArrowRight /></span>
                    </Link>
                </div>
                <div className={"mt-10"}>
                    <BubbleDecoration size={70} position="-right-5 -bottom-2" opacity={0.5} />
                    <BubbleDecoration size={70} position="right-5 -bottom-6" opacity={0.3} />
                </div>
            </div>
            <div className={"shadow-xl flex flex-col bg-[#F8F8F8] rounded-full items-center justify-center mt-[-7%] z-20 w-[190px]"}>
                <p className={"text-center font-bold p-2 w-2/3 items-center"}>{product.price} €</p>
            </div>
        </div>
    );
};

export default function ProductSection() {
    const searchParams = useSearchParams();
    const profession = searchParams.get("profession") || "";

    const [products, setProducts] = useState<ProductData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchProd = async (professionFilter?: string) => {
        setIsLoading(true);
        try {
            const data = await fetchProductsByProfession(professionFilter || '');
            setProducts(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des produits:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProd(profession);
    }, [profession]);

    const handleChange = (profession: string) => {
        fetchProd(slugify(profession, { lower: true }));
    }

    return (
        <section className="relative min-h-screen w-full mx-auto flex flex-col items-start gap-8 p-4 md:p-8">
            <TitleSectionModels professionName={profession} handleChange={handleChange} />
            {isLoading ? (
                <div className="w-full flex items-center justify-center border rounded-lg border-dashed border-black py-4 px-2">
                    <div className="w-full flex flex-col items-center justify-center min-h-[200px]">
                        <p className="text-xl md:text-2xl font-semibold text-center animate-pulse">Chargement...</p>
                    </div>
                </div>
            ) : (
                products.length > 0 ? (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 border rounded-lg border-dashed border-black py-4 px-2">
                        {products.map((product, index) => (
                            <ProductCard key={product._id || index} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex flex-col items-center">
                        <p className="text-2xl md:text-4xl font-islandMoments text-center">Aucun produit trouvé</p>
                        <p className="text-base md:text-lg text-center mt-4">Essayez de modifier votre recherche pour trouver ce que vous cherchez.</p>
                    </div>
                )
            )}

            <BackgroundBubbles page='contracts' />
        </section>
    );
}
