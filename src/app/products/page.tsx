"use client";

import dynamic from "next/dynamic";

const ProductSection = dynamic(() => import("@/components/products/ProductsSection"), {
    ssr: false, // Désactive le rendu côté serveur
});

export default function ProductPage() {

    return (
        <main>
            <ProductSection/>
        </main>
    );
}
