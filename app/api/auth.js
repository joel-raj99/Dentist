// api/auth.js
"use server";
import connectDB from '../../utils/mongodb';
import DoctorModel from '../../models/DentistModel';
import { verifyPassword } from '../../utils/hashPassword';
import { generateToken } from '../../utils/jwt';

// Connect to MongoDB
await connectDB();

export async function POST(req) {
  try {
    const { doctorid, email, password } = await req.json();
    // Check if the doctor exists with the provided email and doctorid
    const user = await DoctorModel.findOne({ email, doctorid });

    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid doctor ID, email, or password" }), { status: 401 });
    }

    // Verify the password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: "Invalid doctor ID, email, or password" }), { status: 401 });
    }

    // Generate a token
    const token = generateToken(user);
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
