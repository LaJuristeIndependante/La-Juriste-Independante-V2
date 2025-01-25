'use client';
import React, { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import gif from '@public/images/models-page/contract-search.gif';
import line from "@public/images/Utils/redline.png";
import { getAllProfessions } from '@lib/ProfessionLib/service/professionService';
import { Profession } from '@lib/ProfessionLib/type/Profession';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { useMediaQuery } from 'react-responsive';
import loupe from "@public/images/Utils/loupe.png";

interface TitleSectionModelsProps {
    professionName: string;
    handleChange: (profession: string) => void;
}

const TitleSectionModels: React.FC<TitleSectionModelsProps> = ({ professionName, handleChange }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [profession, setProfession] = useState<string>(professionName || '');
    const [searchString, setSearchString] = useState<string>('');
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [filteredProfessions, setFilteredProfessions] = useState<Profession[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const divRef = useRef<HTMLFormElement>(null);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {
        if (pathname === '/models') {
            setProfession(professionName);
        }
    }, [pathname, professionName]);

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
                setTimeout(() => {
                    setSearchString('');
                }, 2000);
            }
        }
    };

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    };

    const handleEscapeKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setSearchString('');
        }
    };

    const handleSelectProfession = (professionName: string) => {
        setSearchString(professionName);
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
                            Des modèles qui correspondent <span className={"relative"}>à vos besoins <Image src={line} alt={"line"} className={"absolute right-0"} /></span>
                        </>
                    ) : (
                        <>
                            Des modèles qui correspondent <br /><span className={"relative"}>à vos besoins <Image src={line} alt={"line"} className={"absolute right-0"} /></span>
                        </>
                    )}
                </h2>
                <p className={`text-lg sm:text-base md:text-lg font-light md:w-2/3 text-center md:text-left`}>
                    Je mets à votre disposition des modèles types prêts à l'emploi, spécialement conçus pour répondre aux exigences uniques de votre secteur professionnel.
                </p>
                <form
                    className={`mt-10 md:mt-6 flex items-center rounded-md ${isMobile ? 'w-full' : 'max-w-xl'}`}
                    ref={divRef}
                >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <input
                                type="text"
                                placeholder="Quelle est votre profession ?"
                                className={`flex items-center justify-center text-black bg-[#EAEAEA] px-4 min-w-[250px] placeholder:text-black py-2 rounded-lg ${isMobile ? 'w-full ml-5' : ''}`}
                                value={searchString}
                                onChange={handleSearchInput}
                                onBlur={handleBlur}
                                onKeyDown={handleEscapeKey}
                                ref={inputRef}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="min-w-[250px] bg-white border border-gray-300 rounded-md shadow-lg mt-2 max-h-60 overflow-y-auto">
                            {filteredProfessions.map((profession, index) => (
                                <DropdownMenuItem
                                    key={index}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                    onSelect={() => handleSelectProfession(profession.name)}
                                >
                                    {profession.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </form>
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
