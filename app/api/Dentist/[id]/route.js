"use server"
//import { NextResponse } from 'next/server';
import connectDB from '../../../../utils/mongodb';
import DentistModel from '../../../../models/DentistModel';

export async function PATCH(req, { params }) {
    // Connect to MongoDB
    await connectDB();

    const { id } = params;
    const body = await req.json();

    if (req.method !== 'PATCH') {
        return new Response(`Method ${req.method} Not Allowed`, { status: 405 });
    }

    try {
        if (!id) {
            return new Response(JSON.stringify({ message: "Dentist ID is required" }), { status: 400 });
        }

        const updateDentist = await DentistModel.findByIdAndUpdate(id, body, { new: true });

        if (!updateDentist) {
            return new Response(JSON.stringify({ message: "Dentist not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(updateDentist), { status: 200 });
    } catch (error) {
        console.error("Error updating dentist:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), { status: 500 });
    }
}



