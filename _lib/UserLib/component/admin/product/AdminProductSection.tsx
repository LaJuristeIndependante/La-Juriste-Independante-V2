// components/AdminProductSection.tsx
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
    fetchProductsForAdmin,
    addProduct,
    deleteProduct,
    updateProductNoProxy
} from "@lib/ProductLib/service/produit";
import { Profession } from "@lib/ProfessionLib/type/Profession";
import { ProductDetail } from "@lib/ProductLib/type/Product";
import { getAllProfessions } from "@lib/ProfessionLib/service/professionService";
import Image from "next/image";
import contract from "@public/images/Utils/contract-icon.png";
import productIcon from "@public/images/Utils/Contract.png";
import ProductModal from '@lib/ProductLib/component/ProductModal'; 

export default function AdminProductSection() {
    const [products, setProducts] = useState<ProductDetail[]>([]);
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalProduct, setModalProduct] = useState<ProductDetail | undefined>(undefined);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProductsForAdmin();
                setProducts(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits", error);
            }
        };

        const loadProfessions = async () => {
            try {
                const data = await getAllProfessions();
                setProfessions(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des professions", error);
            }
        };

        loadProducts();
        loadProfessions();
    }, []);

    const openAddModal = () => {
        setModalMode('add');
        setModalProduct(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (product: ProductDetail) => {
        setModalMode('edit');
        setModalProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = async (formData: FormData) => {
        try {
            console.log('Mode actuel du modal:', modalMode);
            console.log('Données du formulaire :', Array.from(formData.entries()));

            if (modalMode === 'add') {
                await addProduct(formData);
            } else if (modalMode === 'edit' && modalProduct) {
                await updateProductNoProxy(modalProduct._id, formData);
            }

            const data = await fetchProductsForAdmin();
            setProducts(data);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du produit :", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            console.log(id)
            await deleteProduct(id);
            const data = await fetchProductsForAdmin();
            setProducts(data);
        } catch (error) {
            console.error("Erreur lors de la suppression du produit", error);
        }
    };

    const handleDownload = async (productId: string, productName: string) => {
        try {
            const response = await fetch(`/api/products/${productId}/pdf`);
            if (!response.ok) {
                throw new Error('Erreur lors du téléchargement du PDF');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${productName}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        } catch (error) {
            console.error('Erreur lors du téléchargement du PDF:', error);
        }
    };


    return (
        <section className={"w-full p-16"}>
            <div className={"flex justify-between w-full"}>
                <div className={"h-full w-full"}>
                    <h2 className="font-jost text-2xl md:text-4xl font-bold mb-6">
                        Gestionnaire de produits
                    </h2>
                    <button
                        onClick={openAddModal}
                        className="mb-6 px-4 py-2 bg-[#E8E8E8] text-black rounded-lg text-md hover:bg-gray-400 transition"
                    >
                        Ajouter un produit +
                    </button>
                </div>
                <div className={"flex justify-center h-full md:pr-20"}>
                    <Image src={contract} alt={"contract"} className={"h-28 w-auto"} />
                </div>
            </div>

            <div className="space-y-4 w-full">
                {products.map((product) => (
                    <details
                        key={product._id}
                        className="p-4 bg-[#E8E8E8] rounded-md shadow"
                    >
                        <summary className="flex flex-col md:flex-row justify-between items-center cursor-pointer">
                            <div className="flex items-center space-x-5">
                                <Image
                                    src={productIcon}
                                    alt={"productIcon"}
                                    className={"h-10 w-auto"}
                                />
                                <span className="font-semibold truncate max-w-xs">
                                    {!isMobile ? (
                                        product.name
                                    ) : (
                                        product.name.length > 30 ? product.name.substring(0, 30) + "..." : product.name
                                    )}
                                </span>
                            </div>
                            <div className={`flex flex-col ${isMobile ? 'space-y-4' : 'md:flex-row md:space-x-4 md:items-center md:justify-center'}`}>
                                <button
                                    onClick={() => handleDownload(product._id, product.name)}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                >
                                    Télécharger le PDF
                                </button>
                                <button
                                    onClick={() => openEditModal(product)}
                                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="px-4 py-2 bg-primary-color text-white rounded transition"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </summary>
                        <div className="mt-4">
                            <p>
                                <strong>Description :</strong> {product.description}
                            </p>
                            <p>
                                <strong>Prix :</strong> {product.price} €
                            </p>
                            <p>
                                <strong>Profession :</strong> {
                                    professions.find(prof => prof._id === product.profession)?.name || 'Profession inconnue'
                                }
                            </p>
                        </div>
                    </details>
                ))}
            </div>
            <ProductModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSave}
                product={modalProduct}
                professions={professions}
            />
        </section>
    );
}
