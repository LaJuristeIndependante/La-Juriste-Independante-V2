"use client";
import React from 'react';
import ProfileSection from '@/components/SideSection/ProfileSection';


interface SideBarProps {
    isOpen: boolean;
    closeSidebar: () => void;
}

const AuthSideBar: React.FC<SideBarProps> = ({ isOpen, closeSidebar }) => {
    return (
        <div
            className={`w-[300px] h-[100vh] bg-white p-[20px] z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0 x-99' : 'translate-x-full'}`}
            style={{position: 'fixed', top: 0, right: 0, zIndex: 10, borderLeft: '1px solid #a0aec0'}}
        >
            <div className="flex items-center justify-between p-4 border-b bg-tertiary">
                <button
                    className="text-4xl font-bold text-text-secondary hover:text-text-quinary transition-colors"
                    onClick={() => closeSidebar()}
                >
                    &times;
                </button>
            </div>

            <ProfileSection closeSidebar={closeSidebar}/>
        </div>
    );
}

export default AuthSideBar;