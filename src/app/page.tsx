import ProductSection from "@lib/ProductLib/component/ProductSection";
import NewsLetterSection from "@lib/NewsLetterLib/component/NewsLetterSection";
import TestimonialsSection from "@lib/testimonialLib/component/TestimonialsSection";
import FirstSection from "@/components/home/FirstSection";
import SecondSection from "@/components/home/SecondSection";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <FirstSection/>
            <SecondSection/>
            {/*<ProductSection/>*/}
            <TestimonialsSection/>
        </main>
    );
}
