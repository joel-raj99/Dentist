"use server";
import ConnectDB from '../../../../utils/mongodb';
import Admin from '../../../../models/AdminModel';
import bcrypt from 'bcryptjs';
import { sendemail } from '../../../../utils/sendmail';

export async function POST(req) {
  try {
    // Parse the request body as JSON
    const { name, email } = await req.json();

    // Connect to the database
    await ConnectDB();

    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return new Response(
        JSON.stringify({ message: 'Admin already exists' }),
        { status: 400 }
      );
    }

    // Generate random password
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });
    await admin.save();

    // Send email with password
    const emailSent = await sendemail(email, password);
    if (!emailSent) {
      return new Response(
        JSON.stringify({ message: 'Error sending email' }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Admin created and email sent' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during admin creation:', error);
    return new Response(
      JSON.stringify({ message: 'admin does not created' }),
      { status: 500 }
    );
  }
}
