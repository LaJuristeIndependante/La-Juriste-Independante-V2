import React from 'react';
import { BackgroundBubblesProps } from '@/type/type';

const BackgroundBubbles: React.FC<BackgroundBubblesProps> = ({ page }) => {
    return (
        <>
            <div className={`bubble ${page === 'landing' ? 'bubble1 z-0' : ''}`}></div>
            <div className={`bubble ${page === 'specContract' ? 'bubble2 z-0' : ''}`}></div>
            <div className={`bubble ${page === 'contracts' ? 'bubble3 z-0' : ''}`}></div>
            
            {/*<div className={`bubble ${page === 'landing' ? 'bubble2' : 'z-0 bubble4'}`}></div>*/}
        </>
    );
}

export default BackgroundBubbles;
