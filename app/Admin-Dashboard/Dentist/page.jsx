
"use client"
import React, { useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";

export default function Dentist() {
    const [basicInfo, setBasicInfo] = useState({
        name: "",
        experience: "",
        Qualification: "",
        number: "",
        email: "",
        profile: null, // Updated to hold file object
        treatment: "",
    });
    const [educationList, setEducationList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        // Implement search logic here
      };
    

    const handleAddEducation = () => {
        setEducationList([...educationList, { school: "", year: "", Qualification: "" }]);
    };

    const handleUpdateEducation = (index, field, value) => {
        const newList = [...educationList];
        newList[index][field] = value;
        setEducationList(newList);
    };

    const handleBasicInfoChange = (field, value) => {
        if (field === "profile") {
            // Handle file input for profile picture
            setBasicInfo({ ...basicInfo, profile: value.target.files[0] });
        } else {
            setBasicInfo({ ...basicInfo, [field]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Basic Info:", basicInfo);
        console.log("Education List:", educationList);
        // Handle form submission logic here
    };

    return (
        <>
            <div className="p-5 mt-20 ml-52 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between mr-4 ">
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
                            className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-gray-700">Year of Experience</label>
                        <input
                            type="number"
                            value={basicInfo.experience}
                            onChange={(e) => handleBasicInfoChange("experience", e.target.value)}
                            className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>


                    <div className="col-span-1">
                        <label className="block text-gray-700">Qualification </label>
                        <input
                            type="text"
                            value={basicInfo.Qualification}
                            onChange={(e) => handleBasicInfoChange("Qualification", e.target.value)}
                            className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>


                    <div className="col-span-1">
                        <label className="block text-gray-700">Profile Picture</label>
                        <input
                            type="file"
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
                            onChange={(e) => handleBasicInfoChange("treatment", e.target.value)}
                            className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select treatment</option>
                            <option>Dental Extraction </option>
                            <option>Root Canal Therapy</option>
                            <option>Endodontic Therapy </option>
                            <option>Root End Surgery </option>
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
                            Add Items
                        </button>
                    </div>
                    <div className="col-span-4 overflow-y-auto max-h-96"> {/* Added container with overflow */}
                        {educationList.map((education, index) => (
                            <div key={index} className="grid grid-cols-3 col-span-3 gap-4 mt-4">
                                <div className="col-span-1">
                                    <label className="block text-gray-700">School/University </label>
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
                                    <label className="block text-gray-700">Year of Graduation</label>
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
                                            handleUpdateEducation(index, "Qualification", e.target.value)
                                        }
                                        className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="flex justify-end col-span-3">
                                    <button
                                        type="button"
                                        onClick={() => setEducationList(educationList.filter((_, i) => i !== index))}
                                        className="flex px-4 py-2 font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    >
                                        <h1 className="flex mt-1 mr-2">
                                            <MdDelete />
                                        </h1>
                                        Delete
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
                </form>
            </div>
        </>
    );
}
