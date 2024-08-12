"use server";

import connectDB from '../../../utils/mongodb';
import DentistModel from '../../../models/DentistModel';
import hashPassword from '../../../utils/hashPassword';
import sendEmail from '../../../utils/sendEmail';
import upload from '../../../utils/upload'

// Connect to MongoDB
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
  // Validate main fields
  const requiredFields = ['name', 'email', 'number', 'Qualification', 'experience', 'treatment', 'profile'];
  for (let field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Field ${field} is required`);
    }
  }

  // Validate educationList fields
  if (data.educationList && data.educationList.length > 0) {
    data.educationList.forEach((edu, index) => {
      const requiredEduFields = ['school', 'year', 'Qualification'];
      for (let field of requiredEduFields) {
        if (!edu[field]) {
          throw new Error(`Education field ${field} is required at index ${index}`);
        }
      }
    });
  } else {
    throw new Error('Education list must contain at least one entry');
  }
};

// POST handler
export async function POST(req) {
  return new Promise((resolve, reject) => {
    upload.single('profileImage')(req, {}, async (err) => {
      if (err) {
        console.error('Upload error:', err);
        return resolve(new Response(JSON.stringify({ message: 'File upload error' }), { status: 500 }));
      }

      try {
        const requestData = req.body.data ? JSON.parse(req.body.data) : {};

        // Validate required fields
        validateFormData(requestData);

        const existingUser = await DentistModel.findOne({ email: requestData.email });
        if (existingUser) {
          return resolve(new Response(JSON.stringify({ message: "User already exists" }), { status: 409 }));
        }

        const dentistid = await generatedentistid();
        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = await hashPassword(password);

        const newDentist = {
          ...requestData,
          dentistid: dentistid,
          password: hashedPassword,
          profileImage: req.file ? `/uploads/${req.file.filename}` : null,
        };

        const dentistdata = await DentistModel.create(newDentist);
        await sendEmail(dentistdata.email, dentistdata.dentistid, password, dentistdata.name);

        return resolve(new Response(JSON.stringify(dentistdata), { status: 201 }));
      } catch (error) {
        console.error('Processing error:', error);
        return resolve(new Response(JSON.stringify({ message: error.message }), { status: 500 }));
      }
    });
  });
}

// GET handler
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const dentistid = url.searchParams.get('dentistid');

    if (dentistid) {
      // Fetch a specific Dentist by ID
      const Dentist = await DentistModel.findOne({ dentistid: dentistid });
      if (Dentist) {
        return new Response(JSON.stringify(Dentist), { status: 200 });
      } else {
        return new Response(JSON.stringify({ message: "Dentist not found" }), { status: 404 });
      }
    } else {
      // Fetch all Dentists
      const Dentists = await DentistModel.find();
      return new Response(JSON.stringify(Dentists), { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}

//delete the dentist
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const dentistid = url.searchParams.get('dentistid');
    if (dentistid) {
      const Dentist = await DentistModel.findOne({ dentistid: dentistid });
      if (Dentist) {
        await DentistModel.deleteOne({ dentistid: dentistid });
        return new Response(JSON.stringify({ message: "Dentist deleted successfully" }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ message: "Dentist not found" }), { status: 404 });
      }
    } else {
      return new Response(JSON.stringify({ message: "Dentist ID is required" }), { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}


