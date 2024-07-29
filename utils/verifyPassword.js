
"use server"
// utils/verifyPassword.js
import bcrypt from 'bcrypt';

export default async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
