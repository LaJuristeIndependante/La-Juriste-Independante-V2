"use client";

import dynamic from 'next/dynamic';

const NewsLetterForm = dynamic(() => import('@lib/UserLib/component/admin/newsLetter/newsLetterForm'), {
    ssr: false, // Désactive le rendu côté serveur
});

const AdminCommandePage: React.FC = () => {
    return (
        <main className="relative flex items-center justify-center min-h-screen">
            <NewsLetterForm/>
        </main>
    )
}
export default AdminCommandePage
