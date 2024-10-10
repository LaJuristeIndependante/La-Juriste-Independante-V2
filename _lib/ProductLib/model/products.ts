import mongoose, { Schema, model, Document } from "mongoose";
import { IProfession } from '@lib/ProfessionLib/model/Profession'; // Import the IProfession interface

interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    pdfFile?: Buffer;  // Ajouter le champ pour stocker le PDF sous forme de buffer
    profession: IProfession['_id'];  // Référence à la profession
    createdAt: Date;
}

const ProductSchema = new Schema<ProductDocument>({
    name: {
        type: String,
        required: [true, "Le nom du produit est obligatoire"]
    },
    description : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    pdfFile: {  // Champ pour stocker le fichier PDF
        type: Buffer,
        required: false,  // Optionnel si un produit n'a pas de PDF
    },
    profession: {  // Référence à une profession via son ID
        type: Schema.Types.ObjectId,
        ref: 'Profession',
        required: true,  // Rendre la profession obligatoire si nécessaire
    }
}, {
    timestamps: true,
});

const Product = mongoose.models?.Product || model<ProductDocument>('Product', ProductSchema);
export default Product;
