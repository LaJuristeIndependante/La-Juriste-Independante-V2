// "use client";
// import React, { useEffect, useState, useRef } from 'react';
// import Image from 'next/image';
// import { authEventEmitter } from '@/context/AuthContext';
// import { convertBufferToBase64 } from '../../utils/ConvertBufferToBase64';
// import {UserType} from "@lib/UserLib/type/UserType";
//
// const LoggedAsAdmin: React.FC = () => {
//     const [editProfileDisplay, setEditProfileDisplay] = useState<boolean>(false);
//     const [currentUserDetails, setCurrentUserDetails] = useState<UserType>();
//     const [currentGeneralUserDetails, setCurrentGeneralUserDetails] = useState<UserType | null>();
//     const fileInputRef = useRef<HTMLInputElement>(null);
//
//     useEffect(() => {
//         const handleAuthChange = async () => {
//             const updatedUserDetails = await fetch('/auth/user-info').then(res => res.json());
//             setCurrentUserDetails(updatedUserDetails);
//             setCurrentGeneralUserDetails(updatedUserDetails);
//         };
//
//         authEventEmitter.on('authChange', handleAuthChange);
//
//         return () => {
//             authEventEmitter.off('authChange', handleAuthChange);
//         };
//     }, []);
//
//     const username = currentGeneralUserDetails?.username || currentUserDetails?.username;
//
//     const handleProfilePictureClick = () => {
//         if (editProfileDisplay) {
//             fileInputRef.current?.click();
//         }
//     };
//
//
//     const handleGeneralUserDetailsUpdate = (updatedGeneralUserDetails: UserDetails) => {
//         setCurrentGeneralUserDetails(updatedGeneralUserDetails);
//         setEditProfileDisplay(false);
//     };
//
//
//     return (
//         <div className="sideBar_loggedAsAdmin-section flex flex-col items-center justify-center w-full h-full">
//         <div
//             className="sideBar_logged-section_user-icon relative rounded-full bg-[#f1f1f1] flex items-center justify-center w-[100px] h-[100px] mb-4 cursor-pointer"
//             onClick={handleProfilePictureClick}
//         >
//             {profileImageBase64 === null ? (
//                 !editProfileDisplay && (
//                     <span className="text-4xl font-bold text-gray-500">
//                         {username.charAt(0).toUpperCase()}
//                     </span>
//                 )
//             ) : (
//                 <Image src={profileImageBase64} alt="profile icon" className="w-full h-full rounded-full object-cover" />
//             )}
//             {editProfileDisplay && (
//                 <span className="absolute text-5xl text-[#DA1A32] font-bold">+</span>
//             )}
//             <input
//                 type="file"
//                 ref={fileInputRef}
//                 style={{ display: 'none' }}
//                 onChange={handleFileChange}
//             />
//         </div>
//             <h1>Welcome, Admin {userDetails.username}</h1>
//             <button onClick={handleLogout}>Logout</button>
//             <button onClick={closeSidebar}>Close Sidebar</button>
//         </div>
//     );
// }
//
// export default LoggedAsAdmin;
