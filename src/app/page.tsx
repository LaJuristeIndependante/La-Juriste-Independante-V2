import TestimonialsSection from "@lib/testimonialLib/component/TestimonialsSection";
import FirstSection from "@/components/home/FirstSection";
import SecondSection from "@/components/home/SecondSection";
import BubbleBackground from "@/components/utils/décors/BubbleBackground";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Accueil",
};


export default function Home() {

    return (
        <main className="relative items-center justify-between">
            <FirstSection/>
            <SecondSection/>
            <TestimonialsSection/>
            <BubbleBackground page="landing"/>
        </main>
    );
}
