import { NextResponse } from "next/server";
import { connectDB } from "@/../_lib/MongoLib/mongodb";
import Profession from "@lib/ProfessionLib/model/Profession";

// GET: Récupérer tous les produits
export async function GET() {
    await connectDB();
    const profession = await Profession.find();
    return NextResponse.json(profession);
}