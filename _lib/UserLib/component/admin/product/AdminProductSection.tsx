"use client";

import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { addProduct, deleteProduct, fetchProducts, updateProduct } from "@lib/ProductLib/service/produit";
import { ProductDetail } from "@lib/ProductLib/type/Product";
import Image from "next/image";

import contract from "@public/images/Utils/contract-icon.png";
import productContract from "@public/images/Utils/Contract.png";

const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState<ProductDetail[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits:", error);
            }
        };

        loadProducts();
    }, []);

    const openPopup = (product?: ProductDetail) => {
        if (product) {
            // Editing an existing product
            setSelectedProduct(product);
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price.toString());
        } else {
            // Adding a new product
            setSelectedProduct(null);
            setName("");
            setDescription("");
            setPrice("");
        }
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedProduct(null);
        setName("");
        setDescription("");
        setPrice("");
        setImage(null);
        setIsSuccess(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsSuccess(false);

        try {
            if (selectedProduct) {
                // Update product: Prepare a Partial<ProductDetail> object
                const updatedProduct: Partial<ProductDetail> = {
                    name,
                    description,
                    price: parseFloat(price),
                };

                if (image) {
                    // If there's a new image, we need to include it
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("description", description);
                    formData.append("price", price);
                    formData.append("image", image);

                    await updateProduct(selectedProduct._id, formData as unknown as Partial<ProductDetail>);
                } else {
                    // Update without an image change
                    await updateProduct(selectedProduct._id, updatedProduct);
                }

                // Update the local product state
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === selectedProduct._id
                            ? { ...product, name, description, price: parseFloat(price) }
                            : product
                    )
                );
            } else {
                // Add new product: Use FormData as required
                const formData = new FormData();
                formData.append("name", name);
                formData.append("description", description);
                formData.append("price", price);
                if (image) {
                    formData.append("image", image);
                }

                // Ensure that the return type is typed correctly
                const newProduct: ProductDetail = await addProduct(formData);

                // Update the local products state to include the newly added product
                setProducts((prevProducts) => [...prevProducts, newProduct]);
            }

            setIsSuccess(true);
            // Close the popup after successfully adding/updating the product
            closePopup();
        } catch (error) {
            console.error("Erreur lors de l'ajout ou de la modification du produit:", error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression du produit:", error);
        }
    };

    return (
        <section className="flex flex-col text-black min-h-screen p-8 w-full space-y-10 z-0">
            <div className={"flex justify-between"}>
                <div className={"h-full w-full"}>
                    <h2 className="font-jost text-4xl font-bold mb-6">Gestionnaire de contrats</h2>
                    <button
                        onClick={() => openPopup()}
                        className="mb-6 px-4 py-2 bg-[#D9D9D9] text-black rounded-lg text-md hover:bg-gray-400 transition"
                    >
                        Ajouter un contrat +
                    </button>
                </div>
                <div className={"flex justify-center h-full pr-20"}>
                    <Image src={contract} alt={"contract"} className={"h-28 w-auto"} />
                </div>
            </div>

            <div className="space-y-4 w-full">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow"
                    >
                        <div className="flex items-center space-x-5">
                            <Image src={productContract} alt={"productContract"} className={"h-10 w-auto"} />
                            <span className="font-semibold">{product.name}</span>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => openPopup(product)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="px-4 py-2 bg-[#DD2A27] text-white rounded transition"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl m-8">
                        <h2 className="text-3xl font-bold mb-6">
                            {selectedProduct ? "Modifier le produit" : "Ajouter un nouveau produit"}
                        </h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Nom:</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Description:</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                    rows={4}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Prix (€):</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    step="0.01"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Image:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "En cours..." : selectedProduct ? "Enregistrer" : "Ajouter"}
                                </button>
                                <button
                                    type="button"
                                    onClick={closePopup}
                                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
                                >
                                    Annuler
                                </button>
                            </div>
                            {isSuccess && (
                                <p className="text-green-500 mt-4">
                                    {selectedProduct ? "Produit modifié avec succès !" : "Produit ajouté avec succès !"}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductManagement;
