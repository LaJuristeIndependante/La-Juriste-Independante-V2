"use client";
import loupe from "@public/images/Utils/loupe.png";
import React, { useRef, useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getAllProfessions } from '@lib/ProfessionLib/service/professionService';
import { Profession } from '@lib/ProfessionLib/type/Profession';

export default function SearchDiv() {
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [searchString, setSearchString] = useState('');
    const [filteredProfessions, setFilteredProfessions] = useState<Profession[]>([]);
    const [inputClicked, setInputClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProfessions = async () => {
            try {
                const professionsData = await getAllProfessions();
                setProfessions(professionsData);
            } catch (error) {
                console.error('Erreur lors de la récupération des professions:', error);
            } finally {
                setIsLoading(false);
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

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchString) {
            router.push(`/products?profession=${encodeURIComponent(searchString)}`);
        }
    };

    const handleSelectProfession = (professionName: string) => {
        setSearchString(professionName);
        setInputClicked(false);
        const slugifiedProfessionName = professionName.toLowerCase().replace(/\s+/g, '-');
        router.push(`/products?profession=${encodeURIComponent(slugifiedProfessionName)}`);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setSearchString('');
            setInputClicked(false);
        }
    };

    const handleInputClick = () => {
        setInputClicked(true);
    };

    const handleSearchProposition = (e: ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value);

    const handleEscapeKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setSearchString('');
            setInputClicked(false);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!divRef.current?.contains(e.relatedTarget as Node)) {
            if (searchString === '' && filteredProfessions.length === 0) {
                setInputClicked(false);
            }
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center gap-2" ref={divRef}>
            <form onSubmit={handleSubmit} className={`bg-[#F5F5F5] max-w-xl border-gray-300 border rounded-md flex items-center w-11/12 md:w-full`}>
                <div className="group w-full">
                    <input
                        className='p-2 bg-[#F5F5F5] w-full input'
                        type="text"
                        name="query"
                        required
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        value={searchString}
                        onChange={handleSearchProposition}
                        onKeyDown={handleEscapeKey}
                        onClick={handleInputClick}
                        onBlur={handleBlur}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className='labelAnimation label-p'>
                        Quelle est votre profession ?
                    </label>
                </div>
                <button
                    type="submit"
                    className='bg-[#F5F5F5] pr-2'
                >
                    <span>
                        <Image src={loupe} alt={"loupe"} width={30} height={30} />
                    </span>
                </button>
            </form>

            {isLoading ? (
                <div className="mt-4">Chargement...</div>
            ) : (
                <div className="relative w-[93%] md:w-full flex items-center justify-center">
                    <div className="overflow-x-scroll whitespace-nowrap scrollbar-hide" ref={scrollContainerRef}>
                        <div className="inline-flex space-x-1">
                            {filteredProfessions.map(profession => (
                                <div
                                    key={profession._id}
                                    className="bg-[#E8E8E8] p-3 rounded-xl cursor-pointer"
                                    onClick={() => handleSelectProfession(profession.name)}
                                >
                                    {profession.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {inputClicked && filteredProfessions.length > 0 && (
                <ul className={`bg-white border mt-56 border-gray-300 shadow-md absolute xl:w-[575px] search-results w-[90%] md:w-[575px]`}>
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
    );
}
