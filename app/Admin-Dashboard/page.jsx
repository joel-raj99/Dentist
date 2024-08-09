// "use client"
// import React from 'react';
// import { FiEdit } from "react-icons/fi";
// import { FaRegTrashAlt } from "react-icons/fa";
// import Link from "next/link"; // Corrected import
// import Example from"./Example"

// export default function DashboardPage() {
//   return (
//     <div className="flex mt-16 ml-56 mr-8">
//       <div className="grid grid-cols-3 gap-12">
//         <div className="bg-blue-800 rounded-lg shadow-xl card w-80 h-44">
//           <div className="p-4 card-body">
//             <p className="leading-tight text-white capitalize">total appointment's</p>
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-3xl font-bold leading-tight text-white">200</p>
//               <div className="flex items-center justify-center text-white radial-progress" style={{ "--value": 70, "--color": "green" }} role="progressbar">
//                 70%
//               </div>
//             </div>
//             <div className="mt-0 mb-6 card-actions">
//               <p className="mb-8 text-xs font-bold leading-tight text-white">Total appointments for 400</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-blue-800 rounded-lg shadow-xl card w-80 h-44">
//           <div className="p-4 card-body">
//             <p className="leading-tight text-white capitalize">total Doctor's</p>
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-3xl font-bold leading-tight text-white">200</p>
//               <div className="flex items-center justify-center text-white radial-progress" style={{ "--value": 70 }} role="progressbar">
//                 70%
//               </div>
//             </div>
//             <div className="mt-0 mb-6 card-actions">
//               <p className="mb-8 text-xs font-bold leading-tight text-white">Total Doctor's for 400</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-blue-800 rounded-lg shadow-xl card w-80 h-44">
//           <div className="p-4 card-body">
//             <p className="leading-tight text-white capitalize">total patient's </p>
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-3xl font-bold leading-tight text-white">200</p>
//               <div className="flex items-center justify-center text-white radial-progress" style={{ "--value": 70 }} role="progressbar">
//                 70%
//               </div>
//             </div>
//             <div className="mt-0 mb-6 card-actions">
//               <p className="mb-8 text-xs font-bold leading-tight text-white">Total patient's for 400</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-5 gap-4">
//   {/* Other grid items can be placed here */}
//   <div className="col-span-4">
//           <Example />
//         </div>
//   {/* This is the second grid item, spanning one column */}
//   <div className="relative w-72 h-[440px] col-span-1 mt-2 ml-[530px] justify-end">
//   <h2 className="text-sm ml-9 mb-9 card-title">Mostly Visited Doctors</h2>
//     <div className="absolute top-0 left-0 m-4 w-60">
//       <div className="h-auto mt-4 border border-gray-400 shadow-xl m card">
//         <div className="p-4 card-body">
    
//           <div className="flex flex-col items-center justify-center card-actions">
//             {["Dr. Smith", "Dr. Jane", "Dr. Alex", "Dr. John", "Dr. Emily","Dr.john"].map((doctor, index) => (
//               <div className="w-full mt-2" key={index}>
//                 <label className="flex justify-start mb-2 text-sm font-bold">{doctor}</label>
//                 <div className="flex items-center justify-end">
//                   <progress className="w-40 progress progress-primary" value={(index + 1) * 20} max="100">{(index + 1) * 20}%</progress>
//                   <span className="ml-2 text-xs">{(index + 1) * 20}%</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
  
  
// </div>

//         {/* Table for visitors */}
//         <div className="col-span-3 mt-15">
//           <h1 className="text-sm capitalize fontsemibold">Recently visted patient </h1>
//           <div className="overflow-x-auto">
//             <table className="table min-w-full">
//               <thead>
//                 <tr className="text-white bg-black">
//                   <th className="px-5 py-2">Si.no</th>
//                   <th className="px-5 py-2">Patient Name</th>
//                   <th className="px-5 py-2">Patient Id</th>
//                   <th className="px-5 py-2">Appointment Date</th>
//                   <th className="px-5 py-2">Doctor Name</th>
//                   <th className="px-5 py-2">Status</th>
//                   <th className="px-5 py-2">Treatment</th>
//                   <th className="px-5 py-2">Payment</th>
//                   <th className="px-5 py-2">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="bg-white">
//                   <td className="px-6 py-2 border">1</td>
//                   <td className="px-4 py-2 border">Jackson</td>
//                   <td className="px-4 py-2 border">1001</td>
//                   <td className="px-4 py-2 border">20-04-2024</td>
//                   <td className="px-4 py-2 border">Dr. Cy Ganderton</td>

//                   <td className="px-4 py-2 border"><button className="btn btn-outline btn-primary btn-sm">status</button></td>
//                   <td className="px-4 py-2 border">Cleaning</td>
//                   <td className="px-4 py-2 border">$1200</td>
//                   <td className="flex px-4 py-2 border">
//                     <button className="px-2 py-1 text-red-500 rounded">
//                       <FaRegTrashAlt />
//                     </button>
//                     <Link href="./patient">
//                       <p className="flex items-center px-2 py-1 ml-2 text-black rounded">
//                         <FiEdit />
//                       </p>
//                     </Link>
//                   </td>
//                 </tr>
//                 {/* Add more rows as needed */}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from 'react';
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link"; // Corrected import
import Example from "./Example";

const RadialProgress = ({ targetValue }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < targetValue) {
      const timer = setTimeout(() => setProgress(progress + 1), 20); // Adjust the interval as needed
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

export default function DashboardPage() {
  return (
    <div className="flex mt-16 ml-56 mr-8">
      <div className="grid grid-cols-3 gap-12">
        <div className="bg-blue-800 rounded-lg shadow-xl card w-80 h-44">
          <div className="p-4 card-body">
            <p className="leading-tight text-white capitalize">total appointment</p>
            <div className="flex items-center justify-between mb-2">
              <p className="text-3xl font-bold leading-tight text-white">200</p>
              <RadialProgress targetValue={50} />
            </div>
            <div className="mt-0 mb-6 card-actions">
              <p className="mb-8 text-xs font-bold leading-tight text-white">Total appointment for 400</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-800 rounded-lg shadow-xl card w-80 h-44">
          <div className="p-4 card-body">
            <p className="leading-tight text-white capitalize">total Doctor</p>
            <div className="flex items-center justify-between mb-2">
              <p className="text-3xl font-bold leading-tight text-white">200</p>
              <RadialProgress targetValue={45} />
            </div>
            <div className="mt-0 mb-6 card-actions">
              <p className="mb-8 text-xs font-bold leading-tight text-white">Total Doctor's for 400</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-800 rounded-lg shadow-xl card w-80 h-44">
          <div className="p-4 card-body">
            <p className="leading-tight text-white capitalize">total patient </p>
            <div className="flex items-center justify-between mb-2">
              <p className="text-3xl font-bold leading-tight text-white">200</p>
              <RadialProgress targetValue={36} />
            </div>
            <div className="mt-0 mb-6 card-actions">
              <p className="mb-8 text-xs font-bold leading-tight text-white">Total patient for 400</p>
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
                    {["Dr. Smith", "Dr. Jane", "Dr. Alex", "Dr. John", "Dr. Emily","Dr.john"].map((doctor, index) => (
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
          <h1 className="text-sm capitalize fontsemibold">Recently visited patient </h1>
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
                  <td className="px-4 py-2 border"><button className="btn btn-outline btn-primary btn-sm">status</button></td>
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
