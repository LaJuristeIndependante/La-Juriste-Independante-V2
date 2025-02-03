import React from 'react';
import LeftSection from '@/components/support-page/LeftSection';
import RightSection from '@/components/support-page/RightSection';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Support",
};

const SupportPage: React.FC = () => {


  return (
    <>
      <div className='h-auto min-h-[120vh] flex flex-col-reverse md:flex-row justify-center items-center w-full mb-20 md:mb-0 mt-10 md:mt-[-60px]'>
        <LeftSection />
        <RightSection />
      </div>
    </>
  );
}

export default SupportPage;
