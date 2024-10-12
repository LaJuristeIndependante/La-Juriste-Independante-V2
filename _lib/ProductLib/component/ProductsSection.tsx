"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ProductData } from "@lib/ProductLib/type/Product";
import { fetchProductsForClient } from "@lib/ProductLib/service/produit";
import { SlArrowRight } from "react-icons/sl";
import BubbleDecoration from "@lib/ProductLib/component/BubbleDecoration";
import BackgroundBubbles from "@/components/utils/décors/BubbleBackground";
import TitleSectionModels from './TitleSectionModels';
const ProductCard = ({ product }: { product: ProductData }) => {

    return (
        <div className='flex items-center justify-center flex-col'>
            <div
                className="relative flex flex-col items-center justify-center w-[250px] p-2 pb-0 bg-[#EAEAEA] rounded-lg cursor-pointer transition shadow-lg hover:shadow-xl overflow-hidden">
                <p className="font-bold text-xl p-5 ">{product.name}</p>
                <div className="flex flex-col items-start justify-start w-full p-5 pl-5 pt-0">
                    <p className="text-sm justify-start">{product.description}</p>
                    <a
                        href={`/products/${product._id}`}
                        className="text-[#DD2A27] font-bold text-xs md:text-sm flex justify-center p-2 pl-0"
                    >
                        Aperçu <span className={" p-1"}><SlArrowRight /></span>
                    </a>
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
    const router = useRouter();

    const handleRemoveFilter = () => {
        router.push('/products');
    };

    const [products, setProducts] = useState<ProductData[]>([]);

    useEffect(() => {
        const fetchProd = async () => {
            try {
                const data = await fetchProductsForClient(); // Récupération des produits
                setProducts(data); // Mise à jour de l'état 'products'
            } catch (error) {
                console.error("Erreur lors de la récupération des produits:", error);
            }
        };

        fetchProd();
    }, []);

    return (
        <section className="relative min-h-screen w-full mx-auto flex flex-col items-start gap-8 p-8">
            <TitleSectionModels professionName={profession} />
            {products.length > 0 ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border rounded-lg border-dashed border-black py-4 px-2">
                    {products.map((product, index) => (
                        <ProductCard key={product._id || index} product={product} />
                    ))}
                </div>
            ) : (
                <div className="w-full mt-20">
                    <p className={"text-6xl text-center"}>Aucun produit trouvé</p>
                </div>
            )}

            <BackgroundBubbles page='contracts' />
        </section>
    );
}
