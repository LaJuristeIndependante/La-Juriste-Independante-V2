"use client";

import dynamic from "next/dynamic";
import BubbleBackground from "@/components/utils/décors/BubbleBackground";

const ProductForm = dynamic(() => import("@lib/UserLib/component/admin/product/AdminProductSection"), {
    ssr: false, // Désactive le rendu côté serveur
});

const AdminProductPage: React.FC = () => {
    return (
        <main className="relative flex items-start justify-center h-auto min-h-screen z-1">
            <ProductForm />
            <BubbleBackground page={'contracts'} />
        </main>
    );
};

export default AdminProductPage;
