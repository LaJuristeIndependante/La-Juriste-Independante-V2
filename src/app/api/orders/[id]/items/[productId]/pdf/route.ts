import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@lib/MongoLib/mongodb';
import Order from '@lib/OrderLib/model/order';

// Définir le type pour les items de commande
interface IOrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    pdfFile: Buffer;
}

export async function GET(
    request: Request,
    { params }: { params: { id: string; productId: string } }
) {
    await connectDB();

    try {
        const { id: orderId, productId } = params;

        // Trouver la commande par son ID
        const order = await Order.findById(orderId);

        if (!order) {
            return NextResponse.json({ message: 'Commande non trouvée' }, { status: 404 });
        }

        // Trouver l'item dans les produits de la commande
        const product = order.items.find((item: IOrderItem) => item.productId === productId);

        if (!product || !product.pdfFile) {
            return NextResponse.json({ message: 'Fichier PDF non trouvé pour ce produit' }, { status: 404 });
        }

        // Envoyer le PDF
        return new NextResponse(product.pdfFile, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${product.name || 'document'}.pdf"`,
            },
        });
    } catch (error) {
        console.error('Erreur lors de la récupération du fichier PDF :', error);
        return NextResponse.json({ message: 'Erreur serveur lors de la récupération du fichier PDF' }, { status: 500 });
    }
}
