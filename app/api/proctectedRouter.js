"use server";
import connectDB from '../../../utils/mongodb';
import DoctorModel from '../../../models/DoctorModel';
import { verifyToken } from '../../../utils/jwt';

// Connect to MongoDB
await connectDB();

export async function GET(req) {
  try {
    // Retrieve and validate the token from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ message: 'Authorization header is missing' }), { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
      return new Response(JSON.stringify({ message: 'Token is missing' }), { status: 401 });
    }
    
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return new Response(JSON.stringify({ message: 'Invalid token' }), { status: 401 });
    }
    
    req.user = decoded;
    const doctordata = await DoctorModel.find({});
    return new Response(JSON.stringify(doctordata), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
