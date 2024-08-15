"use client";

import Link from 'next/link';
import styles from './dentist.module.css';
import { useState, useEffect } from 'react';
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { RiAddLine } from "react-icons/ri";
import Image from 'next/image';
import axios from 'axios';

export default function CreateDentist() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dentists, setDentists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await axios.get('/api/Dentist');
        setDentists(response.data);
        console.log("Fetched Dentists:", response.data);
      } catch (error) {
        console.error("Error fetching dentists:", error);
        setError("Failed to fetch dentists. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDentists();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDentists = dentists.filter((dentist) =>
    dentist.dentistid && dentist.dentistid.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDentists.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/Dentist/${id}`);
      setDentists(dentists.filter((dentist) => dentist._id !== id));
    } catch (error) {
      console.error("Error deleting dentist:", error);
      setError("Failed to delete dentist. Please try again later.");
    }
  };

  const indexOfLastDentist = currentPage * itemsPerPage;
  const indexOfFirstDentist = indexOfLastDentist - itemsPerPage;
  const currentDentists = filteredDentists.slice(indexOfFirstDentist, indexOfLastDentist);

  return (
    <div>
      <div className="flex justify-end items-center mr-4 mt-14 relative">
        <input
          type="text"
          placeholder="Search by dentist ID..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-1 border bg-slate-200 h-8 text-black"
        />
        <BsSearch className="absolute right-44 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Link href="../../Admin-Dashboard/Dentist">
          <button className="bg-black hover:bg-green-400 text-white font-bold py-1 px-4 ml-4 flex items-center">
            <RiAddLine className="mr-2" />
            Add Dentist
          </button>
        </Link>
      </div>

      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">{error}</p>
      ) : (
        <div className="col-span-12 mt-5 ml-52 mr-7">
          <div className="overflow-x-auto">
            <table className="table min-w-full">
              <thead>
                <tr className="bg-black text-white">
                  <th className="px-5 py-1">Si.no</th>
                  <th className="px-5 py-1">Dentist ID</th>
                  <th className="px-5 py-1">Name</th>
                  <th className="px-5 py-1">Profile</th>
                  <th className="px-5 py-1">Qualification</th>
                  <th className="px-5 py-1">Experience</th>
                  <th className="px-5 py-1">Phone Number</th>
                  <th className="px-15 py-1">Email</th>
                  <th className="px-5 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentDentists.map((dentist, index) => (
                  <tr key={dentist._id} className="bg-white my-2 p-4">
                    <td className="border px-6 py-1">{indexOfFirstDentist + index + 1}</td>
                    <td className="border px-4 py-1">{dentist.dentistid}</td>
                    <td className="border px-4 py-1">{dentist.name}</td>
                    <td className="border px-4 py-1">
                      {dentist.profileImage ? (
                        <Image 
                          quality={100} 
                          className={styles.userImage} 
                          src={dentist.profileImage} 
                          alt={dentist.name} 
                          width={25} 
                          height={25} 
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td className="border px-4 py-1">{dentist.Qualification}</td>
                    <td className="border px-4 py-1">{dentist.experience} years</td>
                    <td className="border px-4 py-1">{dentist.phone}</td>
                    <td className="border px-4 py-3">{dentist.email}</td>
                    <td className="border px-4 py-3 flex">
                      <button
                        className="text-red-500 px-2 py-1 rounded"
                        onClick={() => handleDelete(dentist._id)}
                      >
                        <FaRegTrashAlt />
                      </button>
                      <Link href={`./Dentist/${dentist._id}`}>
                        <p className="text-black px-2 py-1 rounded ml-2 flex items-center">
                          <FiEdit />
                        </p>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="join flex justify-end mt-3 space-x-2 h-2 mr-8">
        <button
          className="join-item btn text-xs h-4 px-2 py-1"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          &laquo; Previous
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`join-item btn text-xs h-4 px-2 py-1 ${currentPage === page ? 'bg-gray-300' : ''}`}
            onClick={() => goToPage(page)}
          >
            {page}
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
