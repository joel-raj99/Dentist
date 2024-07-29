// models/DoctorModel.js
import { Schema, models, model } from 'mongoose';

const doctorSchema = new Schema({
  doctorid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile: {
    type: String, // Assuming you store the file path as a string
    required: true
  },
  treatment: {
    type: String,
    required: true,
    enum: [
      "Dental-Extraction", "Root-Canal-Therapy", "Endodontic-Therapy", 
      "Root-End-Surgery", "Tooth-Filling", "Dental-Bonding", "Tooth-Polishing",
      "Tooth-Bleaching", "Teeth-Cleaning", "Fluoride-Treatment", "Braces", 
      "Invisalign", "Dental", "Implants", "Dentures", "Gum-Surgery", "Crowns"
    ]
  },
  school: {
    type: String,
    required: true
  },
  years: {
    type: Number,
    required: true
  },
  qualifications: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const DoctorModel = models.doctor || model('doctor', doctorSchema);

export default DoctorModel;
