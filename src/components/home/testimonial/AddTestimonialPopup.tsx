// import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// import Modal from 'react-modal';
// import Image from 'next/image';
// import close_icon from '../../../../public/assets/common/close-icon.svg';
// import edit_icon from '../../../../public/assets/common/edit-icon.svg';
// import { addTestimonial, updateTestimonial } from '@/services/testimonials';
// import { TestimonialData } from '@/types/types';
//
// Modal.setAppElement('#root');
//
// interface AddTestimonialPopupProps {
//   onClose: () => void;
//   reloadTestimonialsSection: () => void;
//   whichUser: { data: { userId: string } };
//   testimonialToEdit?: { rating: number; content: string; id: string };
// }
//
// const AddTestimonialPopup: React.FC<AddTestimonialPopupProps> = ({ onClose, reloadTestimonialsSection, whichUser, testimonialToEdit }) => {
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [content, setContent] = useState('');
//   const [charCount, setCharCount] = useState(0);
//   const maxChars = 300;
//
//   useEffect(() => {
//     if (testimonialToEdit) {
//       setRating(testimonialToEdit.rating);
//       setContent(testimonialToEdit.content);
//       setCharCount(testimonialToEdit.content.length);
//     }
//   }, [testimonialToEdit]);
//
//   const handleMouseOver = (value: number) => {
//     setHoverRating(value);
//   };
//
//   const handleMouseOut = () => {
//     setHoverRating(0);
//   };
//
//   const handleClick = (value: number) => {
//     setRating(value);
//   };
//
//   const renderStars = (num: number) => {
//     return Array.from({ length: num }, (_, i) => (
//       <span
//         key={i}
//         className={`text-3xl cursor-pointer transition-colors duration-200 ${i < (hoverRating || rating) ? 'text-[#8A6300]' : 'text-gray-300'}`}
//         onMouseOver={() => handleMouseOver(i + 1)}
//         onMouseOut={handleMouseOut}
//         onClick={() => handleClick(i + 1)}
//       >
//         ★
//       </span>
//     ));
//   };
//
//   const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     const newContent = e.target.value;
//     if (newContent.length <= maxChars) {
//       setContent(newContent);
//       setCharCount(newContent.length);
//     }
//   };
//
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const testimonialData: Partial<TestimonialData> = {
//         content,
//         rating,
//         user: whichUser.data.userId,
//       };
//
//       if (testimonialToEdit) {
//         await updateTestimonial({ ...testimonialData, _id: testimonialToEdit.id, user: whichUser.data.userId || '', content: testimonialData.content || '', rating: testimonialData.rating || 0 });
//       } else {
//         await addTestimonial(testimonialData as TestimonialData);
//       }
//       reloadTestimonialsSection();
//       onClose();
//     } catch (error) {
//       console.error('Error adding/updating testimonial:', error);
//     }
//   };
//
//   return (
//     <Modal
//       isOpen={true}
//       onRequestClose={onClose}
//       className="bg-white p-4 md:p-6 rounded-lg w-full max-w-lg md:max-w-3xl min-h-[50%] max-h-[90%] mx-auto md:mx-4 shadow-lg"
//       overlayClassName="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-60 backdrop-blur-lg z-50 px-4 py-6 md:px-8 md:py-12"
//     >
//       <div className="flex justify-end mb-4">
//         <Image src={close_icon} alt="close icon" className="w-6 h-6 md:w-8 md:h-8 cursor-pointer" onClick={onClose} />
//       </div>
//       <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center">
//         {testimonialToEdit ? 'Modifier le Témoignage' : 'Ajouter un Témoignage'}
//       </h3>
//       <form className='flex flex-col items-center space-y-4' onSubmit={handleSubmit}>
//         <div className="star-notation flex items-center justify-center space-x-2 mb-6">
//           {renderStars(5)}
//         </div>
//         <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Texte du témoignage</label>
//         <textarea
//           value={content}
//           onChange={handleContentChange}
//           className="w-full min-h-[150px] md:min-h-[200px] p-3 md:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8A6300] resize-none break-words"
//           placeholder="Écrivez votre témoignage ici..."
//         />
//         <div className="w-full text-right text-sm text-gray-600">{charCount}/{maxChars} caractères</div>
//         <button
//           type="submit"
//           className="bg-[#D9D9D9] flex items-center justify-center w-full max-w-xs text-black font-semibold p-2 md:p-3 rounded-md mt-4"
//         >
//           {testimonialToEdit ? 'Mettre à jour' : 'Publier'}
//           <Image src={edit_icon} alt="edit icon" className='w-5 h-5 ml-2 md:w-6 md:h-6' />
//         </button>
//       </form>
//     </Modal>
//   );
// }
//
// export default AddTestimonialPopup;
