import mongoose, { Schema, model, Document } from 'mongoose';

interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    pdfFile?: Buffer;
    profession: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<ProductDocument>(
    {
        name: {
            type: String,
            required: [true, 'Le nom du produit est obligatoire'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'La description du produit est obligatoire'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Le prix du produit est obligatoire'],
            min: 0,
        },
        pdfFile: {
            type: Buffer,
            required: false,
        },
        profession: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profession',
            required: [true, 'La profession est obligatoire'],
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.models.Product || model<ProductDocument>('Product', ProductSchema);

export default Product;
