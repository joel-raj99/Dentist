import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  doctorid: {
    type: String,
    unique: true,
    sparse: true
  },
  adminId: {
    type: String,
    unique: true,
    sparse: true
  }
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static method to generate adminId
userSchema.statics.generateAdminId = async function() {
  const count = await this.countDocuments({ adminId: { $exists: true } });
  const newId = `AD${String(count + 1).padStart(3, '0')}`;
  return newId <= 'AD100' ? newId : null;
};

// Method to validate login credentials
userSchema.methods.validateLogin = async function(email, id) {
  const user = await this.constructor.findOne({ email });
  if (user && (user.adminId === id || user.doctorId === id)) {
    return true;
  }
  return false;
};

// Method to generate JWT
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
  return token;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
