import React from 'react';
// import ProfessionSearchComponent from '@/components/home/utils/ProfessionSearchComponent';
import TitleSection from '@/components/home/utils/TitleSection';

const FirstSectionComponent: React.FC = () => {
  return (
    <div className="first-section w-full h-screen relative">
      <TitleSection />
      {/*<ProfessionSearchComponent />*/}
      <div className="absolute bottom-[3vh] right-0">
        <hr
          className="w-full md:w-[500px] border-[12px] md:border-l-8 rounded-l-xl border-special-red my-10 mx-auto"
        />
      </div>
    </div>
  );
}

export default FirstSectionComponent;
