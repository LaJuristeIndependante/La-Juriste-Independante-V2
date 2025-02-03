
import dynamic from "next/dynamic";
import {Metadata} from "next";

const ProductSection = dynamic(() => import("@lib/ProductLib/component/ProductsSection"), {
    ssr: false,  
});

export const metadata: Metadata = {
    title: "Produits",
};

export default function ProductPage() {

    return (
        <main className="min-h-screen h-auto flex flex-col items-center justify-center">
            <ProductSection />
        </main>
    );
}
