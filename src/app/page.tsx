<<<<<<< HEAD
import ProductSection from "@lib/ProductLib/component/ProductsSection";
import NewsLetterSection from "@lib/NewsLetterLib/component/NewsLetterSection";
=======

>>>>>>> d33ea7dbd10e5fffc50bf5d47b70b5afd9f6bb9a
import TestimonialsSection from "@lib/testimonialLib/component/TestimonialsSection";
import FirstSection from "@/components/home/FirstSection";
import SecondSection from "@/components/home/SecondSection";
import BubbleBackground from "@/components/utils/décors/BubbleBackground";
import React from "react";
import "@/styles/index.css";

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
