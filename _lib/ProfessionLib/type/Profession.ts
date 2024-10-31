export interface ProfessionData {
    name: string;
    description?: string;
}

/**
 * Services pour interagir avec les routes API des professions.
 */
export interface Profession {
    _id: string;
    name: string;
    description: string;
    yearsOfExperience: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
