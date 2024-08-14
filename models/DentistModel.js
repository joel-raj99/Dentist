
import mongoose from 'mongoose';

const DentistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  Qualification: { type: String, required: true },
  experience: { type: String, required: true },
  treatment: { type: String, required: true },
  profileImage: { type: String },
  educationList: [{
    school: { type: String, required: true },
    years: { type: String, required: true },
    Qualification: { type: String, required: true }
  }],
  dentistid: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'dentist' },
},{
  timestamps: true
});

const DentistModel = mongoose.models.Dentist || mongoose.model('Dentist', DentistSchema);

export default DentistModel;
