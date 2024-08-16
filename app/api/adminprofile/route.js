// "use server";
// import ConnectDB from "../../../utils/mongodb";
// import AdminProfile from "../../../models/AdminProfileModel";
// import { NextResponse } from "next/server";
// import cloudinary from "cloudinary";

// // Configure Cloudinary
// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(req, res) {
//     try {
//         await ConnectDB();

//         // Parse JSON request body
//         const body = await req.json();

//         // Validate input data
//         if (!body.email || !body.name || !body.Qualification || !body.phone || !body.age || !body.gender || !body.dateofbirth || !body.address || !body.profile || !body.city || !body.state || !body.image) {
//             return new NextResponse("Invalid request data", { status: 400 });
//         }

//         // Check if email already exists in the database
//         const existingAdminProfile = await AdminProfile.findOne({ email: body.email });
//         if (existingAdminProfile) {
//             return new NextResponse("Email already exists", { status: 409 });
//         }

//         // Upload image to Cloudinary
//         const uploadResult = await cloudinary.v2.uploader.upload(body.image, {
//             folder: "admin_profiles", // Optional: specify a folder in Cloudinary
//         });

//         // Create a new admin profile document
//         const newAdminProfile = new AdminProfile({
//             name: body.name,
//             email: body.email,
//             Qualification: body.Qualification,
//             phone: body.phone,
//             age: body.age,
//             gender: body.gender,
//             dateofbirth: body.dateofbirth,
//             address: body.address,
//             profile: body.profile,
//             city: body.city,
//             state: body.state,
//             experienceList: body.experienceList,
//             imageUrl: uploadResult.secure_url, // Save Cloudinary image URL
//         });

//         // Save the new admin profile document to the database
//         await newAdminProfile.save()
//             .then(() => {
//                 return new NextResponse(JSON.stringify({ message: "Admin profile created successfully" }), { status: 201 });
//             })
//             .catch((error) => {
//                 console.error("Error creating admin profile:", error);
//                 return new NextResponse(JSON.stringify({ message: "Failed to create admin profile" }), { status: 500 });
//             });

//     } catch (error) {
//         console.error("Server error:", error);
//         return new NextResponse(JSON.stringify({ message: "Server error" }), { status: 500 });
//     }
// }


"use server";
import ConnectDB from "../../../utils/mongodb";
import AdminProfile from "../../../models/AdminProfileModel";
import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await ConnectDB();

    // Use formidable to parse the form data
    const form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    
    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Form parsing error:", err);
          return reject(new NextResponse("Server error", { status: 500 }));
        }

        try {
          const data = JSON.parse(fields.data[0]);

          // Validate form data
          if (!data.name || !data.email) {
            return resolve(new NextResponse("Invalid request data", { status: 400 }));
          }

          // Handle profile image upload
          let imageUrl = null;
          if (files.profileImage && files.profileImage[0]) {
            const filePath = files.profileImage[0].filepath;
            const uploadResult = await cloudinary.v2.uploader.upload(filePath, {
              folder: "admin_profiles",
            });
            imageUrl = uploadResult.secure_url;
            fs.unlinkSync(filePath); // Clean up the uploaded file
          }

          // Create a new admin profile document
          const newAdminProfile = new AdminProfile({
            ...data,
            profile: imageUrl,
          });

          // Save the new admin profile document to the database
          await newAdminProfile.save();

          resolve(new NextResponse(JSON.stringify({ message: "Admin profile created successfully" }), { status: 201 }));
        } catch (error) {
          console.error("Server error:", error);
          resolve(new NextResponse(JSON.stringify({ message: "Server error" }), { status: 500 }));
        }
      });
    });

  } catch (error) {
    console.error("Server error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
