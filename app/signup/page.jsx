"use client";
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('../api/(auth)/signup', { name, email });
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Clear input fields after successful submission
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error(error.response?.data?.message || 'An unexpected error occurred', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <Image
            src="/Images1.png"
            alt="First image"
            width={200}
            height={80}
            quality={100}
            className="image1"
          />
          <Image
            src="/dentist-with-smile (2) 1.png"
            alt="Second image"
            width={700}
            height={650}
            quality={100}
            className="image2"
          />
        </div>
        <div className="col-span-6">
          <div className="w-4/5 mt-8 ml-18 card bg-base-100 h-3/5">
            <div className="card-body">
              <h1 className="text-4xl font-semibold text-center uppercase">Signup</h1>
              <p className="text-center">Sign up into your account</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-start ml-20 gap-y-3">
              <label htmlFor="name" className="text-sm font-medium capitalize cursor-pointer">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
              />
              <label htmlFor="email" className="text-sm font-medium capitalize cursor-pointer">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
              />
              <button type="submit" className="w-full mt-2 btn btn-primary">Sign up</button>
              <p className="mt-2 text-sm text-gray-500">
                Already have an account? <a className="text-black" href="/login">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
