// "use client";
// import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
// import { useRouter } from 'next/navigation';
// import { useQuery } from 'react-query';
// import { getProfessions } from "../../../services/contratProfession";
// import HorizontalScrollingMenu from './HorizontalScrollingMenu';
// import Loader from '../../common/animations/Loader';
// import Image from 'next/image';
// import { useMediaQuery } from 'react-responsive';
//
// import searchIcon from '@/../public/assets/images/landing-page/search-icon.svg';
//
// const ProfessionSearchComponent: React.FC = () => {
//     const [searchString, setSearchString] = useState('');
//     const [inputClicked, setInputClicked] = useState(false);
//     const router = useRouter();
//     const sectionRef = useRef<HTMLElement>(null);
//
//     const isMobile = useMediaQuery({ query: '(max-width: 420px)' });
//
//     const { data: professions = [], error, isLoading } = useQuery('professions', getProfessions, {
//         select: (data) => data.data,
//         staleTime: 5 * 60 * 1000,
//     });
//
//     // Determine which professions to display
//     const filteredProfessions = searchString
//         ? professions.filter(result =>
//             result.name.toLowerCase().includes(searchString.toLowerCase())
//         )
//         : professions;
//
//     const handleSearchProposition = (e: ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value);
//
//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         router.push(`/models/search/${searchString}`);
//     };
//
//     const handleEscapeKey = (e: KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Escape') {
//             setSearchString('');
//             setInputClicked(false);
//         }
//     };
//
//     const handleInputClick = () => {
//         setInputClicked(true);
//     };
//
//     const handleSelectResult = (result: { name: string }) => {
//         setSearchString(result.name || '');
//         setInputClicked(false);
//     };
//
//     const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//         if (!sectionRef.current?.contains(e.relatedTarget as Node)) {
//             if (searchString === '' && filteredProfessions.length === 0) {
//                 setInputClicked(false);
//             }
//         }
//     };
//
//     const handleEnterKey = (e: KeyboardEvent<HTMLFormElement>) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//             router.push(`/models/search/${searchString}`);
//         }
//     };
//
//     if (isLoading) return <Loader />;
//     if (error) return <p className='flex justify-center items-center text-red-500 text-center w-full'>Une erreur s&apos;est produite lors du chargement des professions</p>;
//
//     return (
//         <section ref={sectionRef}>
//             <div className="flex flex-col items-center">
//                 <form
//                     onSubmit={handleSubmit}
//                     onKeyDown={handleEnterKey}
//                     className={`bg-[#F5F5F5] max-w-xl border-gray-300 border rounded-md flex items-center ${isMobile ? 'w-full' : 'w-1/2'}`}
//                 >
//                     <div className="group w-full">
//                         <input
//                             className='p-2 bg-[#F5F5F5] w-full input'
//                             type="text"
//                             name="query"
//                             required
//                             autoComplete="off"
//                             autoCorrect="off"
//                             autoCapitalize="off"
//                             spellCheck="false"
//                             value={searchString}
//                             onChange={handleSearchProposition}
//                             onKeyDown={handleEscapeKey}
//                             onClick={handleInputClick}
//                             onBlur={handleBlur}
//                         />
//                         <span className="highlight"></span>
//                         <span className="bar"></span>
//                         <label className='labelAnimation label-p'>
//                             Quelle est votre profession ?
//                         </label>
//                     </div>
//                     <button
//                         type="submit"
//                         className='bg-[#F5F5F5]'
//                     >
//                         <span>
//                             <Image src={searchIcon} alt="search icon" className='w-10 h-6 bg-[#F5F5F5]' />
//                         </span>
//                     </button>
//                 </form>
//                 <HorizontalScrollingMenu professions={professions} />
//                 <div className="w-full max-w-4xl relative z-50 flex justify-center">
//                     {(filteredProfessions.length > 0 && inputClicked) && (
//                         <ul className={`bg-white border border-gray-300 shadow-md absolute xl:w-[575px] md:w-[475px] search-results ${isMobile ? 'w-[90%]' : 'w-[575px]'}`}>
//                             {filteredProfessions.map((result, index) => (
//                                 <li
//                                     key={index}
//                                     className="p-2 cursor-pointer hover:bg-gray-100"
//                                     onClick={() => handleSelectResult(result)}
//                                 >
//                                     {result.name}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// };
//
// export default ProfessionSearchComponent;