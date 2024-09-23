"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { authEventEmitter } from '@/context/AuthContext';
import { convertBufferToBase64 } from '../utils/ConvertBufferToBase64';
import { updateProfilePicture } from '../../../_lib/UserLib/service/auth';

interface UserDetails {
    userId: string;
    username: string;
    estAdmin?: boolean;
    profileImage?: {
        data: Buffer;
    };
}

interface LoggedAsAdminProps {
    userDetails: UserDetails;
    handleLogout: () => Promise<void>;
    closeSidebar: () => void;
    generalUserDetails: UserDetails;
}

const LoggedAsAdmin: React.FC<LoggedAsAdminProps> = ({ userDetails, handleLogout, closeSidebar, generalUserDetails }) => {
    const [editProfileDisplay, setEditProfileDisplay] = useState<boolean>(false);
    const [currentUserDetails, setCurrentUserDetails] = useState<UserDetails>(userDetails);
    const [currentGeneralUserDetails, setCurrentGeneralUserDetails] = useState<UserDetails | null>(generalUserDetails);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleAuthChange = async () => {
            const updatedUserDetails = await fetch('/auth/user-info').then(res => res.json());
            setCurrentUserDetails(updatedUserDetails);
            setCurrentGeneralUserDetails(updatedUserDetails);
        };

        authEventEmitter.on('authChange', handleAuthChange);

        return () => {
            authEventEmitter.off('authChange', handleAuthChange);
        };
    }, []);

    const handleEditProfile = () => {
        setEditProfileDisplay(prev => !prev);
    };

    const username = currentGeneralUserDetails?.username || currentUserDetails?.username;
    const profileImageBase64 = currentGeneralUserDetails?.profileImage?.data
        ? convertBufferToBase64(currentGeneralUserDetails.profileImage.data)
        : null;

    const handleProfilePictureClick = () => {
        if (editProfileDisplay) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                await updateProfilePicture(file);
                const updatedUserDetails = await fetch('/auth/user-info').then(res => res.json());
                setCurrentUserDetails(updatedUserDetails);
                setCurrentGeneralUserDetails(updatedUserDetails);
            } catch (error) {
                console.error('Error updating profile picture:', error);
            }
        }
    };

    const handleGeneralUserDetailsUpdate = (updatedGeneralUserDetails: UserDetails) => {
        setCurrentGeneralUserDetails(updatedGeneralUserDetails);
        setEditProfileDisplay(false);
    };


    return (
        <div className="sideBar_loggedAsAdmin-section flex flex-col items-center justify-center w-full h-full">
        <div
            className="sideBar_logged-section_user-icon relative rounded-full bg-[#f1f1f1] flex items-center justify-center w-[100px] h-[100px] mb-4 cursor-pointer"
            onClick={handleProfilePictureClick}
        >
            {profileImageBase64 === null ? (
                !editProfileDisplay && (
                    <span className="text-4xl font-bold text-gray-500">
                        {username.charAt(0).toUpperCase()}
                    </span>
                )
            ) : (
                <Image src={profileImageBase64} alt="profile icon" className="w-full h-full rounded-full object-cover" />
            )}
            {editProfileDisplay && (
                <span className="absolute text-5xl text-[#DA1A32] font-bold">+</span>
            )}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
            <h1>Welcome, Admin {userDetails.username}</h1>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={closeSidebar}>Close Sidebar</button>
        </div>
    );
}

export default LoggedAsAdmin;
