// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import { useAuth, authEventEmitter } from '@/context/AuthContext';
// import { convertBufferToBase64 } from '@/components/utils/ConvertBufferToBase64';
// import { deleteTestimonial, updateTestimonial, getUserDetails } from '@/services/auth';
// import {  FlashMessage, UserDetails } from '@/types/types';
// import { Testimonial } from '@/types/Testimonial';
// import { getTestimonials } from '@/services/admin';
//
// import React, {useState, useEffect, useRef} from 'react';
// import {useQuery, useMutation, useQueryClient} from 'react-query';
// import {useAuth, authEventEmitter} from '@/context/AuthContext';
// import {deleteUser, updateUserData} from '@/services/auth'; // Utilisation des services utilisateurs
// import {convertBufferToBase64} from '@/components/utils/ConvertBufferToBase64';
// import {deleteTestimonial, updateTestimonial} from '@/services/testimonials';
// import {Testimonial, FlashMessage, UserDetails} from '@/types/types';
// import {getTestimonials} from '@/services/admin';
// import Image from 'next/image';
//
// import AddTestimonialPopup from './AddTestimonialPopup';
// import BackgroundBubbles from '../../common/animations/BackgroundBubbles';
// import FlashResponse from '../../common/animations/FlashResponse';
//
// import comment_icon from '@/../public/assets/images/common/comment-icon.svg';
// import default_user from '@/../public/assets/images/common/default_user.svg';
// import left_icon from '@/../public/assets/images/common/left-icon.svg';
// import right_icon from '@/../public/assets/images/common/right-icon.svg';
// import edit_icon from '@/../public/assets/images/common/edit-icon.svg';
// import warning_icon from '@/../public/assets/images/common/warning-icon.svg';
// import delete_icon from '@/../public/assets/images/common/delete-icon.svg';
// import delete_icon2 from '@/../public/assets/images/common/delete-icon2.svg';
// import Loader from '../../common/animations/Loader';
//
// function TestimonialsSection() {
//     const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
//     const queryClient = useQueryClient();
//     const {isAuthenticated} = useAuth();
//     const scrollContainerRef = useRef<HTMLDivElement>(null);
//     const session = useSession()
//
//     useEffect(() => {
//         if (isAuthenticated) {
//             queryClient.invalidateQueries('testimonials');
//         }
//     }, [isAuthenticated, queryClient]);
//
//     useEffect(() => {
//         const handleAuthChange = () => {
//             queryClient.invalidateQueries('testimonials');
//         };
//
//         authEventEmitter.on('authChange', handleAuthChange);
//
//         return () => {
//             authEventEmitter.off('authChange', handleAuthChange);
//         };
//     }, [queryClient]);
//
//     const {data: currentUser = {data: {userId: ''}}} = useQuery<UserDetails>('currentUser', session.
//     {
//         enabled: isAuthenticated,
//     }
// )
//     ;
//
//     const {data: testimonials = [], isLoading, error} = useQuery<Testimonial[]>('testimonials', getTestimonials, {
//         select: data => {
//             if (currentUser) {
//                 const userTestimonials = data.filter(t => t.user?._id === currentUser.data.userId);
//                 const otherTestimonials = data.filter(t => t.user?._id !== currentUser.data.userId);
//                 return [...userTestimonials, ...otherTestimonials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())];
//             }
//             return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//         },
//     });
//
//     const deleteMutation = useMutation((id: string) => deleteTestimonial(id), {
//         onSuccess: () => {
//             queryClient.invalidateQueries('testimonials');
//             setFlashMessage({title: 'Succès', content: 'Témoignage supprimé avec succès.', icon: delete_icon2});
//         },
//         onError: () => {
//             setFlashMessage({
//                 title: 'Erreur',
//                 content: 'Une erreur est survenue lors de la suppression du témoignage.',
//                 icon: delete_icon2
//             });
//         },
//     });
//
//     const updateMutation = useMutation((testimonialData: Testimonial) => updateTestimonial(testimonialData), {
//         onSuccess: () => {
//             queryClient.invalidateQueries('testimonials');
//             setFlashMessage({title: 'Succès', content: 'Témoignage mis à jour avec succès.', icon: edit_icon});
//         },
//         onError: () => {
//             setFlashMessage({
//                 title: 'Erreur',
//                 content: 'Une erreur est survenue lors de la mise à jour du témoignage.',
//                 icon: edit_icon
//             });
//         },
//     });
//
//     const handleAddTestimonial = () => {
//         if (isAuthenticated) {
//             setEditingTestimonial(null);
//             setIsPopupOpen(true);
//         } else {
//             setFlashMessage({
//                 title: 'Attention',
//                 content: 'Veuillez vous connecter ou créer un compte pour ajouter un témoignage.',
//                 icon: warning_icon
//             });
//         }
//     };
//
//     const handleEditTestimonial = (testimonial: Testimonial) => {
//         setEditingTestimonial(testimonial);
//         setIsPopupOpen(true);
//     };
//
//     const handleClosePopup = () => {
//         setIsPopupOpen(false);
//     };
//
//     const handleDeleteTestimonial = (id: string) => {
//         deleteMutation.mutate(id);
//     };
//
//     const handleUpdateTestimonial = (updatedTestimonial: Testimonial) => {
//         updateMutation.mutate(updatedTestimonial);
//     };
//
//     const handleCloseFlashMessage = () => {
//         setFlashMessage(null);
//     };
//
//     if (isLoading) return <div className='flex justify-center items-center h-[400px]'><Loader/></div>;
//     if (error instanceof Error) return <p>Erreur: {error.message}</p>;
//
//     if (!Array.isArray(testimonials)) {
//         return <p>Erreur: Les données reçues ne sont pas valides.</p>;
//     }
//
//     const scrollLeft = () => {
//         scrollContainerRef.current?.scrollBy({left: -250, behavior: 'smooth'});
//     };
//
//     const scrollRight = () => {
//         scrollContainerRef.current?.scrollBy({left: 250, behavior: 'smooth'});
//     };
//
//     return (
//         <div className='w-full h-full relative z-1 mb-[10vh]'>
//             <hr className="w-1/3 border-[12px] border-r-8 rounded-r-xl border-special-red mb-10"/>
//             <div className='flex flex-col items-center md:items-start'>
//                 <h3 className='text-4xl font-normal text-center md:text-left ml-4 md:ml-[30px]'>
//                     Voici ce que disent mes clients
//                 </h3>
//             </div>
//             <div className='flex justify-center items-center h-[400px] md:h-[300px] lg:h-[400px] relative'>
//                 <button className='bigger-scale testi-buttons' onClick={scrollLeft}>
//                     <Image src={left_icon} alt='left-icon' className="h-12 w-12"/>
//                 </button>
//                 <div
//                     className="flex space-x-4 ml-spe max-w-7xl md:space-x-1.5 overflow-x-auto overflow-hidden scrollbar-hide"
//                     ref={scrollContainerRef}
//                 >
//
//                 </div>
//                 <button className='bigger-scale testi-buttons' onClick={scrollRight}>
//                     <Image src={right_icon} alt='right-icon' className="h-12 w-12"/>
//                 </button>
//             </div>
//             <BackgroundBubbles page='landing'/>
//             <div className="addTestimonials flex justify-center items-center mt-5">
//                 <button className='bg-[#D9D9D9] font-semibold rounded-md flex items-center p-2 hover:bg-gray-400'
//                         onClick={handleAddTestimonial}>
//                     Ajouter un témoignage
//                     <span>
//             <Image src={edit_icon} alt="edit icon" className='w-6 h-6 cursor-pointer ml-2'/>
//           </span>
//                 </button>
//             </div>
//             {
//                 isPopupOpen && (
//                     <div>
//                         <p>Test</p>
//                         <AddTestimonialPopup
//                             onClose={handleClosePopup}
//                             reloadTestimonialsSection={() => queryClient.invalidateQueries('testimonials')}
//                             whichUser={currentUser}
//                             testimonialToEdit={editingTestimonial || undefined}
//                         />
//                     </div>
//                 )
//             }
//         </div>
//     );
// }
//
// const TestimonialsCard = ({avis, lastname, firstname, notation, img, handleDelete, handleEdit, isOwner,}: {
//     avis: string;
//     lastname: string;
//     firstname: string;
//     notation: number;
//     img: string;
//     handleDelete: () => void;
//     handleEdit: () => void;
//     isOwner: boolean;
// }) => {
//     return (
//         <div
//             className="border-2 border-black first-card bg-[#D9D9D9] flex flex-col items-center justify-between w-[250px] h-[300px] min-w-[250px] min-h-[300px] rounded-md shadow-lg p-4 relative">
//             <div className="flex flex-col w-full">
//                 <div className="flex justify-between w-full items-center">
//                     <div className="flex flex-col items-center justify-center relative">
//                         <div className="flex items-center justify-center mb-2 relative ml-[-10px]">
//                             <Image src={comment_icon} alt="comment-icon1" className="w-9 h-9 ml-[5px]"/>
//                             <Image src={comment_icon} alt="comment-icon2" className="w-9 h-9 ml-[-10px]"/>
//                         </div>
//                         <p className="text-lg font-semibold w-[100px] md:w-auto ml-[80px] md:ml-0 absolute top-1/4 transform -translate-y-1/3 text-white bg-opacity-50 text-stroke">
//                             {firstname + ' ' + lastname}
//                         </p>
//                     </div>
//                     <Image src={img} alt="client-img"
//                            className="w-16 h-16 object-cover rounded-full border-4 border-black flex items-center justify-center"/>
//                 </div>
//                 <div className="mt-4 flex items-center justify-center">
//                     {Array.from({length: 5}, (_, i) => (
//                         <span
//                             key={i}
//                             className={`text-[#8A6300] text-2xl ${i < notation ? 'star' : 'star-outline'}`}
//                         >
//               ★
//             </span>
//                     ))}
//                 </div>
//                 <div className="text-center text-sm text-gray-700 mt-2 break-all overflow-hidden"
//                      style={{wordWrap: 'break-word'}}>
//                     <p>{avis}</p>
//                 </div>
//             </div>
//             {isOwner && (
//                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                     <button
//                         className="rounded-full w-10 h-10 border-2 border-[#d5d0d0] flex items-center justify-center hover:bg-gray-200"
//                         onClick={handleDelete}>
//             <span>
//               <Image src={delete_icon} alt="delete icon" className="w-6 h-6"/>
//             </span>
//                     </button>
//                     <button
//                         className="rounded-full w-10 h-10 border-2 border-[#d5d0d0] flex items-center justify-center hover:bg-gray-200"
//                         onClick={handleEdit}>
//             <span>
//               <Image src={edit_icon} alt="edit icon" className="w-6 h-6"/>
//             </span>
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }
//
// export default TestimonialsSection;
//
// /*
// {testimonials.map((testimonial) => (
//             <TestimonialsCard
//               key={testimonial._id}
//               avis={testimonial.content}
//               lastname={testimonial.user ? testimonial.user.lastName : 'Anonymous'}
//               firstname={testimonial.user ? testimonial.user.firstName : 'Anonymous'}
//               notation={testimonial.rating || 0}
//               img={testimonial.user && testimonial.user.profileImage ? convertBufferToBase64(testimonial.user.profileImage.data) : default_user}
//               handleDelete={() => handleDeleteTestimonial(testimonial._id)}
//               handleEdit={() => handleEditTestimonial(testimonial)}
//               isOwner={currentUser && testimonial.user?._id === currentUser.data.userId}
//             />
//           ))}
//
//            <FlashResponse
//             title={flashMessage.title}
//             content={flashMessage.content}
//             icon={flashMessage.icon}
//             onClose={undefined}
//           />
//           */
