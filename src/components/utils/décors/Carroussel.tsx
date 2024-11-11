import { useState } from 'react';
import Image from "next/image";
import left from "@/../public/images/Utils/left-icon.svg";
import right from "@/../public/images/Utils/right-icon.svg";

interface CarouselProps {
    items: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-300"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {items.map((item, index) => (
                        <div key={index} className="min-w-full flex-shrink-0 m-8 mr-0 ml-0 flex flex-row items-center justify-center">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 text-white  rounded-full"
            >
                <Image src={left} alt="Précédent" width={0} height={0} className='h-12 w-12'/>
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 text-black  rounded-full"
            >
                <Image src={right} alt="Suivant" width={0} height={0} className='h-12 w-12'/>
            </button>

            <div className="absolute -bottom-5 left-0 right-0 flex justify-center space-x-2">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
