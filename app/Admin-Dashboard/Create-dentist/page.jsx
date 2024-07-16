"use client";


import Link from 'next/link';
import styles from './dentist.module.css'
import { useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { RiAddLine } from "react-icons/ri";
import Image from 'next/image';

export default function CreateDentist() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const totalPages = 3; // Replace with actual number of pages

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Implement search logic here
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    // Implement logic to fetch data for the selected page
    // Example: fetchDataForPage(page);
  };

  // Function to generate an array of page numbers
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div>
      <div className="flex justify-end items-center mr-4 mt-14 relative">
        <input
          type="text"
          placeholder="Search Dentists..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-1 border rounded-full bg-slate-200 h-8 text-white"
        />
        <BsSearch className="absolute right-44 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Link href="../../Admin-Dashboard/Dentist">
        <button className="bg-black hover:bg-orange-400 text-white font-bold py-1 px-4 rounded-full ml-4 flex items-center">
  <RiAddLine className="mr-2" />
  Add Dentist
</button>

        </Link>
      </div>

      <div className="col-span-12 mt-5 ml-52 mr-7">
        <div className="overflow-x-auto">
          <table className="table min-w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="px-5 py-1">Si.no</th>
                <th className="px-5 py-1 ">Name</th>
                <th className="px-5 py-1">Profile</th>
                <th className="px-5 py-1">Qualification</th>
                <th className="px-5 py-1">Experience</th>
                <th className="px-5 py-1">Phone Number</th>
                <th className="px-15 py-1">Email</th>
                <th className="px-5 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white  my-2 p-4">
                <td className="border px-6 py-1">1</td>
                <td className="border px-4 py-1">Dr. Cy Ganderton</td>
                <td className="border px-4 py-1"> <Image quality={100} className={styles.userImage} src="/images.jpg" alt="images.jpg" width="25" height="25" /></td>
                <td className="border px-4 py-1">MD</td>
                <td className="border px-4 py-1">10 years</td>
                <td className="border px-4 py-1">123-456-7890</td>
                <td className="border px-4 py-3">cy.ganderton@example.com</td>
                <td className="border px-4 py-3 flex">
                  <button className="text-red-500 px-2 py-1 rounded">
                    <FaRegTrashAlt />
                  </button>
                  <Link href="./Dentist">
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
