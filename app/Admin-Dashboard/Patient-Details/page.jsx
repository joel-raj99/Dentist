"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";
import { format } from 'date-fns';

export default function AppointmentList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchDataForPage(currentPage);
  }, [currentPage]);

  const fetchDataForPage = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/appointment?page=${page}&searchQuery=${searchQuery}`);
      const { data, totalPages } = response.data;
      const appointmentsData = data.map(appointment => ({
        ...appointment,
        appointmentDate: appointment.appointmentDate ? format(new Date(appointment.appointmentDate), 'dd-MM-yyyy') : ""
      }));
      setAppointments(appointmentsData);
      setTotalPages(totalPages);
    } catch (err) {
      setError(err.message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`/api/appointment?id=${appointmentId}`);
      toast.success('Appointment deleted successfully');
      fetchDataForPage(currentPage);
    } catch (err) {
      toast.error(`Error deleting appointment: ${err.message}`);
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center mr-4 mt-14 relative">
        <input
          type="text"
          placeholder="Search appointment..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border  bg-slate-200 h-8 text-black pl-5"
        />
        <Link href="../../Admin-Dashboard/patient">
          <button className="bg-black hover:bg-green-400 text-white font-bold py-1 px-3  ml-4 flex items-center">
            <MdUpdate className="mr-2" />
            update patients
          </button>
        </Link>
      </div>

      <div className="col-span-12 mt-5 ml-52 mr-7">
        <div className="overflow-x-auto">
          <table className="table min-w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="px-5 py-2">Si.no</th>
                <th className="px-5 py-2">Appointment Id</th>
                <th className="px-5 py-2 ">Appointment Name</th>
                <th className="px-5 py-2">Doctor Name</th>
                <th className="px-5 py-2">Appointment Date</th>
                <th className="px-5 py-2">Treatment</th>
                {/* <th className="px-5 py-2">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                 
                  <td colSpan="7" className="text-center py-4"><span className="loading loading-bars loading-xs"></span></td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-red-500">Error: {error}</td>
                </tr>
              ) : filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment, index) => (
                  <tr key={index} className="bg-white my-2 p-4 justify-center align-middle">
                    <td className="border px-6 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{appointment.patientId}</td>
                    <td className="border px-4 py-2">{appointment.name}</td>
                    <td className="border px-4 py-2">{appointment.doctorName}</td>
                    <td className="border px-4 py-2">{appointment.appointmentDate}</td>
                    <td className="border px-4 py-2">{appointment.treatment}</td>
                    {/* <td className="border px-4 py-2 flex">
                      <button className="text-red-500 px-2 py-1 rounded" onClick={() => handleDeleteAppointment(appointment._id)}>
                        <FaRegTrashAlt />
                      </button>
                      <Link href={`./patient/${appointment._id}`}>
                        <p className="text-black px-2 py-1 rounded ml-2 flex items-center">
                          <FiEdit />
                        </p>
                      </Link>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">No appointments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="join flex justify-end mt-3 space-x-2 h-2 mr-8">
        <button
          className="join-item btn text-xs h-4 px-2 py-1"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          &laquo; Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
          <button
            key={pageNumber}
            className={`join-item btn text-xs h-4 px-2 py-1 ${currentPage === pageNumber ? 'bg-gray-300' : ''}`}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="join-item btn text-xs h-4 px-2 py-1"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
}
