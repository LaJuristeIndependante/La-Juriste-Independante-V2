import dynamic from 'next/dynamic';
import { convertBufferToBase64 } from '@/components/utils/ConvertBufferToBase64';
import Image from 'next/image';
import contract_card_icon from '@/../public/assets/images/models-page/model-card-icon.jpg';
import contract_card_background_image from '@/../public/assets/images/models-page/model-card-background-image.svg';
import contractIcon from '@/../public/assets/images/common/contract-icon.svg';

/**
 * Composant pour afficher une carte de contrat
 * @param {*} props - Contrat propriétés
 * @returns {JSX.Element}
 */
interface Template {
    name: string;
    description: string;
    price: number;
    _id: string;
    image: {
        type: string;
        data: Buffer;
    } | null;
}

const TemplateCard1: React.FC<{ template: Template }> = ({ template }) => {
    // Vérifie si l'image est un buffer et convertissez-la en base64 si nécessaire
    const title_icon_Url = template && template.image && template.image.type === 'Buffer' ? convertBufferToBase64(template.image.data) : contractIcon;

    return (
        <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-md z-100" style={{ width: '250px' }}>
            <div className="flex items-center justify-center w-full border-1 border-black" style={{ background: `url(${contract_card_background_image}) no-repeat bottom right, #FFFFFF`, backgroundSize: '150px 115px' }}>
                <div className="flex-col items-center justify-center w-full" style={{ height: '150px' }}>
                    <Image src={title_icon_Url} alt={`product ${template.name}`} className="w-20 h-20 mx-auto" />
                    <h2 className="text-lg font-bold mb-2 text-center">{template.name}</h2>
                </div>
            </div>
            <div className="p-4">
                <p className="text-xs text-gray-600 mb-2 w-full">
                    Description:
                </p>
                <p className='text-xs font-normal text-gray-800 w-full mb-2 h-20 overflow-hidden'>
                    {template.description}
                </p>
                <div className="flex items-center justify-evenly w-full">
                    <p className="text-xl font-bold text-gray-800 w-full">{template.price} €</p>
                    <a href={`/models/${template._id}`} className="text-sm font-normal flex items-center justify-evenly w-1/2" style={{ color: '#DD2A27' }}>
                        Aperçu
                        <span>
                            <Image src={contract_card_icon.src} alt="icon" className="w-3 h-4 mt-[1px]" />
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default dynamic(() => Promise.resolve(TemplateCard1), { ssr: false });