"use server"
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "" ; // Use an environment variable in production

export async function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: process.env.JWT_DAY });
}

export async function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
