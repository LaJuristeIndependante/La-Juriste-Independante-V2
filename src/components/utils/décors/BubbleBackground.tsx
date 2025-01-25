import React from "react";

interface BubbleBackgroundProps {
    page: string;
}

export default function BubbleBackground({ page }: BubbleBackgroundProps) {

    return (
        <>

            <div className={`bubble ${page === 'landing' ? 'bubble1' : ''}`}></div>
            <div className={`bubble ${page === 'specContract' ? 'bubble2' : ''}`}></div>
            <div className={`bubble ${page === 'contracts' ? 'bubble3' : ''}`}></div>
            <div className={`bubble ${page === 'contracts-large-destock' ? 'bubble3 mr-10' : ''}`}></div>
        </>
    );
}

