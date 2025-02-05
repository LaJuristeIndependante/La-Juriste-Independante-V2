import axios from 'axios';
import {CreateOrderParams, OrderDetails} from "../type/OrderType";
import {saveAs} from "file-saver";

/**
 * Crée une nouvelle commande pour un utilisateur donné.
 *
 * @param {Object} CreateOrderParams - Les paramètres nécessaires pour créer une commande.
 * @param {string} CreateOrderParams.userId - L'ID de l'utilisateur qui passe la commande.
 * @param {Array} CreateOrderParams.items - Un tableau contenant les articles de la commande.
 * @param {number} CreateOrderParams.amount - Le montant total de la commande.
 * @returns {Promise<any>} - Une promesse qui résout avec les données de la réponse si la commande est créée avec succès, ou rejette une erreur en cas d'échec.
 *
 * @throws {Error} - Lance une erreur si la requête échoue pour être capturée par la gestion d'erreur à un niveau supérieur.
 *
 * @example
 *
 * createOrder({
 *   userId: '12345',
 *   items: [
 *     { productId: '54321', quantity: 2, price: 20 },
 *     { productId: '98765', quantity: 1, price: 50 }
 *   ],
 *   amount: 90
 * }).then(order => {
 *   console.log('Order created successfully:', order);
 * }).catch(error => {
 *   console.error('Failed to create order:', error);
 * });
 */
