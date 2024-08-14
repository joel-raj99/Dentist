// pages/api/upload.js
import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Import your Mongoose model here
import Dentist from '../../models/Dentist'; // Adjust the path as needed

// Configure multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads'); // Directory to save the uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = uuidv4() + path.extname(file.originalname);
      cb(null, uniqueSuffix);
    }
  })
});

// Create a nextConnect handler
const handler = nextConnect();

handler.use(upload.single('profileImage')); // 'profileImage' is the name of the form field

handler.post(async (req, res) => {
  const { file } = req;
  const { name, email } = req.body;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Save file path and other data to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Ensure you have a valid connection string

    const dentist = new Dentist({
      name,
      email,
      profileImage: `/uploads/${file.filename}`, // Save relative path
    });

    await dentist.save();
    res.status(200).json({ message: 'File uploaded successfully', filePath: dentist.profileImage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

export default handler;
