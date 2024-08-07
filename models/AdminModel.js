import { Schema, models, model } from 'mongoose';

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // other fields...
}, {
  timestamps: true
});

const AdminModel = models.Admin || model('Admin', adminSchema);

export default AdminModel;
