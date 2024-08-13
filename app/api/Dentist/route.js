"use server";

import connectDB from '../../../utils/mongodb';
import DentistModel from '../../../models/DentistModel';
import hashPassword from '../../../utils/hashPassword';
import sendEmail from '../../../utils/sendEmail';

await connectDB();

// Function to generate a new Dentist ID
const generatedentistid = async () => {
  const lastDentist = await DentistModel.findOne().sort({ dentistid: -1 });

  if (lastDentist && lastDentist.dentistid) {
    const lastId = parseInt(lastDentist.dentistid.split(' ')[1], 10);
    const newId = lastId + 1;
    return `DR ${String(newId).padStart(3, '0')}`;
  } else {
    return 'DR 100';
  }
};

// Function to validate form data
const validateFormData = (data) => {
  const requiredFields = ['name', 'email', 'phone', 'Qualification', 'experience', 'treatment', 'educationList']; // Added required fields

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
};

// POST handler
export async function POST(req) {
  try {
    const requestData = await req.json();

    // Validate required fields
    validateFormData(requestData);

    const existingUser = await DentistModel.findOne({ email: requestData.email, name: requestData.name });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
    }

    const dentistid = await generatedentistid();
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await hashPassword(password);

    const newDentist = {
      ...requestData,
      dentistid: dentistid,
      password: hashedPassword,
      profileImage: requestData.profileImage || null, // Handle optional field
    };

    const dentistdata = await DentistModel.create(newDentist);
    await sendEmail(dentistdata.email, dentistdata.dentistid, password, dentistdata.name);

    return new Response(JSON.stringify(dentistdata), { status: 201 });
  } catch (error) {
    console.error('Processing error:', error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
