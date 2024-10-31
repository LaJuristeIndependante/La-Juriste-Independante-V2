import {Profession} from "@lib/ProfessionLib/type/Profession";

export interface ProductDetail {
    _id: string;
    name: string;
    description: string;
    price: number;
    pdfFile?: string;
    profession: Profession | string; // Peut être un objet Profession ou un ID
    createdAt: Date;
    updatedAt: Date;
}

export interface TitleSectionModelsProps {
    professionName: string;
}

export interface ProductData {
    _id: string;
    name: string;
    price: number;
    description?: string;
    profession?: {
        _id: string;
        name: string;
    };
}

export interface ProductPageProps {
    params: {
        id: string;
    };
}