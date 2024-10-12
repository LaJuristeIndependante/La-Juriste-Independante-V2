import type { Metadata } from 'next';
import React from "react";
import '@/styles/globals.css';
import Footer from "@/components/Footer";
import ClientNavbar from "@/components/ClientNavBar";
import CookiePopupManager from "@/components/utils/cookies/CookiePopupManager";
import CleanUpOrders from "@lib/OrderLib/component/CleanupOrder";
import ClientProviders from './(provider)/ClientProviders';  // New Client Component

export const metadata: Metadata = {
  title: "La juriste indépendante",
  description: "Fleo web base pour tous les prochains sites Fleo",
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="fr">
      <body className={`bodyGe`}>
        <ClientProviders>
          <CleanUpOrders />
          <ClientNavbar />
          {children}
          <Footer />
          <CookiePopupManager />
        </ClientProviders>
      </body>
    </html>
  );
}
