"use client";
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTemplateByProfession, getContracts } from '@lib/ProfessionLib/service/Profession';
import SpecificTemplatePage from '@/components/specific-template-page/SpecificTemplatePage';
import TemplateCard1 from '@/components/templates-page/TemplateCard1';
import Loader from '@/components/common/animations/Loader';
import { ErrorResponse } from '@/types/types';
import { ProductDetail } from '@lib/ProductLib/type/Product';

const fetchTemplates = async (profession?: string): Promise<ProductDetail[]> => {
    if (profession) {
        const response = await getTemplateByProfession(profession);
        return response.data || [];
    } else {
        const response = await getContracts();
        return response || [];
    }
};

export default function TemplateList() {
    const router = useRouter();
    const [id, setId] = useState<string | null>(null);
    const [profession, setProfession] = useState<string | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setId(searchParams.get('id'));
        setProfession(searchParams.get('profession'));
    }, []);

    const { data: templates = [], isLoading, error } = useQuery<ProductDetail[], ErrorResponse>(
        ['templates', profession],
        () => fetchTemplates(profession as string),
        {
            staleTime: 5 * 60 * 1000,
            retry: false,
            enabled: profession !== null, // Only run the query if profession is not null
        }
    );

    const templateFind = templates.find((template) => template._id === id);

    return (
        <div className="flex items-center justify-center mt-4 px-4 w-full pb-12 h-auto">
            {id ? (
                <div className="w-full">
                    {templateFind ? (
                        <SpecificTemplatePage template={templateFind} templateId={id as string} />
                    ) : (
                        <div className='flex justify-center items-center h-[80vh]'>
                            <Loader />
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-full max-w-9xl h-full">
                    <h2 className="text-lg font-semibold mb-4 title_section_templates">
                        Plus de modèles
                    </h2>
                    <div className="border-4 border-dotted h-auto flex flex-wrap pl-4 pt-4 w-full justify-evenly">
                        {isLoading ? (
                            <div className="h-[20vh] flex justify-center items-center mb-4">
                                <Loader />
                            </div>
                        ) : templates.length === 0 ? (
                            <p className="text-center w-full mb-4 h-[20vh] flex justify-center items-center">
                                Il n&apos;y a pas de modèles disponibles pour la profession &quot;{profession}&quot;.
                            </p>
                        ) : error ? (
                            <p className="mb-4">{error.message || 'Une erreur est survenue.'}</p>
                        ) : (
                            templates.map((template) => (
                                <div key={template._id} className="mb-4">
                                    <TemplateCard1 template={template as any} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

