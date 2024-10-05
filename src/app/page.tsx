import ProductSection from "@lib/ProductLib/component/ProductSection";
import NewsLetterSection from "@lib/NewsLetterLib/component/NewsLetterSection";
import TestimonialsSection from "@lib/testimonialLib/component/TestimonialsSection";
import FirstSection from "@/components/home/FirstSection";
import SecondSection from "@/components/home/SecondSection";
import BubbleBackground from "@/components/utils/décors/BubbleBackground";
import React from "react";

export default function Home() {
    return (
        <main className="relative items-center justify-between">
            <FirstSection/>
            <SecondSection/>
            {/*<ProductSection/>*/}
            <TestimonialsSection/>
            <BubbleBackground size={96} position={"-left-24 -bottom-24"}/>
        </main>
    );
}
