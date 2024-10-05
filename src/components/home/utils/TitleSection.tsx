import React from 'react';
import line from "@public/images/home/redline.png"
import Image from "next/image";

const TitleSection: React.FC = () => {
    return (
        <div className='min-h-[350px] flex flex-col justify-center items-center'>
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-center mt-20 mb-6 title_section">
                Le droit à <span className={"relative"}>porter de main <Image src={line} alt={"line"} className={"absolute right-0"}/></span>
            </h1>

            <p className="text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-lg font-light text-center w-full sm:w-1/2">
                Services juridiques personnalisés pour micro-entrepreneurs : protection et réussite garanties !
            </p>
        </div>
    );
}

export default TitleSection;
