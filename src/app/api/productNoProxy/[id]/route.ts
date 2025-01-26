import {connectDB} from "@lib/MongoLib/mongodb";
import Product from "@lib/ProductLib/model/products";
import {NextResponse} from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    await connectDB();
    try {
        const contentType = request.headers.get('content-type') || '';

        if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData();

            const data: any = {};
            formData.forEach((value, key) => {
                if (key !== 'pdfFile') {
                    data[key] = value;
                }
            });

            if (formData.has('pdfFile')) {
                const file = formData.get('pdfFile') as File;
                const arrayBuffer = await file.arrayBuffer();
                data.pdfFile = Buffer.from(arrayBuffer);
            }

            const product = await Product.findByIdAndUpdate(params.id, data, { new: true, runValidators: true });
            if (!product) {
                return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
            }

            return NextResponse.json(product);
        } else {
            return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la mise à jour du produit' }, { status: 500 });
    }
}
