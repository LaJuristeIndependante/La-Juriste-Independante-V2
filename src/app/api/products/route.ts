//api/route.ts

import { NextResponse } from "next/server";
import Product from "@/../_lib/ProductLib/model/products";
import { connectDB } from "@/../_lib/MongoLib/mongodb";
import Profession from "@lib/ProfessionLib/model/Profession";

// GET: Récupérer tous les produits
export async function GET() {
    try {
        await connectDB();
        const products = await Product.find();
        if (!products || products.length === 0) {
            return NextResponse.json({ message: "Aucun produit trouvé" }, { status: 404 });
        }
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();

        const formData = await req.formData();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = parseFloat(formData.get("price") as string);
        const professionId = formData.get("profession") as string;
        const pdfFile = formData.get("pdfFile") as File | null;

        let profession;
        if (professionId) {
            profession = await Profession.findById(professionId);
            if (!profession) {
                return NextResponse.json({ error: "Invalid profession ID" }, { status: 400 });
            }
        }

        const productData: any = {
            name,
            description,
            price,
            profession: profession ? profession._id : undefined
        };

        if (pdfFile) {
            const pdfBuffer = await pdfFile.arrayBuffer();
            productData.pdfFile = Buffer.from(pdfBuffer);
        }

        const product = new Product(productData);
        await product.save();

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Error in POST API:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
