"use client";

import dynamic from "next/dynamic";

const ProductSection = dynamic(() => import("@/components/home/newsletter/product/ProductSection"), {
    ssr: false, // Désactive le rendu côté serveur
});

export default function ProductPage() {

    return (
        <main>
            <ProductSection/>
        </main>
    );
}
