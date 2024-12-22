import axios from 'axios';

/**
 * Crée un Payment Intent pour un montant donné.
 *
 * @param {number} amount - Le montant à traiter, converti en sous-unité de la devise (par exemple, en centimes pour l'USD/EUR).
 * @param orderId
 * @param personalInfo
 * @returns {Promise<string>} - Une promesse qui résout avec le `clientSecret` du Payment Intent.
 * @throws {Error} - Lance une erreur si la création du Payment Intent échoue.
 *
 * @example
 *
 * createPaymentIntent(5000) // pour 50.00 dans la devise choisie
 *   .then(clientSecret => {
 *     console.log('Client secret reçu:', clientSecret);
 *   })
 *   .catch(error => {
 *     console.error('Erreur lors de la création du Payment Intent:', error.message);
 *   });
 */
export const createPaymentIntent = async (amount: number, orderId: string, personalInfo: any): Promise<string> => {
    try {
        const response = await axios.post('/api/payment', { amount, orderId, personalInfo }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Erreur lors de la création du Payment Intent');
        }

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erreur lors de la création du Payment Intent.");
    }
}