// import React, {useState, useEffect} from 'react';
// import {signOut, useSession} from 'next-auth/react';
// import EditFormPanel from '../form/EditFormPanel';
// import delete_icon from '@public/images/common/delete-icon.svg';
// import edit_icon from '@public/images/common/edit-icon.svg';
// import deco_icon from '@public/images/auth/deco-icon.svg';
// import Image from 'next/image';
// import UserInitials from "@lib/UserLib/component/UserInitials";
// import {useRouter} from "next/navigation";
// import Cookies from 'js-cookie';
// import {ProfileData} from '@lib/UserLib/type/UserType';
// import {deleteUser, updateUserData} from '@lib/UserLib/service/auth';
//
// const LoggedSection: React.FC = () => {
//     const {data: session, update} = useSession();
//     const [message, setMessage] = useState<string>("");
//     const [error, setError] = useState<string>("");
//     const [isClient, setIsClient] = useState<boolean>(false);
//     const [editingField, setEditingField] = useState<boolean>(false);
//     const [formData, setFormData] = useState<ProfileData>({
//         nom: '',
//         prenom: '',
//         email: '',
//         username: '',
//         dateOfBirth: '',
//     });
//
//     const router = useRouter();
//
//     useEffect(() => {
//         setIsClient(true);
//
//         const sessionNeedsRefresh = Cookies.get("sessionNeedsRefresh");
//
//         if (sessionNeedsRefresh && session) {
//             update();
//             Cookies.remove("sessionNeedsRefresh");
//         }
//
//         if (session) {
//             setFormData({
//                 nom: session.user.lastName || "",
//                 prenom: session.user.firstName || "",
//                 email: session.user.email || "",
//                 username: session.user.name || "",
//                 dateOfBirth: session.user.dateOfBirth
//                     ? new Date(session.user.dateOfBirth).toLocaleDateString()
//                     : "",
//             });
//         }
//     }, [session, update]);
//
//     if (!isClient) {
//         return null;
//     }
//
//     const handleEditClick = () => {
//         setEditingField(!editingField);  // Toggle edit form visibility
//     };
//
//     const handleSaveClick = async (updatedData: ProfileData) => {
//         setMessage("");
//         setError("");
//
//         try {
//             await updateUserData({
//                 userId: session?.user?.id || '',
//                 field: 'all',  // Assuming you're updating the entire user object
//                 value: updatedData,
//             });
//
//             setMessage("Information mise à jour avec succès");
//             setEditingField(false);
//
//             await update({
//                 ...session,
//                 user: {
//                     ...session?.user,
//                     ...updatedData,
//                 },
//             });
//
//             Cookies.set("sessionNeedsRefresh", "true");
//         } catch (error: any) {
//             const errorMessage = error instanceof Error ? error.message : "Échec de la mise à jour de l'information";
//             setError(errorMessage);
//         }
//     };
//
//     const handleDelete = async (userId: string) => {
//         setMessage("");
//         setError("");
//
//         try {
//             await deleteUser(userId);
//         } catch (error) {
//             setError("Échec de la suppression de l'utilisateur");
//         }
//     };
//
//     return (
//         <div className="sideBar_logged-section flex flex-col items-center justify-center w-full h-full">
//             <div
//                 className="sideBar_logged-section_user-icon relative rounded-full bg-[#f1f1f1] flex items-center justify-center w-[100px] h-[100px] mb-4 cursor-pointer"
//             >
//                 <UserInitials firstName={session?.user?.firstName || "D"} lastName={session?.user?.lastName || "N"}/>
//             </div>
//             <h3 className="font-bold text-xl mb-4">{session?.user?.name}</h3>
//             <div className="sideBar_logged-section_user-actions flex items-center justify-evenly w-2/3">
//                 <button
//                     className="rounded-full w-10 h-10 border-2 border-[#f1f1f1] flex items-center justify-center hover:bg-gray-200"
//                     onClick={() => handleDelete(session?.user?.id || '')}>
//                     <Image src={delete_icon} alt="delete icon" className="w-6 h-6 text-red-500"/>
//                 </button>
//                 <button
//                     className="rounded-full w-10 h-10 border-2 border-[#f1f1f1] flex items-center justify-center hover:bg-gray-200"
//                     onClick={handleEditClick}>
//                     <Image src={edit_icon} alt="edit icon" className="w-6 h-6 text-red-500"/>
//                 </button>
//                 <button
//                     className="rounded-full w-10 h-10 border-2 border-[#f1f1f1] flex items-center justify-center hover:bg-gray-200"
//                     onClick={() => signOut({ callbackUrl: '/' })}>
//                     <Image src={deco_icon} alt="logout icon" className="w-6 h-6 text-red-500"/>
//                 </button>
//             </div>
//             {editingField && (
//                 <EditFormPanel
//                     isAdmin={false}
//                     userDetails={formData}
//                     onUpdateUserDetails={handleSaveClick}
//                 />
//             )}
//             {message && <p className="text-green-500">{message}</p>}
//             {error && <p className="text-red-500">{error}</p>}
//         </div>
//     );
// };
//
// export default LoggedSection;
