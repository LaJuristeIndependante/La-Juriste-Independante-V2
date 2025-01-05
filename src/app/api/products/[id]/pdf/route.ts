// pages/api/products/[id]/pdf/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/../_lib/MongoLib/mongodb';
import Product from '@/../_lib/ProductLib/model/products';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    await connectDB();

    try {
        const product = await Product.findById(params.id);

        if (!product || !product.pdfFile) {
            return new NextResponse('Fichier PDF non trouvé', { status: 404 });
        }

        return new NextResponse(product.pdfFile, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${product.name}.pdf"`,
            },
        });
    } catch (error) {
        console.error('Erreur lors de la récupération du PDF :', error);
        return new NextResponse('Erreur serveur lors de la récupération du PDF', { status: 500 });
    }
}

