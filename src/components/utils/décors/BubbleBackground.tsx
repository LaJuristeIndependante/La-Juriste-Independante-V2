import React from "react";

interface BubbleBackgroundProps {
    page: string;
}

export default function BubbleBackground({ page }: BubbleBackgroundProps) {

    return (
        <>
            <div className={`bubble ${page === 'landing' ? 'bubble1 z-0' : ''}`}></div>
            <div className={`bubble ${page === 'specContract' ? 'bubble2 z-0' : ''}`}></div>
            <div className={`bubble ${page === 'contracts' ? 'bubble3 z-0' : ''}`}></div>

            {/*<div className={`bubble ${page === 'landing' ? 'bubble2' : 'z-0 bubble4'}`}></div>*/}
        </>
    );
}

