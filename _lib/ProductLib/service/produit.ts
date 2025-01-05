import axios from 'axios';
import {ProductData, ProductDetail} from "../type/Product";
import { saveAs } from 'file-saver';

/**
 * Récupère les détails d'un produit spécifique par son identifiant.
 *
 * @param {string} gameId - L'identifiant unique du produit (jeu) à récupérer.
 * @returns {Promise<ProductDetail | null>} - Une promesse qui résout avec les détails du produit si trouvé, sinon `null`.
 * @throws {Error} - Lance une erreur si la requête échoue ou si le produit n'est pas trouvé.
 *
 * @example
 *
 * fetchProduct('game-id-123')
 *   .then(product => {
 *     if (product) {
 *       console.log('Produit récupéré:', product);
 *     } else {
 *       console.log('Produit introuvable');
 *     }
 *   })
 *   .catch(error => {
 *     console.error('Erreur lors de la récupération du produit:', error.message);
 *   });
 */
export const fetchProductById = async (gameId: string): Promise<ProductDetail | null> => {
    try {
        const res = await axios.get(`/api/products/${gameId}/`);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Product not found or API error:', error.response?.status);
        } else {
            console.error('Failed to fetch product:', error);
        }
        return null;
    }
}

/**
 * Récupère la liste des produits exposable au client.
 *
 * @returns {Promise<Product[]>} - Une promesse qui se résout avec un tableau de produits.
 * @throws {Error} - Lance une erreur si la récupération échoue.
 */
export async function fetchProductsForClient(): Promise<ProductData[]> {
    try {
        const response = await axios.get('/api/products');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des produits');
    }
}

/**
 * Recuperer les produits en fonction de la profession.
 * @param professionFilter
 * @returns {Promise<ProductData[]>}
 * @throws {Error}
 * @example
*/
export async function fetchProductsByProfession(professionFilter: string): Promise<ProductData[]> {
    try {
        console.log('coucou');
        const response = await axios.get(`/api/products?profession=${professionFilter}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des produits');
    }
}



/**
 * Récupère la liste des produits.
 *
 * @returns {Promise<Product[]>} - Une promesse qui se résout avec un tableau de produits.
 * @throws {Error} - Lance une erreur si la récupération échoue.
 */
export async function fetchProductsForAdmin(): Promise<ProductDetail[]> {
    try {
        const response = await axios.get('/api/products');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des produits');
    }
}

/**
 * Ajoute un nouveau produit.
 *
 * @param {FormData} formData - Les données du produit, incluant l'image.
 * @returns {Promise<void>} - Une promesse qui se résout si l'ajout réussit.
 * @throws {Error} - Lance une erreur si l'ajout échoue.
 */
export async function addProduct(formData: FormData): Promise<void> {
    try {
        const response = await axios.post('/api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status !== 200) {
            throw new Error('Erreur lors de l\'ajout du produit');
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Erreur lors de l\'ajout du produit');
    }
}

/**
 * Supprime un produit par son identifiant.
 *
 * @param {string} id - L'identifiant du produit à supprimer.
 * @returns {Promise<void>} - Une promesse qui se résout si la suppression réussit.
 * @throws {Error} - Lance une erreur si la suppression échoue.
 */
export async function deleteProduct(id: string): Promise<void> {
    try {
        const response = await axios.delete(`/api/products/${id}`);
        if (response.status !== 200) {
            throw new Error('Erreur lors de la suppression du produit');
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la suppression du produit');
    }
}

/**
 * Met à jour un produit existant en fonction de son identifiant.
 *
 * @param {string} id - L'identifiant du produit à mettre à jour.
 * @param {Partial<ProductDetail>} updatedProduct - Un objet contenant les propriétés à mettre à jour.
 * @returns {Promise<ProductDetail>} - Une promesse qui se résout avec les détails du produit mis à jour.
 * @throws {Error} - Lance une erreur si la mise à jour échoue.
 *
 * @example
 *
 * updateProduct('productId123', { name: 'New Name', price: '99.99' })
 *   .then((updatedProduct) => console.log('Produit mis à jour:', updatedProduct))
 *   .catch((error) => console.error('Erreur lors de la mise à jour du produit:', error));
 */
export async function updateProduct(id: string, updatedProduct: FormData): Promise<ProductDetail> {
    try {
        const response = await axios.patch(`/api/products/${id}`, updatedProduct, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Let Axios handle this correctly
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour du produit');
    }
}

/**
 * Télécharge le PDF d'un produit spécifique par son identifiant.
 *
 * @param {string} productId - L'identifiant du produit.
 * @param {string} productName - Le nom du produit pour nommer le fichier téléchargé.
 * @returns {Promise<void>} - Une promesse qui se résout lorsque le téléchargement est terminé.
 * @throws {Error} - Lance une erreur si le téléchargement échoue.
 */
export async function downloadProductPdf(productId: string, productName: string): Promise<void> {
    try {
        const response = await axios.get(`/api/products/${productId}/pdf`, {
            responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', `${productName}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error: any) {
        console.error('Erreur lors du téléchargement du PDF :', error.message);
        throw new Error(error.response?.data?.message || 'Erreur lors du téléchargement du PDF');
    }
}

