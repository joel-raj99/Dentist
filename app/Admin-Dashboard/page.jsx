"use client"
import React from 'react';
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link"; // Corrected import
import Example from"./Example"

export default function DashboardPage() {
  return (
    <div className="flex ml-56 mt-16 mr-8">
      <div className="grid grid-cols-3 gap-12">
        <div className="card w-80 bg-blue-800 shadow-xl h-44 rounded-lg">
          <div className="card-body p-4">
            <p className="text-white capitalize leading-tight">total appointment's</p>
            <div className="flex items-center justify-between mb-2">
              <p className="text-white text-3xl font-bold leading-tight">200</p>
              <div className="radial-progress text-white flex items-center justify-center" style={{ "--value": 70, "--color": "green" }} role="progressbar">
                70%
              </div>
            </div>
            <div className="card-actions mt-0 mb-6">
              <p className="text-white text-xs font-bold leading-tight mb-8">Total appointments for 400</p>
            </div>
          </div>
        </div>

        <div className="card w-80 bg-blue-800 shadow-xl h-44 rounded-lg">
          <div className="card-body p-4">
            <p className="text-white capitalize leading-tight">total Doctor's</p>
            <div className="flex items-center justify-between mb-2">
              <p className="text-white text-3xl font-bold leading-tight">200</p>
              <div className="radial-progress text-white flex items-center justify-center" style={{ "--value": 70 }} role="progressbar">
                70%
              </div>
            </div>
            <div className="card-actions mt-0 mb-6">
              <p className="text-white text-xs font-bold leading-tight mb-8">Total Doctor's for 400</p>
            </div>
          </div>
        </div>

        <div className="card w-80 bg-blue-800 shadow-xl h-44 rounded-lg">
          <div className="card-body p-4">
            <p className="text-white capitalize leading-tight">total patient's </p>
            <div className="flex items-center justify-between mb-2">
              <p className="text-white text-3xl font-bold leading-tight">200</p>
              <div className="radial-progress text-white flex items-center justify-center" style={{ "--value": 70 }} role="progressbar">
                70%
              </div>
            </div>
            <div className="card-actions mt-0 mb-6">
              <p className="text-white text-xs font-bold leading-tight mb-8">Total patient's for 400</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
  {/* Other grid items can be placed here */}
  <div className="col-span-4">
          <Example />
        </div>
  {/* This is the second grid item, spanning one column */}
  <div className="relative w-72 h-[440px] col-span-1 mt-2 ml-[530px] justify-end">
    <div className="absolute top-0 left-0 m-4 w-60">
      <div className="card border border-gray-400  h-auto shadow-xl">
        <div className="card-body p-4">
          <h2 className="card-title text-sm">Mostly Visited Doctors</h2>
          <div className="card-actions justify-center flex flex-col items-center">
            {["Dr. Smith", "Dr. Jane", "Dr. Alex", "Dr. John", "Dr. Emily","Dr.john"].map((doctor, index) => (
              <div className="w-full mt-2" key={index}>
                <label className="flex text-sm justify-start mb-2 font-bold">{doctor}</label>
                <div className="flex items-center justify-end">
                  <progress className="progress progress-primary w-40" value={(index + 1) * 20} max="100">{(index + 1) * 20}%</progress>
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
          <h1 className=" text-sm fontsemibold  capitalize">Recently visted patient </h1>
          <div className="overflow-x-auto">
            <table className="table min-w-full">
              <thead>
                <tr className="bg-black text-white">
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
                  <td className="border px-6 py-2">1</td>
                  <td className="border px-4 py-2">Jackson</td>
                  <td className="border px-4 py-2">1001</td>
                  <td className="border px-4 py-2">20-04-2024</td>
                  <td className="border px-4 py-2">Dr. Cy Ganderton</td>

                  <td className="border px-4 py-2"><button className="btn btn-outline btn-primary btn-sm">status</button></td>
                  <td className="border px-4 py-2">Cleaning</td>
                  <td className="border px-4 py-2">$1200</td>
                  <td className="border px-4 py-2 flex">
                    <button className="text-red-500 px-2 py-1 rounded">
                      <FaRegTrashAlt />
                    </button>
                    <Link href="./patient">
                      <p className="text-black px-2 py-1 rounded ml-2 flex items-center">
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
