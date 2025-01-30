import React from "react";
import '@/styles/globals.css';
import Footer from "@/components/Footer";
import ClientNavbar from "@/components/ClientNavBar";
import CookiePopupManager from "@/components/utils/cookies/CookiePopupManager";
import CleanUpOrders from "@lib/OrderLib/component/CleanupOrder";
import ClientProviders from './(provider)/ClientProviders';
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"
import {DefaultSeo} from "next-seo";
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    return (
        <html lang="fr">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="La Juriste Indépendante" />
                <meta name="keywords" content="juriste, droit, avocat, conseils juridiques, droit des affaires, droit du travail" />

                <DefaultSeo
                    title="La Juriste Indépendante - Votre experte en droit"
                    description="Trouvez l’accompagnement juridique dont vous avez besoin avec La Juriste Indépendante. Conseils personnalisés et expertise en droit."
                    canonical="https://www.lajuristeindependante.com"
                    openGraph={{
                        type: "website",
                        locale: "fr_FR",
                        url: "https://www.lajuristeindependante.com",
                        title: "La Juriste Indépendante - Votre experte en droit",
                        description: "Trouvez l’accompagnement juridique dont vous avez besoin avec La Juriste Indépendante.",
                        images: [
                            {
                                url: "/images/og-image.jpg",
                                width: 1200,
                                height: 630,
                                alt: "La Juriste Indépendante",
                            },
                        ],
                        site_name: "La Juriste Indépendante",
                    }}
                />
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