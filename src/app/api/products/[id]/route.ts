import { NextResponse } from 'next/server';
import { connectDB } from '@/../_lib/MongoLib/mongodb';
import Product from '@lib/ProductLib/model/products';

// GET: Récupérer un produit par son ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    await connectDB();

    try {
        const product = await Product.findById(params.id);
        if (!product) {
            return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        return NextResponse.json({ error: 'Erreur lors de la récupération du produit' }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    await connectDB();

    try {
        const contentType = request.headers.get('content-type') || '';

        if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            const data: any = {};

            // Extraire les champs du FormData
            formData.forEach((value, key) => {
                if (key !== 'pdfFile') {  // On ne traite pas le fichier ici
                    data[key] = value;
                }
            });

            // Traiter le fichier PDF
            if (formData.has('pdfFile')) {
                const file = formData.get('pdfFile') as File;
                const arrayBuffer = await file.arrayBuffer();  // Convertir le fichier en ArrayBuffer
                data.pdfFile = Buffer.from(arrayBuffer);  // Convertir en Buffer
            }

            // Mettre à jour le produit
            const product = await Product.findByIdAndUpdate(params.id, data, { new: true, runValidators: true });
            if (!product) {
                return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
            }
            return NextResponse.json(product);
        } else {
            return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error);
        return NextResponse.json({ error: 'Erreur lors de la mise à jour du produit' }, { status: 500 });
    }
}

// DELETE: Supprimer un produit par son ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const product = await Product.findByIdAndDelete(params.id);

        if (!product) {
            return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
        return NextResponse.json({ error: 'Erreur lors de la suppression du produit' }, { status: 500 });
    }
}
