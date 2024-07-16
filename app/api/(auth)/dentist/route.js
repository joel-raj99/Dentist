
import connectDB from"../../../../utils/mongodb";
import DoctorModel from"../../../../models/DentistModel"


// GET all clinics
export async function GET() {
    try {
      await connectDB();
      const doctordata = await  DoctorModel .find({});
      return new Response(JSON.stringify(doctordata), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
  }
  
  // POST a new clinic
  export async function POST(req) {
    try {
      await connectDB();
      const requestData = await req.json();
      const existingUser = await  DoctorModel .findOne({ email: requestData.email });
      if (existingUser) {
        return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
      }
      const doctordata = await  DoctorModel .create(requestData);
      return new Response(JSON.stringify(doctordata), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
  }
  