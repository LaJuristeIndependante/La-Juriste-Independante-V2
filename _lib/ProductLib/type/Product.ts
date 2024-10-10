
export interface ProductDetail {
    _id: string;
    name: string;
    description: string;
    price: number;
    profession?: {
        _id: string;
        name: string;
    }; // Lien vers la profession associée (optionnel)
    pdfFile?: Buffer; // PDF stocké sous forme de Buffer (optionnel)
    createdAt: Date;
    updatedAt?: Date;
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