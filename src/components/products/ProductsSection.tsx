"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { RiPencilLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

import { ProductDetail } from "@lib/ProductLib/type/Product";
import { fetchProducts } from "@lib/ProductLib/service/produit";

import Image from "next/image";
import BackgroundBubbles from "@/components/utils/décors/BubbleBackground";

import line from "@public/images/Utils/redline.png"
import loopPaper from "@public/images/Utils/loopPaper.png"

const ProductCard = ({ product }: { product: ProductDetail }) => {
    const base64Image = product.image
        ? `data:image/png;base64,${product.image}` // Assure que `product.image` est déjà encodé en base64
        : '';

    return (
        <div className="flex flex-col items-center justify-center p-2 border border-gray-300 rounded-lg">
            <div className="relative w-full h-0 pb-[100%] bg-tertiary border-2 rounded-lg overflow-hidden">
                {base64Image ? (
                    <Image
                        src={base64Image}
                        alt={product.name}
                        fill
                        objectFit="cover"
                        className="rounded-lg"
                    />
                ) : (
                    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <p>Image non disponible</p>
                    </div>
                )}
                <a
                    href={`/products/${product._id}`}
                    className="bg-secondary text-white py-2 px-4 rounded-lg absolute bottom-2 right-2 text-xs md:text-sm lg:text-base"
                >
                    En savoir plus
                </a>
            </div>
            <p className="text-primary text-left mt-4 text-sm md:text-lg lg:text-xl font-bimbo text-stroke-black-2">
                {product.name}
            </p>
        </div>
    );
};

export default function ProductPage() {
    const searchParams = useSearchParams();
    const profession = searchParams.get("profession");
    const router = useRouter();

    const handleRemoveFilter = () => {
        router.push('/products');
    };

    const [products, setProducts] = useState<ProductDetail[]>([]);

    useEffect(() => {
        const fetchProd = async () => {
            try {
                const data = await fetchProducts(); // Récupération des produits
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
                        <ProductCard key={product._id || index} product={product} />
                    ))}
                </div>
            ) : (
                <div className="w-full mt-20">
                    <p className={"text-6xl text-center"}>Aucun produit trouvé</p>
                </div>
            )}

            <BackgroundBubbles size={96} position={"-right-16 -bottom-16"} />
        </section>
    );
}
