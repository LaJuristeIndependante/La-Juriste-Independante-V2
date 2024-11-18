//api/products/route.ts

import { NextResponse } from "next/server";
import Product from "@/../_lib/ProductLib/model/products";
import { connectDB } from "@/../_lib/MongoLib/mongodb";
import Profession from "@lib/ProfessionLib/model/Profession";
import slugify from "slugify";


/**
 * Trouve la profession la plus proche en utilisant une logique simple
 * @param {string} target - Le slug cible
 * @param {Array} professions - La liste des professions disponibles
 * @returns {Object | null} - La profession la plus proche ou null
 */
function findClosestProfession(target: string, professions: Array<any>): any {
    const normalizedTarget = target.toLowerCase();
    let closestProfession = null;
    let shortestDistance = Infinity;

    professions.forEach((profession) => {
        const normalizedProfession = slugify(profession.name, { lower: true, strict: true });
        const distance = levenshtein(normalizedTarget, normalizedProfession);
        if (distance < shortestDistance) {
            shortestDistance = distance;
            closestProfession = profession;
        }
    });

    return closestProfession;
}

/**
 * Calcul de la distance de Levenshtein
 * @param {string} a - Première chaîne
 * @param {string} b - Deuxième chaîne
 * @returns {number} - Distance entre les deux chaînes
 */
function levenshtein(a: string, b: string): number {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) => Array(b.length + 1).fill(i ? i : 0));
    for (let j = 1; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    return matrix[a.length][b.length];
}

// GET: Récupérer tous les produits ou filtrer par profession
export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const professionFilter = searchParams.get("profession");

        let products;

        if (professionFilter) {
            const allProfessions = await Profession.find();
            if (!allProfessions || allProfessions.length === 0) {
                return NextResponse.json({ message: "Aucune profession trouvée" }, { status: 404 });
            }

            const closestProfession = findClosestProfession(professionFilter, allProfessions);
            if (!closestProfession) {
                return NextResponse.json(
                    { message: `Aucune profession proche trouvée pour : ${professionFilter}` },
                    { status: 404 }
                );
            }

            products = await Product.find({ profession: closestProfession._id });
        } else {
            products = await Product.find();
        }

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
