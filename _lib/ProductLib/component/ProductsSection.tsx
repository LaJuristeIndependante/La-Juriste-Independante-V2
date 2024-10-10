"use client";

import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {RiPencilLine} from 'react-icons/ri';
import {useRouter} from 'next/navigation';

import {ProductData, ProductDetail} from "@lib/ProductLib/type/Product";
import {fetchProductsForClient} from "@lib/ProductLib/service/produit";

import Image from "next/image";
import BackgroundBubbles from "@/components/utils/décors/BubbleBackground";
import BubbleDecoration from "@lib/ProductLib/component/BubbleDecoration";

import line from "@public/images/Utils/redline.png"
import loopPaper from "@public/images/Utils/loopPaper.png"
import right from "@public/images/Utils/right-icon.svg"
import {SlArrowRight} from "react-icons/sl";
const ProductCard = ({product}: { product: ProductData }) => {

    return (
        <div className="relative">
            <div
                className="relative flex flex-col items-center justify-center p-2 pb-0 bg-[#EAEAEA] rounded-lg cursor-pointer transition shadow-lg hover:shadow-xl overflow-hidden"> {/* Ajout de `overflow-hidden` */}
                <p className="font-bold text-xl p-5 ">{product.name}</p>
                <div className="flex flex-col items-start justify-start w-full p-5 pl-0 pt-0">
                    <p className="text-sm justify-start">{product.description}</p>
                    <a
                        href={`/products/${product._id}`}
                        className="text-[#DD2A27] font-bold text-xs md:text-sm flex justify-center p-2 pl-0"
                    >
                        Aperçu <span className={"bg-white p-1"}><SlArrowRight /></span>
                    </a>
                </div>
                <div className={"mt-10"}>
                    <BubbleDecoration size={70} position="-right-5 -bottom-2" opacity={0.5}/>
                    <BubbleDecoration size={70} position="right-5 -bottom-6" opacity={0.3}/>
                </div>
            </div>
            <div className={"shadow-6xl flex flex-col items-center justify-center absolute -bottom-5 w-full"}>
                <p className={"text-center font-bold bg-[#F8F8F8] rounded-full p-2 w-2/3 items-center"}>{product.price} €</p>
            </div>
        </div>
    );
};

export default function ProductSection() {
    const searchParams = useSearchParams();
    const profession = searchParams.get("profession");
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
            <div className={"flex justify-between items-center w-full"}>
                <div className={"space-y-10 flex-2"}>
                    <h1 className={"text-5xl font-bold"}>
                        Des contrats qui correspondent <span className={"relative"}>à vos besoins <Image src={line}
                                                                                                         alt={"line"}
                                                                                                         className={"absolute right-0 w-full"}/></span>
                    </h1>

                    {/* Title */}
                    <h2 className="text-2xl font-light">
                        Je propose des contrats adaptés à la plupart des professions nécessitant mes services.
                    </h2>

                    {/* Remove Filter Button */}
                    {profession && (
                        <div
                            className="inline-flex justify-center space-x-4 bg-[#E8E8E8] rounded-lg py-2 px-7 shadow-md text-black w-auto text-lg font-light"
                        >
                            <p>{profession}</p>
                            <RiPencilLine className={"w-7 h-auto cursor-pointer"} onClick={handleRemoveFilter}/>
                        </div>
                    )}

                    {/* More Contracts Section */}
                    <div className="flex items-center gap-3 mt-10">
                        <span className="text-2xl font-semibold">Plus de contrats</span>
                    </div>
                </div>
                <div className={"flex justify-center items-center text-center flex-1"}>
                    <Image src={loopPaper} alt={"loop paper"}/>
                </div>
            </div>

            {/* Product Section */}
            {products.length > 0 ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <ProductCard key={product._id || index} product={product}/>
                    ))}
                </div>
            ) : (
                <div className="w-full mt-20">
                    <p className={"text-6xl text-center"}>Aucun produit trouvé</p>
                </div>
            )}

            <BackgroundBubbles size={96} position={"-right-16 -bottom-16"}/>
        </section>
    );
}
