"use server";

import nextConnect from 'next-connect';
import multer from '../../../utils/multer';
import connectDB from "../../../utils/mongodb";
import ClinicModel from "../../../models/ClinicModel";

// GET all clinics
export async function GET(req, res) {
  try {
    await connectDB();
    const clinicdata = await ClinicModel.find({});
    res.status(200).json(clinicdata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const handler = nextConnect();

handler.use(multer.fields([
  { name: 'clinicLogo', maxCount: 1 },
  { name: 'additionalLogo', maxCount: 1 }
]));

handler.post(async (req, res) => {
  await connectDB();
  const {
    name, year, location, website, email, phone1, phone2,
    treatment, procedure, diagnosis, treatmentPrice,
    procedurePrice, diagnosisPrice, introduction
  } = req.body;

  const clinicLogo = req.files['clinicLogo'] ? req.files['clinicLogo'][0].path : '';
  const additionalLogo = req.files['additionalLogo'] ? req.files['additionalLogo'][0].path : '';

  const newClinic = new ClinicModel({
    name, year, clinicLogo, additionalLogo, location, website,
    email, phone1, phone2, treatment, procedure, diagnosis,
    treatmentPrice, procedurePrice, diagnosisPrice, introduction
  });

  try {
    await newClinic.save();
    res.status(201).json({ success: true, data: newClinic });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default handler;
