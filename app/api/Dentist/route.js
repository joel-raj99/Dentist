// "use server";

// import connectDB from '../../../utils/mongodb';
// import DentistModel from '../../../models/DentistModel';
// import hashPassword from '../../../utils/hashPassword';
// import sendEmail from '../../../utils/sendEmail';

// // Connect to MongoDB
// await connectDB();

// // Generate a new Dentist ID
// const generatedentistid = async () => {
//   const lastDentist = await DentistModel.findOne().sort({ dentistid: -1 });

//   // Ensure lastDentist is not undefined
//   if (lastDentist && lastDentist.dentistid) {
//     const lastId = parseInt(lastDentist.dentistid.split(' ')[1], 10);
//     const newId = lastId + 1;
//     return `DR ${String(newId).padStart(3, '0')}`;
//   } else {
//     // If no lastDentist is found, start with the initial ID
//     return 'DR 100';
//   }
// };

// export async function POST(req) {
//   try {
//     const requestData = await req.json();
    
//     // Check if email already exists
//     const existingUser = await DentistModel.findOne({ email: requestData.email });
//     if (existingUser) {
//       return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
//     }
    
//     // Generate new Dentist ID and password
//     const dentistid = await generatedentistid();
//     const password = Math.random().toString(36).slice(-8); // Generate a random password
//     const hashedPassword = await hashPassword(password);

//     // Create new Dentist record
//     const newDentist = {
//       ...requestData,
//       dentistid: dentistid,
//       password: hashedPassword,
//     };
    
//     const dentistdata = await DentistModel.create(newDentist);

//     // Send email with Dentist ID, email, password, and Dentist name
//     await sendEmail(dentistdata.email, dentistdata.dentistid, password, dentistdata.name);
    
//     return new Response(JSON.stringify(dentistdata), { status: 201 });
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     return new Response(JSON.stringify({ message: error.message }), { status: 500 });
//   }
// }



"use server";

import connectDB from '../../../utils/mongodb';
import DentistModel from '../../../models/DentistModel';
import hashPassword from '../../../utils/hashPassword';
import sendEmail from '../../../utils/sendEmail';

// Connect to MongoDB
await connectDB();

// Generate a new Dentist ID
const generatedentistid = async () => {
  const lastDentist = await DentistModel.findOne().sort({ dentistid: -1 });

  // Ensure lastDentist is not undefined
  if (lastDentist && lastDentist.dentistid) {
    const lastId = parseInt(lastDentist.dentistid.split(' ')[1], 10);
    const newId = lastId + 1;
    return `DR ${String(newId).padStart(3, '0')}`;
  } else {
    // If no lastDentist is found, start with the initial ID
    return 'DR 100';
  }
};

export async function POST(req) {
  try {
    const requestData = await req.json();
    
    // Check if email already exists
    const existingUser = await DentistModel.findOne({ email: requestData.email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
    }
    
    // Generate new Dentist ID and password
    const dentistid = await generatedentistid();
    const password = Math.random().toString(36).slice(-8); // Generate a random password
    const hashedPassword = await hashPassword(password);

    // Create new Dentist record
    const newDentist = {
      ...requestData,
      dentistid: dentistid,
      password: hashedPassword,
    };
    
    const dentistdata = await DentistModel.create(newDentist);

    // Send email with Dentist ID, email, password, and Dentist name
    await sendEmail(dentistdata.email, dentistdata.dentistid, password, dentistdata.name);
    
    return new Response(JSON.stringify(dentistdata), { status: 201 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}

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
    console.error(error); // Log the error for debugging
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
