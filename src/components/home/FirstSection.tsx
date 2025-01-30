"use client"

import React from 'react';
import TitleSection from '@/components/home/utils/TitleSection';
import SearchDiv from "@/components/home/utils/SearchDiv";

const FirstSectionComponent: React.FC = () => {
    return (
        <section className="first-section w-full h-screen relative">
            <TitleSection />
            <SearchDiv />
            <div className="absolute bottom-8 right-0">
                <hr
                    className="w-[250px] md:w-[500px] border-[12px] md:border-l-8 rounded-l-xl border-[#A00C30] my-10 mx-auto"
                />
            </div>
        </section>
    );
}

export default FirstSectionComponent;
