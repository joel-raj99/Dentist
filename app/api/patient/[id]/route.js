"use server"
import connectDB from '../../../../utils/mongodb';
import PatientModel from '../../../../models/Patientmodel'; // Adjust the path based on your file structure

// Named export for PATCH request
export async function PATCH(req, { params }) {
  const { id: patientid } = params;

  await connectDB(); // Connect to MongoDB

  try {
    const updates = await req.json(); // Assuming you're using Fetch API in Next.js
    const patient = await PatientModel.findOneAndUpdate({ patientid }, updates, { new: true });

    if (!patient) {
      return new Response(JSON.stringify({ message: 'Patient not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(patient), { status: 200 });
  } catch (error) {
    console.error('Error updating patient:', error);
    return new Response(JSON.stringify({ message: 'Error updating patient' }), { status: 500 });
  }
}
