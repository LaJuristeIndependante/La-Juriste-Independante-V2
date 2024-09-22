"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProductDetail } from "@lib/ProductLib/type/Product";
import Carousel from "@/components/utils/décors/Carroussel";
import { fetchProducts } from "@lib/ProductLib/service/produit";

const ProductCard = ({ product }: { product: ProductDetail }) => {
    const base64Image = product.image
        ? `data:image/png;base64,${product.image}` // Assure que `product.image` est déjà encodé en base64
        : '';

    return (
        <div className="flex flex-col items-center justify-center w-1/2 p-2">
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

const SecondSection = () => {
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
        <section
            className="relative min-h-screen flex flex-col items-center justify-center z-20 pt-20 md:pt-24"
            id="products"
        >
            <h2 className="flex text-center items-center justify-center text-stroke-black text-4xl">
                Nos Produits
            </h2>
            <h3 className="flex text-stroke-black text-xl font-lazy-dog text-center items-center justify-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </h3>
            {products.length > 0 ? (
                <Carousel
                    items={products.map((product, index) => (
                        <ProductCard key={product._id || index} product={product} />
                    ))}
                />
            ) : (
                <div className="mt-20">
                    <l-bouncy
                        size="45"
                        speed="1.75"
                        color="black"
                    ></l-bouncy>
                </div>
            )}
        </section>
    );
};

export default SecondSection;
