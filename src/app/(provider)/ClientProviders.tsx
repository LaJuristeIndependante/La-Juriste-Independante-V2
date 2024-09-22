// ClientProviders.tsx
"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '@/context/AuthContext';
import { Provider } from "@/app/(provider)/provider";

const queryClient = new QueryClient();

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider>
          {children}
        </Provider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
