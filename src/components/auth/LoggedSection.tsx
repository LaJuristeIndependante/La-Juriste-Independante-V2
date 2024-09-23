import React, {useState, useRef, useEffect} from 'react';
import {authEventEmitter} from '@/context/AuthContext';
import EditFormPanel from './form/EditFormPanel';
import delete_icon from '@public/images/common/delete-icon.svg';
import edit_icon from '@public/images/common/edit-icon.svg';
import deco_icon from '@public/images/auth/deco-icon.svg';
import {UserType} from '@lib/UserLib/type/UserType';
import Image from 'next/image';
import UserInitials from "@lib/UserLib/component/UserInitials";
import {useSession} from "next-auth/react";

interface LoggedSectionProps {
    userDetails: UserType;
    handleLogout: () => Promise<void>;
    handleDeleteAccount: () => Promise<void>;
    generalUserDetails: UserType | null;
}

type FileInputRef = HTMLInputElement | null;

const LoggedSection: React.FC<LoggedSectionProps> = ({
                                                         userDetails,
                                                         handleLogout,
                                                         handleDeleteAccount,
                                                         generalUserDetails
                                                     }) => {
    const [editProfileDisplay, setEditProfileDisplay] = useState<boolean>(false);
    const [currentUserDetails, setCurrentUserDetails] = useState<UserType>(userDetails);
    const [currentGeneralUserDetails, setCurrentGeneralUserDetails] = useState<UserType | null>(generalUserDetails);
    const fileInputRef = useRef<FileInputRef>(null);
    const session = useSession()

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

    const handleProfilePictureClick = () => {
        if (editProfileDisplay) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const updatedUserDetails = await fetch('/auth/user-info').then(res => res.json());
                setCurrentUserDetails(updatedUserDetails);
                setCurrentGeneralUserDetails(updatedUserDetails);
            } catch (error) {
                console.error('Error updating profile picture:', error);
            }
        }
    };

    const handleGeneralUserDetailsUpdate = (updatedGeneralUserDetails: UserType) => {
        setCurrentGeneralUserDetails(updatedGeneralUserDetails);
        setEditProfileDisplay(false);
    };

    return (
        <div className="sideBar_logged-section flex flex-col items-center justify-center w-full h-full">
            <div
                className="sideBar_logged-section_user-icon relative rounded-full bg-[#f1f1f1] flex items-center justify-center w-[100px] h-[100px] mb-4 cursor-pointer"
                onClick={handleProfilePictureClick}
            >
                !editProfileDisplay && (
                    <UserInitials firstName={session?.data?.user?.firstName || "D"} lastName={session?.data?.user?.lastName || "N"}/>
                )

                {editProfileDisplay && (
                    <span className="absolute text-5xl text-[#DA1A32] font-bold">+</span>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                />
            </div>
            <h3 className="font-bold text-xl mb-4">{username}</h3>
            <div className="sideBar_logged-section_user-actions flex items-center justify-evenly w-2/3">
                <button
                    className="rounded-full w-10 h-10 border-2 border-[#f1f1f1] flex items-center justify-center hover:bg-gray-200"
                    onClick={handleDeleteAccount}>
                    <span>
                        <Image src={delete_icon} alt="delete icon" className="w-6 h-6 text-red-500"/>
                    </span>
                </button>
                <button
                    className="rounded-full w-10 h-10 border-2 border-[#f1f1f1] flex items-center justify-center hover:bg-gray-200"
                    onClick={handleEditProfile}>
                    <span>
                        <Image src={edit_icon} alt="edit icon" className="w-6 h-6 text-red-500"/>
                    </span>
                </button>
                <button
                    className="rounded-full w-10 h-10 border-2 border-[#f1f1f1] flex items-center justify-center hover:bg-gray-200"
                    onClick={handleLogout}>
                    <span>
                        <Image src={deco_icon} alt="logout icon" className="w-6 h-6 text-red-500"/>
                    </span>
                </button>
            </div>
            {editProfileDisplay && currentGeneralUserDetails && (
                <EditFormPanel isAdmin={false} userDetails={currentGeneralUserDetails}
                               onUpdateUserDetails={handleGeneralUserDetailsUpdate}/>
            )}
        </div>
    );
}

export default LoggedSection;
