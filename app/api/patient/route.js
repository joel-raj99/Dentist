"use server"
import connectDB from"../../../utils/mongodb";
import PatientModel from"../../../models/Patientmodel";
import { NextResponse } from "next/server";




// GET all patient
export async function GET() {
    try {
      await connectDB();
      const patientdata = await  PatientModel.find({});
      return new Response(JSON.stringify(patientdata), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
  }
  
// POST a new patient
export async function POST(req) {
  try {
    await connectDB();
    const requestData = await req.json();
    const existingUser = await PatientModel.findOne({ email: requestData.email });
    
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }
    
    const patientData = await PatientModel.create(requestData);
    return NextResponse.json({ message: "Patient added successfully", patientData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export  async function PATCH (req, res) {
  const patientId=req.params.id;
  const updates =req.body;
  try {
    const patient = await PatientModel.findByIdAndUpdate(patientId, updates, { new: true });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient' });
  }
}

