import mongoose, { Schema, model, Document, Types } from 'mongoose';
import { IProfession } from '@lib/ProfessionLib/model/Profession'; // Import the IProfession interface

// Interface pour le document produit
interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    pdfFile?: Buffer;  // Fichier PDF optionnel
    profession: Types.ObjectId;  // Référence à Profession (_id)
    createdAt: Date;
    updatedAt: Date;
}

// Définition du schéma du produit
const ProductSchema = new Schema<ProductDocument>({
    name: {
        type: String,
        required: [true, 'Le nom du produit est obligatoire'],
        trim: true,  // Nettoyage des espaces inutiles
    },
    description: {
        type: String,
        required: [true, 'La description du produit est obligatoire'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Le prix du produit est obligatoire'],
        min: 0,  // Assurer que le prix est toujours positif
    },
    pdfFile: {
        type: Buffer,  // Stocker le PDF sous forme de buffer
        required: false,  // Optionnel
    },
    profession: {
        type: Schema.Types.ObjectId,
        ref: 'Profession',  // Référence à la collection "Profession"
        required: [true, 'La profession est obligatoire'],
    },
}, {
    timestamps: true,  // Crée automatiquement `createdAt` et `updatedAt`
});

// Vérification pour éviter de redéfinir le modèle lors de multiples importations
const Product = mongoose.models.Product || model<ProductDocument>('Product', ProductSchema);

export default Product;
