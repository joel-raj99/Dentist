// Import necessary modules and connectDB
import connectDB from "../../../../utils/mongodb";
import clinicModel from "../../../../models/ClinicModel";

// GET all clinics
export async function GET() {
  try {
    await connectDB();
    const clinicdata = await clinicModel.find({});
    return new Response(JSON.stringify(clinicdata), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}

// POST a new clinic
export async function POST(req) {
  try {
    await connectDB();
    const requestData = await req.json();
    const existingUser = await clinicModel.findOne({ email: requestData.email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
    }
    const clinicdata = await clinicModel.create(requestData);
    return new Response(JSON.stringify(clinicdata), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
