import React from "react";
import '@/styles/globals.css';
import Footer from "@/components/Footer";
import ClientNavbar from "@/components/ClientNavBar";
import CookiePopupManager from "@/components/utils/cookies/CookiePopupManager";
import CleanUpOrders from "@lib/OrderLib/component/CleanupOrder";
import ClientProviders from './(provider)/ClientProviders';
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"
import {Metadata} from "next";

export const metadata : Metadata = {
    title: {
        default: "La juriste indépendante",
        template: "%s - La juriste indépendante"
    },
    description :"Bienvenue sur mon site ! Je suis une juriste indépendante spécialisée dans l'accompagnement juridique des micro-entrepreneurs.",
    twitter: {
        card: "summary_large_image"
    }
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    return (
        <html lang="fr">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <title>La juriste indépendante</title>
                <Script
                    id="google-tag-manager"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WJ5KLS9X');`,
                    }}
                />

                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7144018782963885"
                    crossOrigin="anonymous"></Script>

                <Script
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=G-KMCXCVHLP3`}
                />
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                >
                    {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-KMCXCVHLP3');
            `}
                </Script>
            </head>
            <body className={`bodyGe`}>
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-WJ5KLS9X"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>
                <ClientProviders>
                    <Analytics />
                    <CleanUpOrders />
                    <ClientNavbar />
                    {children}
                    <Footer />
                    <CookiePopupManager />
                </ClientProviders>
            </body>
        </html>
    )
}