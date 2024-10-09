// app/api/professions/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/../_lib/MongoLib/mongodb';
import Profession from '@lib/ProfessionLib/model/Profession';

// GET: Retrieve all professions
export async function GET() {
    try {
        await connectDB(); // Connect to MongoDB
        const professions = await Profession.find(); // Fetch all professions
        return NextResponse.json(professions);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch professions' }, { status: 500 });
    }
}

// POST: Add a new profession
export async function POST(request: Request) {
    try {
        await connectDB(); // Connect to MongoDB
        const body = await request.json(); // Get the request body
        const { name, description, yearsOfExperience, isActive } = body;

        const newProfession = new Profession({
            name,
            description,
            yearsOfExperience,
            isActive: isActive ?? true, // Default to true if not provided
        });

        await newProfession.save(); // Save to the database

        return NextResponse.json(newProfession, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create profession' }, { status: 500 });
    }
}