// components/ProductModal.tsx
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { ProductDetail } from '@lib/ProductLib/type/Product';
import { Profession } from '@lib/ProfessionLib/type/Profession';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (formData: FormData) => void;
    product?: ProductDetail;
    professions: Profession[];
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, product, professions }) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [professionId, setProfessionId] = useState<string>('');
    const [pdfFile, setPdfFile] = useState<File | null>(null);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setProfessionId(typeof product.profession === 'string' ? product.profession : product.profession._id);
        } else {
            // Réinitialiser les champs lors de l'ajout d'un nouveau produit
            setName('');
            setDescription('');
            setPrice(0);
            setProfessionId('');
            setPdfFile(null);
        }
    }, [product]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('profession', professionId);
        if (pdfFile) {
            formData.append('pdfFile', pdfFile);
        }
        onSave(formData);
        onClose();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPdfFile(e.target.files[0]);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md ">
                <h2 className="text-xl font-semibold mb-4">{product ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nom</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Prix</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Profession</label>
                        <select
                            value={professionId}
                            onChange={(e) => setProfessionId(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        >
                            <option value="">Sélectionnez une profession</option>
                            {professions.map((profession) => (
                                <option key={profession._id} value={profession._id}>
                                    {profession.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Fichier PDF</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                            Annuler
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                            {product ? 'Enregistrer' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
