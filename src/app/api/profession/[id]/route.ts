import { NextResponse } from 'next/server';
import { connectDB } from '@/../_lib/MongoLib/mongodb';
import Profession from '@lib/ProfessionLib/model/Profession';

// GET: Fetch profession by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const profession = await Profession.findById(params.id);

        if (!profession) {
            return NextResponse.json({ error: 'Profession not found' }, { status: 404 });
        }

        return NextResponse.json(profession);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch profession' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const body = await request.json(); // Parse the JSON body
        const updatedProfession = await Profession.findByIdAndUpdate(params.id, body, {
            new: true, // Return the updated document
            runValidators: true, // Run validation on the updated fields
        });

        if (!updatedProfession) {
            return NextResponse.json({ error: 'Profession not found' }, { status: 404 });
        }

        return NextResponse.json(updatedProfession);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update profession' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const deletedProfession = await Profession.findByIdAndDelete(params.id);

        if (!deletedProfession) {
            return NextResponse.json({ error: 'Profession not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Profession deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete profession' }, { status: 500 });
    }
}