// "use server";

// import connectDB from '../../../utils/mongodb';
// import DoctorModel from '../../../models/DentistModel';
// import hashPassword from '../../../utils/hashPassword';
// import sendEmail from '../../../utils/sendEmail';

// // Connect to MongoDB
// await connectDB();

// // Generate a new doctor ID
// const generateDoctorId = async () => {
//   const lastDoctor = await DoctorModel.findOne().sort({ doctorid: -1 });

//   // Ensure lastDoctor is not undefined
//   if (lastDoctor && lastDoctor.doctorid) {
//     const lastId = parseInt(lastDoctor.doctorid.split(' ')[1], 10);
//     const newId = lastId + 1;
//     return `DR ${String(newId).padStart(3, '0')}`;
//   } else {
//     // If no lastDoctor is found, start with the initial ID
//     return 'DR 100';
//   }
// };

// export async function POST(req) {
//   try {
//     const requestData = await req.json();
    
//     // Check if email already exists
//     const existingUser = await DoctorModel.findOne({ email: requestData.email });
//     if (existingUser) {
//       return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
//     }
    
//     // Generate new doctor ID and password
//     const doctorId = await generateDoctorId();
//     const password = Math.random().toString(36).slice(-8); // Generate a random password
//     const hashedPassword = await hashPassword(password);

//     // Create new doctor record
//     const newDoctor = {
//       ...requestData,
//       doctorid: doctorId,
//       password: hashedPassword,
//     };
    
//     const doctordata = await DoctorModel.create(newDoctor);

//     // Send email with doctor ID, email, password, and doctor name
//     await sendEmail(doctordata.email, doctordata.doctorid, password, doctordata.name);
    
//     return new Response(JSON.stringify(doctordata), { status: 201 });
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     return new Response(JSON.stringify({ message: error.message }), { status: 500 });
//   }
// }



"use server";

import connectDB from '../../../utils/mongodb';
import DoctorModel from '../../../models/DentistModel';
import hashPassword from '../../../utils/hashPassword';
import sendEmail from '../../../utils/sendEmail';

// Connect to MongoDB
await connectDB();

// Generate a new doctor ID
const generateDoctorId = async () => {
  const lastDoctor = await DoctorModel.findOne().sort({ doctorid: -1 });

  // Ensure lastDoctor is not undefined
  if (lastDoctor && lastDoctor.doctorid) {
    const lastId = parseInt(lastDoctor.doctorid.split(' ')[1], 10);
    const newId = lastId + 1;
    return `DR ${String(newId).padStart(3, '0')}`;
  } else {
    // If no lastDoctor is found, start with the initial ID
    return 'DR 100';
  }
};

export async function POST(req) {
  try {
    const requestData = await req.json();
    
    // Check if email already exists
    const existingUser = await DoctorModel.findOne({ email: requestData.email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
    }
    
    // Generate new doctor ID and password
    const doctorId = await generateDoctorId();
    const password = Math.random().toString(36).slice(-8); // Generate a random password
    const hashedPassword = await hashPassword(password);

    // Create new doctor record
    const newDoctor = {
      ...requestData,
      doctorid: doctorId,
      password: hashedPassword,
    };
    
    const doctordata = await DoctorModel.create(newDoctor);

    // Send email with doctor ID, email, password, and doctor name
    await sendEmail(doctordata.email, doctordata.doctorid, password, doctordata.name);
    
    return new Response(JSON.stringify(doctordata), { status: 201 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const doctorId = url.searchParams.get('doctorid');

    if (doctorId) {
      // Fetch a specific doctor by ID
      const doctor = await DoctorModel.findOne({ doctorid: doctorId });
      if (doctor) {
        return new Response(JSON.stringify(doctor), { status: 200 });
      } else {
        return new Response(JSON.stringify({ message: "Doctor not found" }), { status: 404 });
      }
    } else {
      // Fetch all doctors
      const doctors = await DoctorModel.find();
      return new Response(JSON.stringify(doctors), { status: 200 });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
