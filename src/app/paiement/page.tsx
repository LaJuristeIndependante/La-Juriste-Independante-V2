"use client";

import dynamic from "next/dynamic";

const CommandeForm = dynamic(() => import("@lib/StripeLib/components/CommandeForm"), {
    ssr: false, // Désactive le rendu côté serveur
});

const CommandePage: React.FC = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <CommandeForm/>
        </main>
    )
}
export default CommandePage