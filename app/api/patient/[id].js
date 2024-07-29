// pages/api/patient/[id].js

import connectDB from '../../../../utils/mongodb';
import PatientModel from '../../../models/Patient'; // Adjust the path based on your file structure

export default async function handler(req, res) {
  const { method, body, query: { id } } = req;

  await connectDB(); // Connect to MongoDB

  switch (method) {
    case 'PATCH':
      try {
        const updates = body;
        const patient = await PatientModel.findByIdAndUpdate(id, updates, { new: true });

        if (!patient) {
          return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(patient);
      } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ message: 'Error updating patient' });
      }
      break;
    default:
      res.setHeader('Allow', ['PATCH']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
