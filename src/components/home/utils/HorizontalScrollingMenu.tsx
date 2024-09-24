import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import left_icon from '../../../../../la-juriste-independant/public/assets/images/common/left-icon.svg';
import right_icon from '../../../../../la-juriste-independant/public/assets/images/common/right-arrow-icon.svg';

const HorizontalScrollingMenu = ({ professions }: { professions: any[] }) => {
    const router = useRouter();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative max-w-56 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-[25%] mt-2">
            <button
                className="scroll-button left-scroll"
                onClick={scrollLeft}
                aria-label="Scroll left"
            >
                <Image src={left_icon} alt="Left arrow" />
            </button>
            <div className="scroll-container" ref={scrollContainerRef}>
                <div className="scroll-content">
                    {professions.map((profession) => (
                        <div
                            key={profession._id}
                            className="menu-item bg-[#E8E8E8] p-3 m-1 rounded-xl cursor-pointer"
                            onClick={() => router.push(`/models/search/${profession.name}`)}
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
                <Image src={right_icon} alt="Right arrow" />
            </button>
        </div>
    );
};

export default HorizontalScrollingMenu;