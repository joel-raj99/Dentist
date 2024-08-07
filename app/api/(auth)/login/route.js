"use server";
import ConnectDB from '../../../../utils/mongodb';
import Admin from '../../../../models/AdminModel';
import Dentist from '../../../../models/DentistModel'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { emailOrdentistid, password } = await req.json();

    await ConnectDB();
    
    let user = null;
    let role = null;

    // Check if the user is an admin
    user = await Admin.findOne({ email: emailOrdentistid });
    console.log("Admin query result:", user);
    if (user) {
      role = 'admin';
    } else {
      // Check if the user is a dentist by either email or dentistid
      user = await Dentist.findOne({
        $or: [{ email: emailOrdentistid }, { dentistid: emailOrdentistid }],
      });
      console.log("Dentist query result:", user);
      if (user) {
        role = 'dentist';
      }
    }

    if (!user) {
      console.log("User not found");
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Incorrect password");
      return new Response(JSON.stringify({ message: 'Incorrect password' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        },
      });
    }

    const payload = {
      user: {
        id: user._id,
        role: role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
}
