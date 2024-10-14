"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ProductSection = dynamic(() => import("@lib/ProductLib/component/ProductsSection"), {
    ssr: false,  
});

export default function ProductPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <main className="h-screen flex flex-col items-center justify-center">
            {isLoading ? (
                    <p className="text-3xl">Chargement...</p>
            ) : (
                <ProductSection />
            )}
        </main>
    );
}
