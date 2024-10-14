"use client";

import Image from "next/image";
import loupe from "@public/images/Utils/loupe.png";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getAllProfessions } from "@lib/ProfessionLib/service/professionService";
import { Profession } from "@lib/ProfessionLib/type/Profession";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SearchDiv() {
    const [professions, setProfessions] = useState<Profession[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
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

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    const navigate = (path: string) => {
        router.push(path);
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
            <div className="relative max-w-56 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-[25%] mt-2">
                <button
                    className="scroll-button left-scroll"
                    onClick={scrollLeft}
                    aria-label="Scroll left"
                >
                    <FaChevronLeft />
                </button>
                <div className="scroll-container overflow-x-auto" ref={scrollContainerRef}>
                    <div className="scroll-content flex">
                        {professions.map((profession) => (
                            <div
                                key={profession._id}
                                className="menu-item bg-[#E8E8E8] p-3 m-1 rounded-xl cursor-pointer"
                                onClick={() => navigate(`/models/search/${profession.name}`)}
                            >
                                {profession.name}
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    className="scroll-button right-scroll"
                    onClick={scrollRight}
                    aria-label="Scroll right"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}
