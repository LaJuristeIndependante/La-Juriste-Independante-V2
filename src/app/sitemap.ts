import { MetadataRoute } from "next";
import { connectDB } from "@lib/MongoLib/mongodb";
import Product from "@lib/ProductLib/model/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        await connectDB();
        console.log("Connexion à la base de données réussie");

        const allProducts = await Product.find();
        console.log(`Nombre de produits trouvés : ${allProducts.length}`);

        const productsEntries: MetadataRoute.Sitemap = allProducts.map(({ _id }) => ({
            url: `${process.env.NEXTAUTH_URL}/products/${_id}`,
            lastModified: new Date(),
        }));

        return [
            {
                url: `${process.env.NEXTAUTH_URL}/`,
                lastModified: new Date(),
            },
            {
                url: `${process.env.NEXTAUTH_URL}/support`,
                lastModified: new Date(),
            },
            {
                url: `${process.env.NEXTAUTH_URL}/products`,
                lastModified: new Date(),
            },
            {
                url: `${process.env.NEXTAUTH_URL}/legal-mentions`,
                lastModified: new Date(),
            },
            {
                url: `${process.env.NEXTAUTH_URL}/privacy`,
                lastModified: new Date(),
            },
            {
                url: `${process.env.NEXTAUTH_URL}/terms-of-sales`,
                lastModified: new Date(),
            },
            {
                url: `${process.env.NEXTAUTH_URL}/terms-of-uses`,
                lastModified: new Date(),
            },
            {
                url: `${process.env.NEXTAUTH_URL}/orders`,
                lastModified: new Date(),
            },
            ...productsEntries,
        ];
    } catch (error) {
        console.error("Erreur lors de la génération du sitemap :", error);
        throw new Error("Erreur interne du serveur"); // Propager l'erreur pour Next.js
    }
}
