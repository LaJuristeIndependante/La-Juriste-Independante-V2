"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Carousel from "../../../../../../la-juriste-independant/src/components/utils/decorations/Carroussel";
import { bouncy } from 'ldrs'
import { TemplateData } from "../../../../../../la-juriste-independant/src/types/Template";

interface TemplatePageProps {
    params: {
        gameId: string;
    };
}

interface TemplateDocument extends TemplateData {
    id: number;
    description: string | undefined;
    image: any;
    name: any;
    price: any;
    _id: string;
}

const TemplateCard = ({ template }: { template: TemplateDocument }) => {
    const base64Image = template.image
        ? `data:image/png;base64,${Buffer.from(template.image).toString('base64')}`
        : '';

    return (
        <div className="flex flex-col items-center justify-center w-1/2 p-2">
            <div className="relative w-full h-0 pb-[100%] bg-tertiary border-2 rounded-lg overflow-hidden">
                <Image
                    src={base64Image}
                    alt={template.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
                <a
                    href={`/templates/${template._id}`}
                    className="bg-secondary text-white py-2 px-4 rounded-lg absolute bottom-2 right-2 text-xs md:text-sm lg:text-base"
                >
                    En savoir plus
                </a>
            </div>
            <p className="text-primary text-left mt-4 text-sm md:text-lg lg:text-xl font-bimbo text-stroke-black-2">
                {template.name}
            </p>
        </div>
    );
};

const SecondSection = () => {
    bouncy.register();

    const [templates, setTemplates] = useState<TemplateDocument[]>([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const res = await fetch("/api/templates");
                const data = await res.json();
                setTemplates(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des templates:", error);
            }
        };
        fetchTemplates();
    }, []);

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center z-20 pt-20 md:pt-24"
            id="templates"
        >
            <h2 className="flex text-center items-center justify-center text-stroke-black text-4xl">
                Nos Templates
            </h2>
            <h3 className="flex text-stroke-black text-xl font-lazy-dog text-center items-center justify-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </h3>
            {templates.length > 0 ? (
                <Carousel
                    items={templates.map((template, index) => (
                        <TemplateCard key={template.id || index} template={template} />
                    ))}
                />
            ) : (
                <div className="mt-20">
                    <l-bouncy
                        size="45"
                        speed="1.75"
                        color="black"
                    ></l-bouncy>
                </div>
            )}
        </section>
    );
};

export default SecondSection;
