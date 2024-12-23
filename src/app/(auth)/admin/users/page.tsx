"use client"

import React from "react";
import UserSection from "@lib/UserLib/component/admin/User/UserSection";  

const AdminUserPage: React.FC = () => {
    return (
        <main className="relative flex items-center justify-center min-h-screen">
            <UserSection/>
        </main>
    );
};

export default AdminUserPage;
