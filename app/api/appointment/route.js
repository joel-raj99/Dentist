"use server"
import AppointmentModel from '../../../models/AppointmentModels'
import { NextResponse } from "next/server";
import connectDB from '../../../utils/mongodb';

// GET all appointments with pagination
export async function GET(req) {
    try {
        await connectDB();
        
        // Extract page and limit from query parameters
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const skip = (page - 1) * limit;
        
        const appointmentData = await AppointmentModel.find({})
            .skip(skip)
            .limit(limit);
        
        const totalDocuments = await AppointmentModel.countDocuments();
        const totalPages = Math.ceil(totalDocuments / limit);

        return NextResponse.json({ 
            data: appointmentData,
            currentPage: page,
            totalPages: totalPages,
            totalDocuments: totalDocuments,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// POST a new appointment
export async function POST(req) {
    try {
        await connectDB();
        const requestData = await req.json();
        const existingAppointment = await AppointmentModel.findOne({ name: requestData.name });
        
        if (existingAppointment) {
            return NextResponse.json({ message: "Appointment already exists" }, { status: 409 });
        }
        
        const appointmentData = await AppointmentModel.create(requestData);
        return NextResponse.json({ message: "Appointment added successfully", appointmentData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

//delete appiontment
export async function DELETE(request) {
    try {
        await connectDB();
        
        // Assuming you're getting the ID from the request's URL parameters or body
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: "Appointment ID is required" }, { status: 400 });
        }

        const appointmentData = await AppointmentModel.deleteOne({ _id: id });

        if (appointmentData.deletedCount === 0) {
            return NextResponse.json({ message: "No appointment found with the provided ID" }, { status: 404 });
        }

        return NextResponse.json({ message: "Appointment deleted successfully", appointmentData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}