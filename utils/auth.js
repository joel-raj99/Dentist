"use server";
import User from '../models/UserModel';
import bcrypt from 'bcrypt';
import sendmail from '../utils/sendmail';
import generatePassword from 'generate-password';

// Register a new user
export async function registerUser(data) {
  const { name, email, doctorId } = data;

  // Check if the email is already in use
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email is already in use');
  }

  // Determine adminId if not a doctor
  let adminId = data.adminId || null;
  if (!doctorId) {
    adminId = await User.generateAdminId();
    if (!adminId) {
      throw new Error('Admin ID limit reached');
    }
  }

  // Generate a random password
  const password = generatePassword.generate({
    length: 10,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: true,
  });

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    doctorId,
    adminId
  });

  await newUser.save();

  await sendmail(email, adminId || doctorId, password);

  return newUser;
}

// Login a user
export async function loginUser(email, id, password) {
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    if (await user.validateLogin(email, id)) {
      const token = user.generateAuthToken();
      const role = user.adminId ? 'admin' : 'doctor';
      return { user, token, role };
    }
  }
  throw new Error('Invalid email, ID, or password');
}
