import React from 'react';
import LeftSection from '@/components/support-page/LeftSection';
import RightSection from '@/components/support-page/RightSection';
import BubbleBackground from '@/components/utils/décors/BubbleBackground';

const SupportPage: React.FC = () => {


  return (
    <main className='h-auto bg-red md:h-screen flex flex-col-reverse md:flex-row justify-center items-center w-full mb-20 md:mb-0 mt-10 md:mt-[-60px]'>
      <LeftSection />
      <RightSection />
      <BubbleBackground page='landing' />
    </main>
  );
}

export default SupportPage;
