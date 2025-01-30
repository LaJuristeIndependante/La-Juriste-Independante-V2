// ClientProviders.tsx
"use client";

import React from "react";
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from "@/app/(provider)/provider";
import {AuthProvider} from "@/context/AuthContext";

const queryClient = new QueryClient();

export default function ClientProviders({children}: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider>
                {children}
            </Provider>
        </QueryClientProvider>
    );
}
