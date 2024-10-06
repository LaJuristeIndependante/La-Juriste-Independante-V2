"use client";

import React from 'react';
import {useSearchParams} from 'next/navigation';
import {RiFileSearchLine} from 'react-icons/ri';
import {useRouter} from 'next/navigation';
import Image from "next/image";
import line from "@public/images/Utils/redline.png"
import loopPaper from "@public/images/Utils/loopPaper.png"
import { RiPencilLine } from "react-icons/ri";
import ProductSection from "@lib/ProductLib/component/ProductSection";
import BackgroundBubbles from "@/components/utils/décors/BubbleBackground";

export default function ProductPage() {
    const searchParams = useSearchParams();
    const profession = searchParams.get("profession");
    const router = useRouter();

    const handleRemoveFilter = () => {
        router.push('/products');
    };

    return (
        <main className="relative w-full mx-auto flex flex-col items-start gap-8 p-8">
            <div className={"flex justify-between items-center w-full"}>
                <div className={"space-y-10 flex-2"}>
                    <h1 className={"text-5xl font-bold"}>
                        Des contrats qui correspondent <span className={"relative"}>à vos besoins <Image src={line}
                                                                                                         alt={"line"}
                                                                                                         className={"absolute right-0 w-full"}/></span>
                    </h1>

                    {/* Title */}
                    <h2 className="text-2xl font-light">
                        Je propose des contrats adaptés à la plupart des professions nécessitant mes services.
                    </h2>

                    {/* Remove Filter Button */}
                    {profession && (
                        <div
                            className="inline-flex justify-center space-x-4 bg-[#E8E8E8] rounded-lg py-2 px-7 shadow-md text-black w-auto text-lg font-light"
                        >
                            <p>{profession}</p>
                            <RiPencilLine className={"w-7 h-auto cursor-pointer"} onClick={handleRemoveFilter}/>
                        </div>
                    )}

                    {/* More Contracts Section */}
                    <div className="flex items-center gap-3 mt-10">
                        <span className="text-xl font-semibold">Plus de contrats</span>
                    </div>
                </div>
                <div className={"flex justify-center items-center text-center flex-1"}>
                    <Image src={loopPaper} alt={"loop paper"}/>
                </div>
            </div>

            <ProductSection/>

            <BackgroundBubbles size={96} position={"-right-16 -bottom-16"}/>

            {/*/!* Product List *!/*/}
            {/*<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">*/}
            {/*    /!* Replace with your dynamic product content *!/*/}
            {/*    {profession ? (*/}
            {/*        // Show filtered products*/}
            {/*        <div className="bg-gray-100 p-6 rounded shadow-md flex flex-col items-start">*/}
            {/*            <h3 className="text-xl font-semibold mb-2">{`Produit filtré pour ${profession}`}</h3>*/}
            {/*            <p className="text-gray-600">Description du produit...</p>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        // Show default products*/}
            {/*        ["Produit A", "Produit B", "Produit C"].map((product, index) => (*/}
            {/*            <div key={index} className="bg-gray-100 p-6 rounded shadow-md flex flex-col items-start">*/}
            {/*                <h3 className="text-xl font-semibold mb-2">{product}</h3>*/}
            {/*                <p className="text-gray-600">Description du produit...</p>*/}
            {/*            </div>*/}
            {/*        ))*/}
            {/*    )}*/}
            {/*</div>*/}
        </main>
    );
}
