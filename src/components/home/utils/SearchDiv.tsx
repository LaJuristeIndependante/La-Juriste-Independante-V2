"use client";

import Image from "next/image";
import loupe from "@public/images/Utils/loupe.png";
import React, {useEffect, useState} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {getAllProfessions} from "@lib/ProfessionLib/service/professionService";
import {Profession} from "@lib/ProfessionLib/type/Profession";

export default function SearchDiv() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();
    const [professions, setProfessions] = useState<Profession[]>([]);

    useEffect(() => {
        // Fetch all professions on component mount
        const fetchProfessions = async () => {
            try {
                const professionsData = await getAllProfessions();
                setProfessions(professionsData);
            } catch (error) {
                console.error("Erreur lors de la récupération des professions:", error);
            }
        };

        fetchProfessions();
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? professions.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === professions.length - 1 ? 0 : prevIndex + 1
        );
    };

    const redirect = (param: string) => {
        router.push(`/products?profession=${encodeURIComponent(param)}`);
    };

    return (
        <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-4">
            <div className="flex items-center w-full bg-gray-100 rounded-full p-3 shadow-md">
                <input
                    type="text"
                    placeholder="Quelle est votre profession ?"
                    className="flex-1 bg-transparent border-none outline-none px-2 text-lg"
                />
                <button className="text-lg">
                    <Image src={loupe} alt={"loupe"} />
                </button>
            </div>
            <div className="relative w-full overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out"
                     style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {professions.map((profession, index) => (
                        <div key={index} className="min-w-full flex justify-center items-center p-4">
                            <button
                                className="bg-gray-100 rounded-full px-6 py-3 shadow text-lg"
                                onClick={() => redirect(profession.name)}
                            >
                                {profession.name}
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                    onClick={handlePrev}
                >
                    <FaChevronLeft />
                </button>
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                    onClick={handleNext}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}
