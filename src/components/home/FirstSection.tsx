import React from 'react';
// import ProfessionSearchComponent from '@/components/home/utils/ProfessionSearchComponent';
import TitleSection from '@/components/home/utils/TitleSection';
import SearchDiv from "@/components/home/utils/SearchDiv";

const FirstSectionComponent: React.FC = () => {
    return (
        <div className="first-section w-full h-[70vh] relative">
                <TitleSection/>
                <SearchDiv/>
            {/*<ProfessionSearchComponent />*/}
            <div className="absolute bottom-0 right-0">
                <hr
                    className="w-full md:w-[500px] border-[12px] md:border-l-8 rounded-l-xl border-[#DA1A32] my-10 mx-auto"
                />
            </div>
        </div>
    );
}

export default FirstSectionComponent;