export async function createOrder({ userId, items, amount }: CreateOrderParams): Promise<any> {
    try {
        const response = await axios.post('/api/orders', {
            userId,
            items,
            amount,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data; // Retourne les données de la réponse si tout est correct
    } catch (error) {
        console.error('Error while creating order:', error);
        throw error; // Lancer une erreur pour la gestion à un niveau supérieur
    }
}

/**
 * Supprime une commande spécifique par son identifiant.
 *
 * @param {string} orderId - L'identifiant de la commande à supprimer.
 * @returns {Promise<void>} - Une promesse qui résout si la commande est supprimée avec succès.
 *
 * @throws {Error} - Lance une erreur si la suppression échoue, avec un message approprié.
 *
 * @example
 *
 * deleteOrder('12345')
 *   .then(() => {
 *     console.log('Order deleted successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Failed to delete order:', error.message);
 *   });
 */
export async function deleteOrder(orderId: string): Promise<void> {
    try {
        const response = await axios.delete(`/api/orders/${orderId}`);

        if (response.status !== 200) {
            throw new Error("Failed to delete order");
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error deleting order");
    }
}

/**
 * Met à jour les informations d'une commande spécifique par son identifiant.
 *
 * @param {string} orderId - L'identifiant de la commande à mettre à jour.
 * @param {object} updatedInfo - Un objet contenant les nouvelles informations à mettre à jour pour la commande.
 * @returns {Promise<void>} - Une promesse qui résout si la commande est mise à jour avec succès.
 *
 * @throws {Error} - Lance une erreur si la mise à jour échoue, avec un message approprié.
 *
 * @example
 *
 * updateOrder('12345', { status: 'shipped' })
 *   .then(() => {
 *     console.log('Order updated successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Failed to update order:', error.message);
 *   });
 */
export async function updateOrder(orderId: string, updatedInfo: object): Promise<void> {
    try {
        const response = await axios.put(`/api/orders/${orderId}`, updatedInfo, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.status !== 200) {
            throw new Error("Failed to update order");
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error updating order");
    }
}

/**
 * Récupère toutes les commandes effectuées par un utilisateur donné.
 *
 * @param {string} userId - L'ID de l'utilisateur dont on veut récupérer les commandes.
 * @returns {Promise<any[]>} - Une promesse qui résout avec un tableau contenant les commandes de l'utilisateur si la requête est réussie.
 *
 * @throws {Error} - Lance une erreur si la requête échoue avec un message approprié.
 *
 * @example
 *
 * fetchOrdersByUser('12345')
 *   .then(orders => {
 *     console.log('Orders fetched successfully:', orders);
 *   })
 *   .catch(error => {
 *     console.error('Failed to fetch orders:', error.message);
 *   });
 */
export async function fetchOrdersByUser(userId: string): Promise<any[]> {
    try {
        const response = await axios.get(`/api/orders/user/${userId}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch orders");
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error fetching orders");
    }
}

/**
 * Récupère les détails d'une commande spécifique par son identifiant.
 *
 * @param {string} orderId - L'identifiant unique de la commande à récupérer.
 * @returns {Promise<OrderDetails>} - Une promesse qui résout avec les détails de la commande.
 * @throws {Error} - Lance une erreur si la récupération échoue.
 *
 * @example
 *
 * fetchOrderDetails('order-id-123')
 *   .then(orderDetails => {
 *     console.log('Détails de la commande récupérés:', orderDetails);
 *   })
 *   .catch(error => {
 *     console.error('Erreur lors de la récupération des détails de la commande:', error.message);
 *   });
 */
export const fetchOrderDetails = async (orderId: string): Promise<OrderDetails> => {
    try {
        const response = await axios.get(`/api/orders/${orderId}`);

        if (response.status !== 200) {
            throw new Error("Échec de la récupération des détails de la commande.");
        }

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la récupération des détails de la commande.");
    }
}

/**
 * Met à jour les informations personnelles d'une commande.
 *
 * @param {string} orderId - L'identifiant unique de la commande.
 * @param {object} personalInfo - Les informations personnelles du client.
 * @param {string} personalInfo.name - Le nom du client.
 * @param {string} personalInfo.email - L'adresse email du client.
 * @param {string} personalInfo.phone - Le numéro de téléphone du client.
 * @param {object} personalInfo.address - Les détails de l'adresse du client.
 * @returns {Promise<void>} - Une promesse qui se résout si la mise à jour est réussie.
 * @throws {Error} - Lance une erreur si la mise à jour échoue.
 */
export const updateOrderPersonalInfo = async (
    orderId: string,
    personalInfo: {
        name: string,
        email: string,
        phone: string,
        address: {
            line1: string,
            line2: string,
            city: string,
            postalCode: string,
            country: string,
        },
    }
): Promise<void> => {
    try {
        const response = await axios.put(`/api/orders/${orderId}`, {
            name: personalInfo.name,
            email: personalInfo.email,
            phone: personalInfo.phone,
            address: personalInfo.address,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Échec de la mise à jour des informations personnelles de la commande.');
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour des informations personnelles.');
    }
};

/**
 * Met à jour le statut d'une commande à 'paid'.
 *
 * @param {string} orderId - L'identifiant unique de la commande.
 * @param {string} status - Le statut de la commande, par exemple 'paid'.
 * @returns {Promise<void>} - Une promesse qui se résout si la mise à jour est réussie.
 * @throws {Error} - Lance une erreur si la mise à jour échoue.
 */
export const updateOrderStatus = async (
    orderId: string,
    status: string
): Promise<void> => {
    try {
        const response = await axios.put(`/api/orders/${orderId}`, {
            status,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Échec de la mise à jour du statut de la commande.');
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour du statut de la commande.');
    }
};


/**
 * Récupère la liste des commandes.
 *
 * @returns {Promise<Order[]>} - Une promesse qui se résout avec un tableau d'objets de type `Order`.
 * @throws {Error} - Lance une erreur si la récupération échoue.
 *
 * @example
 *
 * getOrders()
 *   .then(orders => {
 *     console.log('Commandes récupérées:', orders);
 *   })
 *   .catch(error => {
 *     console.error('Erreur lors de la récupération des commandes:', error.message);
 *   });
 */
export async function getOrders(): Promise<OrderDetails[]> {
    try {
        const response = await axios.get('/api/orders');
        if (response.status === 200) {
            return response.data; // Assurez-vous que response.data est bien un tableau de commandes
        } else {
            throw new Error('Échec lors de la récupération des commandes');
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des commandes.');
    }
}

/**
 * Nettoie les commandes en supprimant celles qui sont obsolètes ou expirées.
 *
 * Cette fonction envoie une requête à l'API `/api/orders/cleanup` pour supprimer
 * les commandes non valides. Elle s'exécute en arrière-plan à intervalle régulier.
 *
 * @returns {Promise<number>} - Retourne le nombre de commandes supprimées en cas de succès.
 * @throws {Error} - Lance une erreur si la requête échoue ou si l'API retourne une réponse incorrecte.
 *
 * @example
 * cleanupOrders()
 *   .then(deletedCount => console.log(`${deletedCount} commandes supprimées.`))
 *   .catch(error => console.error('Erreur lors du nettoyage des commandes:', error));
 */
export const cleanupOrders = async (): Promise<number> => {
    try {
        const res = await axios.get('/api/orders/cleanup');

        if (res.status !== 200) {
            throw new Error('Erreur lors du nettoyage des commandes');
        }

        const { deletedCount } = res.data;
        return deletedCount;
    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API de nettoyage:', error);
        throw new Error(error instanceof Error ? error.message : 'Erreur inconnue');
    }
};

/**
 * Télécharge le PDF d'un produit spécifique dans une commande.
 *
 * @param {string} orderId - L'identifiant de la commande.
 * @param {string} productId - L'identifiant du produit dans la commande.
 * @param {string} productName - Le nom du produit pour nommer le fichier téléchargé.
 * @returns {Promise<void>} - Une promesse qui se résout lorsque le téléchargement est terminé.
 * @throws {Error} - Lance une erreur si le téléchargement échoue.
 */


/**
 * Télécharge le fichier PDF d'un produit spécifique.
 *
 * @param {string} orderId - L'identifiant de la commande.
 * @param {string} productId - L'identifiant du produit dans la commande.
 * @param {string} productName - Le nom du produit pour nommer le fichier téléchargé.
 * @returns {Promise<void>} - Une promesse qui se résout lorsque le téléchargement est terminé.
 * @throws {Error} - Lance une erreur si le téléchargement échoue.
 */
export async function downloadProductPdf(orderId: string, productId: string, productName: string): Promise<void> {
    try {
        const response = await axios.get(`/api/orders/${orderId}/items/${productId}/pdf`, {
            responseType: 'blob', // Pour gérer les données binaires
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(blob, `${productName}.pdf`);
        console.log(`Fichier PDF téléchargé avec succès pour le produit : ${productName}`);
    } catch (error: any) {
        console.error(`Erreur lors du téléchargement du fichier PDF :`, error);
        throw new Error(error.response?.data?.message || 'Impossible de télécharger le fichier PDF.');
    }
}



