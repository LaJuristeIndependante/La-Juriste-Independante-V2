'use client';
import React, { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import edit_icon2 from '@public/images/common/edit-icon2.svg';
import searchIcon from '@public/images/landing-page/search-icon.svg';
import gif from '@public/images/models-page/contract-search.gif';
import line from "@public/images/Utils/redline.png";
import { getAllProfessions } from '@lib/ProfessionLib/service/professionService';
import { Profession } from '@lib/ProfessionLib/type/Profession';

interface TitleSectionModelsProps {
    professionName: string;
    handleChange: (profession: string) => void;
}


const TitleSectionModels: React.FC<TitleSectionModelsProps> = ({ professionName, handleChange }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [profession, setProfession] = useState<string>(professionName || '');
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>('');
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [filteredProfessions, setFilteredProfessions] = useState<Profession[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const divRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (pathname === '/models') {
            setProfession(professionName);
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 832);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [pathname, professionName]);

    useEffect(() => {
        if (isClicked) {
            inputRef.current?.focus();
        }
    }, [isClicked]);

    useEffect(() => {
        const fetchProfessions = async () => {
            try {
                const professionsData = await getAllProfessions();
                setProfessions(professionsData);
            } catch (error) {
                console.error('Erreur lors de la récupération des professions:', error);
            }
        };

        fetchProfessions();
    }, []);

    useEffect(() => {
        if (searchString) {
            const filtered = professions.filter(profession =>
                profession.name.toLowerCase().includes(searchString.toLowerCase())
            );
            setFilteredProfessions(filtered);
        } else {
            setFilteredProfessions(professions);
        }
    }, [searchString, professions]);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!divRef.current?.contains(e.relatedTarget as Node)) {
            if (searchString.length === 0) {
                setIsAnimating(false);
                setTimeout(() => {
                    setIsClicked(false);
                }, 2000);
            }
        }
    };

    const handleToggleSearch = () => {
        setIsClicked((prevState) => {
            if (!prevState) {
                setTimeout(() => setIsAnimating(true), 500);
            }
            return !prevState;
        });
    };

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    };


    const handleEscapeKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setSearchString('');
            setIsClicked(false);
        }
    };

    const handleSelectProfession = (professionName: string) => {
        setSearchString(professionName);
        setIsClicked(false);
        handleChange(professionName);
        const slugifiedProfessionName = encodeURIComponent(professionName.toLowerCase().replace(/\s+/g, '-'));
        router.push(`/products?profession=${slugifiedProfessionName}`);
    };
    

    return (
        <div className="flex items-center justify-center">
            <div className={`min-h-[350px] sm:min-h-auto flex flex-col justify-center items-start md:ml-10`}>
                <h2 className="text-3xl md:text-4xl font-bold w-full mb-12 md:mb-6 title_section_contrats">
                    {!isMobile ? (
                        <>
                            Des templates qui correspondent <span className={"relative"}>à vos besoins <Image src={line} alt={"line"} className={"absolute right-0"} /></span>
                        </>
                    ) : (
                        <>
                            Des templates qui correspondent <br /><span className={"relative"}>à vos besoins <Image src={line} alt={"line"} className={"absolute right-0"} /></span>
                        </>
                    )}
                </h2>
                <p className={`text-lg sm:text-base md:text-lg font-light md:w-2/3 text-center md:text-left`}>
                    Je mets à votre disposition des templates juridiques prêts à l'emploi, spécialement conçus pour répondre aux exigences uniques de votre secteur professionnel.
                </p>
                <form
                    className={`mt-10 md:mt-6 flex items-center ${isClicked && 'bg-[#F5F5F5] border border-gray-300 rounded-md'} ${isMobile ? 'w-full' : 'max-w-xl'}`}
                    ref={divRef}
                >
                    {!isClicked ? (
                        <button
                            type="button"
                            onClick={handleToggleSearch}
                            className={`flex items-center justify-center text-black bg-[#D9D9D9] px-4 py-2 rounded-lg ${isMobile ? 'w-full' : ''}`}
                        >
                            {professionName ? decodeURIComponent(professionName.replace(/-/g, ' ')) : 'Prestataire de services'}
                            <Image src={edit_icon2} alt="edit icon" className="w-6 h-6 ml-2" />
                        </button>
                    ) : (
                        <div className="input-container w-full">
                            <input
                                ref={inputRef}
                                className={`input py-1.5 ${isAnimating && !isMobile ? (isClicked ? 'expand' : 'collapse') : ''}`}
                                type="text"
                                name="query"
                                required
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                value={searchString}
                                onBlur={handleBlur}
                                onChange={handleSearchInput}
                                onKeyDown={handleEscapeKey}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label className="labelAnimation label-p">
                                Quelle est votre profession ?
                            </label>
                            <button
                                type="submit"
                                className="bg-[#F5F5F5]"
                            >
                                <span>
                                    <Image src={searchIcon} alt="search icon" className="w-10 h-6 bg-[#F5F5F5]" />
                                </span>
                            </button>
                        </div>
                    )}
                </form>
                {isClicked && filteredProfessions.length > 0 && (
                    <ul className={`bg-white border z-50 md:mt-[440px] border-gray-300 shadow-md absolute search-results w-[250px] md:w-[575px] mt-0`}>
                        {filteredProfessions.map((profession, index) => (
                            <li
                                key={index}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSelectProfession(profession.name)}
                            >
                                {profession.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="w-1/4">
                <Image
                    src={gif}
                    alt="gif contract search"
                    className="w-32 h-32 mt-2 gif-models"
                />
            </div>
        </div>
    );
};

export default TitleSectionModels;
