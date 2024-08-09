import { Schema, models, model } from 'mongoose';

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, default: 'admin' },
}, {
  timestamps: true
});

const AdminModel = models.Admin || model('Admin', adminSchema);

export default AdminModel;
