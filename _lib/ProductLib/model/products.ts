import mongoose, { Schema, model, Document } from "mongoose";
import { IProfession } from '@lib/ProfessionLib/model/Profession'; // Import the IProfession interface

interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    image: Buffer;
    profession: IProfession["_id"];
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
    image: {
        type: Buffer,  // Utilisation du type Buffer pour stocker les données binaires
        required: true
    },
    profession: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profession',  // Reference to the Profession model
        required: false // Set this to true if every product must have a profession
    }
}, {
    timestamps: true,
});

const Product = mongoose.models?.Product || model<ProductDocument>('Product', ProductSchema);
export default Product;
