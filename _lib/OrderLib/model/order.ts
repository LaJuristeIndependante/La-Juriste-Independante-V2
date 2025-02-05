import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
    userId: string | null;
    name?: string;
    email?: string;
    phone?: string;
    address?: {
        line1?: string;
        line2?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    };
    paymentId?: string;
    amount: number;
    items: Array<{
        productId: string;
        name: string;
        price: number;
        quantity: number;
        pdfFile: Buffer;
    }>;
    status: 'pending' | 'paid' ;
    createdAt: Date;
}

const orderSchema: Schema = new Schema({
    userId: { type: String, default: null },
    name: { type: String, required: false },  // Rendre le champ optionnel
    email: { type: String, required: false }, // Rendre le champ optionnel
    phone: { type: String, required: false },  // Rendre le champ optionnel
    address: {
        line1: { type: String, required: false },  // Rendre le champ optionnel
        line2: { type: String, required: false },  // Rendre le champ optionnel
        city: { type: String, required: false },   // Rendre le champ optionnel
        postalCode: { type: String, required: false }, // Rendre le champ optionnel
        country: { type: String, required: false },    // Rendre le champ optionnel
    },
    paymentId: { type: String, required: false }, // Rendre le champ optionnel
    amount: { type: Number, required: true },
    items: [
        {
            productId: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            pdfFile: {type: Buffer, required: false,},
        },
    ],
    status: { type: String, default: 'pending', enum: ['pending', 'paid'] },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export default Order;
