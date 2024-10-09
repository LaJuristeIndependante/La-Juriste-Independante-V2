import {Profession} from "@lib/ProfessionLib/type/Profession";


/**
 * Récupère toutes les professions à partir de l'API.
 *
 * @returns {Promise<Profession[]>} Une promesse qui résout à un tableau de professions.
 * @throws Lève une erreur si l'opération de récupération échoue.
 */
export async function getAllProfessions(): Promise<Profession[]> {
    try {
        const response = await fetch('/api/profession', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Échec de la récupération des professions');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des professions :', error);
        throw error;
    }
}

/**
 * Récupère une profession par son ID à partir de l'API.
 *
 * @param {string} id - L'ID de la profession à récupérer.
 * @returns {Promise<Profession>} Une promesse qui résout à l'objet profession.
 * @throws Lève une erreur si l'opération de récupération échoue.
 */
export async function getProfessionById(id: string): Promise<Profession> {
    try {
        const response = await fetch(`/api/profession/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Échec de la récupération de la profession');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération de la profession :', error);
        throw error;
    }
}

/**
 * Ajoute une nouvelle profession à la base de données via l'API.
 *
 * @param {Omit<Profession, '_id' | 'createdAt' | 'updatedAt'>} data - Les données de la profession à ajouter.
 * @returns {Promise<Profession>} Une promesse qui résout à la nouvelle profession créée.
 * @throws Lève une erreur si l'opération d'ajout échoue.
 */
export async function addProfession(
    data: Omit<Profession, '_id' | 'createdAt' | 'updatedAt'>
): Promise<Profession> {
    try {
        const response = await fetch('/api/profession', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Échec de l’ajout de la profession');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de l’ajout de la profession :', error);
        throw error;
    }
}

/**
 * Met à jour une profession existante dans la base de données via l'API.
 *
 * @param {string} id - L'ID de la profession à mettre à jour.
 * @param {Partial<Omit<Profession, '_id' | 'createdAt' | 'updatedAt'>>} data - Les données mises à jour de la profession.
 * @returns {Promise<Profession>} Une promesse qui résout à la profession mise à jour.
 * @throws Lève une erreur si l'opération de mise à jour échoue.
 */
export async function updateProfession(
    id: string,
    data: Partial<Omit<Profession, '_id' | 'createdAt' | 'updatedAt'>>
): Promise<Profession> {
    try {
        const response = await fetch(`/api/profession/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Échec de la mise à jour de la profession');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la profession :', error);
        throw error;
    }
}

/**
 * Supprime une profession par son ID de la base de données via l'API.
 *
 * @param {string} id - L'ID de la profession à supprimer.
 * @returns {Promise<void>} Une promesse qui se résout lorsque la profession est supprimée.
 * @throws Lève une erreur si l'opération de suppression échoue.
 */
export async function deleteProfession(id: string): Promise<void> {
    try {
        const response = await fetch(`/api/profession/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Échec de la suppression de la profession');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la profession :', error);
        throw error;
    }
}
