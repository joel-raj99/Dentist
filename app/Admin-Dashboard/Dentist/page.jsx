"use client";
import React, { useState, useRef } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dentist() {
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    experience: "",
    Qualification: "",
    number: "",
    email: "",
    profile: null,
    treatment: "",
  });
  const [educationList, setEducationList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Implement search logic here
  };

  const handleAddEducation = () => {
    setEducationList([
      ...educationList,
      { school: "", year: "", Qualification: "" },
    ]);
  };

  const handleUpdateEducation = (index, field, value) => {
    const newList = [...educationList];
    newList[index][field] = value;
    setEducationList(newList);
  };

  const handleBasicInfoChange = (field, value) => {
    if (field === "profile") {
      setBasicInfo({ ...basicInfo, profile: value.target.files[0] });
    } else {
      setBasicInfo({ ...basicInfo, [field]: value });
    }
  };

  const validateFormData = (data) => {
    const requiredFields = ['name', 'email', 'number', 'Qualification', 'experience', 'treatment', 'profile'];
    for (let field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Field ${field} is required`);
      }
    }

    if (data.educationList && data.educationList.length > 0) {
      data.educationList.forEach((edu, index) => {
        const requiredEduFields = ['school', 'year', 'Qualification'];
        for (let field of requiredEduFields) {
          if (!edu[field]) {
            throw new Error(`Education field ${field} is required at index ${index}`);
          }
        }
      });
    } else {
      throw new Error('Education list must contain at least one entry');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const educationData = educationList.map(edu => ({
        school: edu.school,
        year: edu.year,
        Qualification: edu.Qualification
      }));
      
      const formData = new FormData();
      formData.append('data', JSON.stringify({
        name: basicInfo.name,
        email: basicInfo.email,
        number: basicInfo.number,
        Qualification: basicInfo.Qualification,
        experience: basicInfo.experience,
        treatment: basicInfo.treatment,
        educationList: educationData,
        profile: basicInfo.profile ? `/uploads/${basicInfo.profile.name}` : null,
      }));
      
      if (basicInfo.profile) {
        formData.append('profileImage', basicInfo.profile);
      }

      validateFormData({
        name: basicInfo.name,
        email: basicInfo.email,
        number: basicInfo.number,
        Qualification: basicInfo.Qualification,
        experience: basicInfo.experience,
        treatment: basicInfo.treatment,
        profile: basicInfo.profile ? `/uploads/${basicInfo.profile.name}` : null,
        educationList: educationData
      });

      const response = await fetch('../../api/Dentist', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Successfully submitted!");
      } else {
        toast.error(`Error: ${result.message || "An error occurred"}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="p-5 mt-20 ml-52 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mr-4">
          <h1>Basic info</h1>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search Dentists..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-1 border rounded-full bg-slate-200 h-8 text-white"
            />
          </div>
        </div>

        <form className="grid grid-cols-4 gap-4 mt-2" onSubmit={handleSubmit}>
          <div className="col-span-1">
            <label className="block text-gray-700">Name of Doctor</label>
            <input
              type="text"
              value={basicInfo.name}
              onChange={(e) => handleBasicInfoChange("name", e.target.value)}
              className="block w-full px-3 py-2 mt-1 border capitalize rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Year of Experience</label>
            <input
              type="number"
              value={basicInfo.experience}
              onChange={(e) =>
                handleBasicInfoChange("experience", e.target.value)
              }
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700 ">Qualification</label>
            <input
              type="text"
              value={basicInfo.Qualification}
              onChange={(e) =>
                handleBasicInfoChange("Qualification", e.target.value)
              }
              className="block w-full px-3 py-2 mt-1 border uppercase  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleBasicInfoChange("profile", e)}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black-700 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {basicInfo.profile && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(basicInfo.profile)}
                  alt="Profile Preview"
                  className="max-w-xs rounded-md shadow-md w-14 h-14 ml-20"
                />
              </div>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700">Phone-number</label>
            <input
              type="number"
              value={basicInfo.number}
              onChange={(e) => handleBasicInfoChange("number", e.target.value)}
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Email-ID</label>
            <input
              type="text"
              value={basicInfo.email}
              onChange={(e) => handleBasicInfoChange("email", e.target.value)}
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700">Specific treatment</label>
            <select
              value={basicInfo.treatment}
              onChange={(e) =>
                handleBasicInfoChange("treatment", e.target.value)
              }
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select treatment</option>
              <option>Dental Extraction</option>
              <option>Root Canal Therapy</option>
              <option>Endodontic Therapy</option>
              <option>Root End Surgery</option>
              <option>Tooth Filling</option>
              <option>Dental Bonding</option>
              <option>Tooth Polishing</option>
              <option>Tooth Bleaching</option>
              <option>Teeth Cleaning</option>
              <option>Fluoride Treatment</option>
              <option>Braces</option>
              <option>Invisalign</option>
              <option>Dental Implants</option>
              <option>Dentures</option>
              <option>Gum Surgery</option>
              <option>Crowns</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="col-span-4">
            <h1 className="ml-4">Education info</h1>
          </div>
          <div className="flex justify-end col-span-4 mb-4">
            <button
              type="button"
              onClick={handleAddEducation}
              className="flex px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <h1 className="flex mt-1 mr-2 text-xl">
                <MdAdd />
              </h1>
              ADD
            </button>
          </div>
          <div className="col-span-4 overflow-y-auto max-h-96">
            {educationList.map((education, index) => (
              <div
                key={index}
                className="grid grid-cols-3 col-span-3 gap-4 mt-4"
              >
                <div className="col-span-1">
                  <label className="block text-gray-700">
                    School/University
                  </label>
                  <input
                    type="text"
                    value={education.school}
                    onChange={(e) =>
                      handleUpdateEducation(index, "school", e.target.value)
                    }
                    className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700">
                    Year of Graduation
                  </label>
                  <input
                    type="number"
                    value={education.year}
                    onChange={(e) =>
                      handleUpdateEducation(index, "year", e.target.value)
                    }
                    className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700">Qualification</label>
                  <input
                    type="text"
                    value={education.Qualification}
                    onChange={(e) =>
                      handleUpdateEducation(
                        index,
                        "Qualification",
                        e.target.value
                      )
                    }
                    className="block w-full px-3 py-2 mt-1 border uppercase rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end col-span-3">
                  <button
                    type="button"
                    onClick={() =>
                      setEducationList(
                        educationList.filter((_, i) => i !== index)
                      )
                    }
                    className="flex px-4 py-2 font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <h1 className="flex mt-1 mr-2 uppercase">
                      <MdDelete />
                    </h1>
                   <h1 className="uppercase">Delete</h1> 
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end col-span-4 mt-4">
            <button
              type="submit"
              className="flex px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </>
  );
}
