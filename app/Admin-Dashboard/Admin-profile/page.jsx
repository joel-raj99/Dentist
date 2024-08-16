"use client";
import React, { useState, useRef } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dentist() {
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    experience: "",
    Qualification: "",
    phone: "",
    secondarynumber: "",
    age: "",
    address: "",
    gender: "",
    dateofbirth: "",
    email: "",
    profile: null,
    city: "",
    state: "",
  });
  const [experienceList, setExperienceList] = useState([]);
  const fileInputRef = useRef(null);

  const handleAddExperience = () => {
    setExperienceList([
      ...experienceList,
      { company: "", experience: "", domain: "" },
    ]);
  };

  const handleUpdateExperience = (index, field, value) => {
    const newList = [...experienceList];
    newList[index][field] = value;
    setExperienceList(newList);
  };

  const handleBasicInfoChange = (field, value) => {
    if (field === "profile") {
      setBasicInfo({ ...basicInfo, profile: value.target.files[0] });
    } else {
      setBasicInfo({ ...basicInfo, [field]: value });
    }
  };

  const validateFormData = (data) => {
    const requiredFields = [
      "name",
      "experience",
      "Qualification",
      "phone",
      "secondarynumber",
      "age",
      "address",
      "gender",
      "dateofbirth",
      "email",
      "profile",
      "city",
      "state",
    ];

    for (let field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Field "${field}" is required`);
      }
    }

    // Ensure age is a valid number
    if (isNaN(data.age) || data.age <= 0) {
      throw new Error("Age must be a valid positive number");
    }

    if (data.experienceList && data.experienceList.length > 0) {
      data.experienceList.forEach((exp, index) => {
        const requiredExpFields = ["company", "experience", "domain"];
        for (let field of requiredExpFields) {
          if (!exp[field]) {
            throw new Error(
              `Experience field "${field}" is required at index ${index + 1}`
            );
          }
        }
      });
    } else {
      throw new Error("Experience list must contain at least one entry");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const experienceData = experienceList.map((exp) => ({
        company: exp.company,
        experience: exp.experience,
        domain: exp.domain,
      }));
  
      const formData = new FormData();
      formData.append("data", JSON.stringify({
        name: basicInfo.name,
        email: basicInfo.email,
        phone: basicInfo.phone,
        Qualification: basicInfo.Qualification,
        experience: basicInfo.experience,
        age: parseInt(basicInfo.age),
        gender: basicInfo.gender,
        dateofbirth: basicInfo.dateofbirth,
        address: basicInfo.address,
        secondarynumber: basicInfo.secondarynumber,
        city: basicInfo.city,
        state: basicInfo.state,
        experienceList: experienceData,
      }));
  
      if (basicInfo.profile) {
        formData.append("profileImage", basicInfo.profile);
      }
  
      const response = await fetch("/api/adminprofile", {
        method: "POST",
        body: formData,
        // No need to set Content-Type header; FormData sets it automatically
      });
  
      const textResponse = await response.text();
      console.log("Raw Response:", textResponse);
  
      if (response.ok) {
        const result = JSON.parse(textResponse);
        toast.success("Successfully submitted!");
      } else {
        const errorResult = JSON.parse(textResponse);
        toast.error(`Error: ${errorResult.message || "An error occurred"}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };
  
  return (
    <>
      <div className="p-5 mt-20 ml-52 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mr-4">
          <h1 className="text capitalize">Basic info</h1>
        </div>

        <form className="grid grid-cols-4 gap-4 mt-8" onSubmit={handleSubmit}>
          <div className="col-span-1">
            <label className="block text-gray-700">Name of Admin</label>
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
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              value={basicInfo.dateofbirth}
              onChange={(e) =>
                handleBasicInfoChange("dateofbirth", e.target.value)
              }
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              value={basicInfo.age}
              onChange={(e) => handleBasicInfoChange("age", e.target.value)}
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
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              value={basicInfo.phone}
              onChange={(e) => handleBasicInfoChange("phone", e.target.value)}
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700">Secondary Number</label>
            <input
              type="text"
              value={basicInfo.secondarynumber}
              onChange={(e) =>
                handleBasicInfoChange("secondarynumber", e.target.value)
              }
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={basicInfo.address}
              onChange={(e) => handleBasicInfoChange("address", e.target.value)}
              className="block w-full px-3 py-2 mt-1 border capitalize rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700">Gender</label>
            <select
              value={basicInfo.gender}
              onChange={(e) => handleBasicInfoChange("gender", e.target.value)}
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              value={basicInfo.city}
              onChange={(e) => handleBasicInfoChange("city", e.target.value)}
              className="block w-full px-3 py-2 mt-1 border capitalize rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700">State</label>
            <input
              type="text"
              value={basicInfo.state}
              onChange={(e) => handleBasicInfoChange("state", e.target.value)}
              className="block w-full px-3 py-2 mt-1 border capitalize rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-4">
            <div className="flex items-center justify-between mr-4">
              <h1 className="text capitalize">Experience Info</h1>
              <button
                type="button"
                onClick={handleAddExperience}
                className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                <MdAdd />
                Add Experience
              </button>
            </div>

            {experienceList.map((exp, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 mt-4 border-t border-gray-200 pt-4"
              >
                <div className="col-span-1">
                  <label className="block text-gray-700">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      handleUpdateExperience(index, "company", e.target.value)
                    }
                    className="block w-full px-3 py-2 mt-1 border capitalize rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700">
                    Year of Experience
                  </label>
                  <input
                    type="number"
                    value={exp.experience}
                    onChange={(e) =>
                      handleUpdateExperience(index, "experience", e.target.value)
                    }
                    className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700">Domain</label>
                  <input
                    type="text"
                    value={exp.domain}
                    onChange={(e) =>
                      handleUpdateExperience(index, "domain", e.target.value)
                    }
                    className="block w-full px-3 py-2 mt-1 border capitalize rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-1 flex items-end">
                  <button
                    type="button"
                    onClick={() =>
                      setExperienceList(
                        experienceList.filter((_, i) => i !== index)
                      )
                    }
                    className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    <MdDelete />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-4 mt-8">
            <button
              type="submit"
              className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
