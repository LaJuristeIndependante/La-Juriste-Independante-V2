"use client";

import dynamic from "next/dynamic";

const ProductForm = dynamic(() => import("@lib/UserLib/component/admin/product/AdminProductSection"), {
    ssr: false, // Désactive le rendu côté serveur
});

const AdminProductPage: React.FC = () => {
    return (
        <main className="relative flex items-center justify-center min-h-screen">
            <ProductForm/>
        </main>
    );
}

export default AdminProductPage;
