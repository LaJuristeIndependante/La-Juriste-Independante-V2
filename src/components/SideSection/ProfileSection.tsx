"use client";
import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import close_icon from '@public/images/common/close-icon.svg';
import LoginSection from '@/components/auth/LoginSection';
import SectionProfile from "@lib/UserLib/component/auth/profile/SectionProfile";

const ProfileSection: React.FC<{ closeSidebar: () => void }> = ({ closeSidebar }) => {
    const { data: session } = useSession();


    if (session) {
        return (
            <div className="flex flex-col">
                <SectionProfile/>
            </div>
        );
    }

    return (
        <LoginSection />
    );
};

export default ProfileSection;
