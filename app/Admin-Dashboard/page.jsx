
"use client";
import React, { useState, useEffect } from 'react';
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import axios from 'axios';
import Example from "./Example";

// RadialProgress Component for radial progress bars
const RadialProgress = ({ targetValue }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < targetValue) {
      const timer = setTimeout(() => setProgress(progress + 1), 20);
      return () => clearTimeout(timer);
    }
  }, [progress, targetValue]);

  return (
    <div
      className="flex items-center justify-center text-white radial-progress"
      style={{ "--value": progress, "--color": "green" }}
      role="progressbar"
    >
      {progress}%
    </div>
  );
};

// AnimatedValue Component for animating numeric values
const AnimatedValue = ({ start, end, duration }) => {
  const [value, setValue] = useState(start);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setValue(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);

  return <p className="text-3xl font-bold leading-tight text-white">{value}</p>;
};

// DashboardPage Component
export default function DashboardPage() {
  const [totalDentists, setTotalDentists] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [dentistsResponse, appointmentsResponse, patientsResponse] = await Promise.all([
          axios.get('/api/Dentist'),
          axios.get('/api/appointment'),
          axios.get('/api/patient')
        ]);

        // Access the data inside the nested "data" property
        const appointmentsArray = appointmentsResponse.data.data;

        console.log('Appointments Array:', appointmentsArray);

        setTotalDentists(dentistsResponse.data.length || 0);
        setTotalAppointments(appointmentsArray.length || 0);
        setTotalPatients(patientsResponse.data.length || 0);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);
  

  return (
    <div className="flex mt-16 ml-56 mr-8">
      <div className="grid grid-cols-3 gap-12">
        <div className="bg-blue-800 rounded-lg shadow-xl card w-80 h-44">
          <div className="p-4 card-body">
            <p className="leading-tight text-white capitalize">Total Appointment</p>
            <div className="flex items-center justify-between mb-2 ml-20">
              <AnimatedValue start={0} end={totalAppointments} duration={200} />
              <RadialProgress targetValue={(totalAppointments / 2)} />
            </div>
            <div className="mt-0 mb-6 card-actions">
              <p className="mb-8 text-xs font-bold leading-tight text-white">Total appointments: {totalAppointments}</p>
             
            </div>
          </div>
        </div>

        <div className="bg-blue-800 rounded-lg shadow-xl card w-80 h-44">
          <div className="p-4 card-body">
            <p className="leading-tight text-white capitalize">Total Doctors</p>
            <div className="flex items-center justify-between mb-2 ml-20">
              <AnimatedValue start={0} end={totalDentists} duration={200} />
              <RadialProgress targetValue={(totalDentists / 2)} />
            </div>
            <div className="mt-0 mb-6 card-actions">
              <p className="mb-8 text-xs font-bold leading-tight text-white">Total Doctors: {totalDentists}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-800 rounded-lg shadow-xl card w-80 h-44">
          <div className="p-4 card-body">
            <p className="leading-tight text-white capitalize">Total Patients</p>
            <div className="flex items-center justify-between mb-2 ml-20">
              <AnimatedValue start={0} end={totalPatients} duration={200} />
              <RadialProgress targetValue={(totalPatients / 2)} />
            </div>
            <div className="mt-0 mb-6 card-actions">
              <p className="mb-8 text-xs font-bold leading-tight text-white">Total Patients: {totalPatients}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-4">
            <Example />
          </div>
          <div className="relative w-72 h-[440px] col-span-1 mt-2 ml-[530px] justify-end">
            <h2 className="text-sm ml-9 mb-9 card-title">Mostly Visited Doctors</h2>
            <div className="absolute top-0 left-0 m-4 w-60">
              <div className="h-auto mt-4 border border-gray-400 shadow-xl m card">
                <div className="p-4 card-body">
                  <div className="flex flex-col items-center justify-center card-actions">
                    {["Dr. Smith", "Dr. Jane", "Dr. Alex", "Dr. John", "Dr. Emily", "Dr. John"].map((doctor, index) => (
                      <div className="w-full mt-2" key={index}>
                        <label className="flex justify-start mb-2 text-sm font-bold">{doctor}</label>
                        <div className="flex items-center justify-end">
                          <progress className="w-40 progress progress-primary" value={(index + 1) * 20} max="100">{(index + 1) * 20}%</progress>
                          <span className="ml-2 text-xs">{(index + 1) * 20}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table for visitors */}
        <div className="col-span-3 mt-15">
          <h1 className="text-sm capitalize font-semibold">Recently Visited Patients</h1>
          <div className="overflow-x-auto">
            <table className="table min-w-full">
              <thead>
                <tr className="text-white bg-black">
                  <th className="px-5 py-2">Si.no</th>
                  <th className="px-5 py-2">Patient Name</th>
                  <th className="px-5 py-2">Patient Id</th>
                  <th className="px-5 py-2">Appointment Date</th>
                  <th className="px-5 py-2">Doctor Name</th>
                  <th className="px-5 py-2">Status</th>
                  <th className="px-5 py-2">Treatment</th>
                  <th className="px-5 py-2">Payment</th>
                  <th className="px-5 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-6 py-2 border">1</td>
                  <td className="px-4 py-2 border">Jackson</td>
                  <td className="px-4 py-2 border">1001</td>
                  <td className="px-4 py-2 border">20-04-2024</td>
                  <td className="px-4 py-2 border">Dr. Cy Ganderton</td>
                  <td className="px-4 py-2 border"><button className="btn btn-outline btn-primary btn-sm">Status</button></td>
                  <td className="px-4 py-2 border">Cleaning</td>
                  <td className="px-4 py-2 border">$1200</td>
                  <td className="flex px-4 py-2 border">
                    <button className="px-2 py-1 text-red-500 rounded">
                      <FaRegTrashAlt />
                    </button>
                    <Link href="./patient">
                      <p className="flex items-center px-2 py-1 ml-2 text-black rounded">
                        <FiEdit />
                      </p>
                    </Link>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
