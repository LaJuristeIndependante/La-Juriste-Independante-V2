"use client";

import React, { Suspense } from 'react';
import ResetForm from "@lib/UserLib/component/auth/forgot/ResetForm";

const ChangePassword: React.FC = () => {


    return (
        <main className="h-screen relative">
            <div className="flex items-center justify-center h-full w-full z-10">
                <Suspense fallback={<div>Loading...</div>}>
                    <ResetForm />
                </Suspense>
            </div>
        </main>
    );
};

export default ChangePassword;
