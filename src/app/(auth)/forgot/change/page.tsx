"use client";

import React from 'react';
import ResetForm from "@lib/UserLib/component/auth/forgot/ResetForm";

const ChangePassword: React.FC = () => {


    return (
        <main className="h-screen relative">
            <div className="flex items-center justify-center h-full w-full z-10">
                <ResetForm />
            </div>
        </main>
    );
};

export default ChangePassword;
