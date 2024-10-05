"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function ProductPage() {
    const searchParams = useSearchParams();
    const param = searchParams.get('param'); // Lire le paramètre 'param' dans l'URL

    return (
        <main className="relative min-h-screen flex items-center justify-center">
            <div>
                <h1 className="text-3xl font-bold">Product Page</h1>
                <p className="text-xl">Paramètre reçu: {param}</p>
            </div>
        </main>
    );
}
