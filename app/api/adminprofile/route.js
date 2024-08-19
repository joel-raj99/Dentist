// "use server";

// import connectDB from '../../../utils/mongodb';
// import AdminProfileModel from '../../../models/AdminProfileModel';
// import multer from 'multer';
// import { NextResponse } from 'next/server';

// // Connect to MongoDB
// await connectDB();

// // Configure multer for file upload
// const upload = multer({ dest: 'uploads/' });

// export async function POST(req) {
//   // Use a promise to wrap the multer upload middleware
//   await new Promise((resolve, reject) => {
//     upload.single('profileImage')(req, {}, (err) => {
//       if (err) reject(err);
//       else resolve();
//     });
//   });

//   try {
//     const { file, body } = req;
//     if (!file) {
//       return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
//     }

//     const experienceList = JSON.parse(body.experienceList);

//     const adminProfile = new AdminProfileModel({
//       name: body.name,
//       email: body.email,
//       Qualification: body.Qualification,
//       experience: body.experience,
//       gender: body.gender,
//       age: body.age,
//       dateofbirth: body.dateofbirth,
//       city: body.city,
//       profileImage: `/uploads/${file.filename}`, // Path to the uploaded image
//       phoneNumber: body.phoneNumber,
//       address: body.address,
//       secondaryNumber: body.secondaryNumber,
//       state: body.state,
//       experienceList, // Assign parsed array
//     });

//     await adminProfile.save();

//     return NextResponse.json({ message: 'Admin profile created successfully', data: adminProfile }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Failed to create admin profile', error: error.message }, { status: 500 });
//   }
// }


"use server";

import connectDB from '../../../utils/mongodb';
import AdminProfileModel from '../../../models/AdminProfileModel';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Connect to MongoDB
await connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('profileImage');

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Save the file to a directory
    const buffer = await file.arrayBuffer();
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), 'uploads', fileName);
    
    await fs.writeFile(filePath, Buffer.from(buffer));

    // Extract other fields from formData
    const name = formData.get('name');
    const email = formData.get('email');
    const Qualification = formData.get('Qualification');
    const experience = formData.get('experience');
    const gender = formData.get('gender');
    const age = formData.get('age');
    const dateofbirth = formData.get('dateofbirth');
    const city = formData.get('city');
    const phoneNumber = formData.get('phoneNumber');
    const address = formData.get('address');
    const secondaryNumber = formData.get('secondaryNumber');
    const state = formData.get('state');
    const experienceList = JSON.parse(formData.get('experienceList'));

    const adminProfile = new AdminProfileModel({
      name,
      email,
      Qualification,
      experience,
      gender,
      age,
      dateofbirth,
      city,
      profileImage: `/uploads/${fileName}`, // Path to the uploaded image
      phoneNumber,
      address,
      secondaryNumber,
      state,
      experienceList, // Assign parsed array
    });

    await adminProfile.save();

    return NextResponse.json({ message: 'Admin profile created successfully', data: adminProfile }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create admin profile', error: error.message }, { status: 500 });
  }
}
