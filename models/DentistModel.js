import { Schema, models, model } from 'mongoose';

const DentistSchema = new Schema({
  dentistid: {
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
    type: String, // Changed to string to handle phone numbers more flexibly
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
  password: {
    type: String,
    required: true,
  },
  role: { type: String, default: 'dentist' },
}, {
  timestamps: true
});

const DentistModel = models.Dentist || model('Dentist', DentistSchema);

export default DentistModel;
