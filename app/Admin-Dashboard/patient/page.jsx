"use client";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PatientSetting() {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    email: "",
    dob: "",
    phone: "",
    phone2: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    doctor: "",
    treatment: ""
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/api/patient");
        const patientsData = response.data.map(patient => ({
          ...patient,
          dob: patient.dob ? patient.dob.split('T')[0] : "" // Format DOB to yyyy-mm-dd if present
        }));
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const patient = patients.find((p) => p.patientID === query);
      if (patient) {
        handlePatientSelect(patient);
      } else {
        clearFormData();
      }
    } else {
      clearFormData();
    }
  };

  const handlePatientSelect = (patient) => {
    setFormData({
      patientId: patient.patientID,
      name: patient.name,
      email: patient.email,
      dob: patient.dob,
      phone: patient.phone,
      phone2: patient.phone2,
      address: patient.address,
      city: patient.city,
      state: patient.state,
      pincode: patient.pincode,
      doctor: patient.doctor,
      treatment: patient.treatment
    });
  };

  const clearFormData = () => {
    setFormData({
      patientId: "",
      name: "",
      email: "",
      dob: "",
      phone: "",
      phone2: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      doctor: "",
      treatment: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      dob: formData.dob
    };

    console.log("Submitting form data:", updatedFormData);

    try {
      await axios.patch(`/api/patient/${patients}`, updatedFormData);
      console.log(updatedFormData)
      alert("Patient updated successfully");
    } catch (error) {
      console.error("Error updating patient data:", error);
      alert("Failed to update patient");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 p-5 mt-12 ml-56 md:grid-cols-4">
      <div className="col-span-1 md:col-span-3">
        <h1 className="mb-5 text-2xl font-bold">Patient Information</h1>
      </div>
      <div className="flex items-center justify-end col-span-1 md:col-span-1">
        <input
          type="text"
          placeholder="Search patient"
          value={searchQuery}
          onChange={handleSearchChange}
          className="h-8 px-4 py-1 text-black border  bg-slate-200"
        />
      </div>

      <div className="col-span-1 md:col-span-4">
        <form className="grid grid-cols-1 gap-5 md:grid-cols-3" onSubmit={handleSubmit}>
          <div className="col-span-1">
            <label htmlFor="patientId">Patient ID</label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="phone2">Secondary Phone Number</label>
            <input
              type="tel"
              id="phone2"
              name="phone2"
              value={formData.phone2}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="col-span-3">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="pincode">Pin-code</label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="doctor">Doctor's Name</label>
            <input
              type="text"
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="treatment">Treatment</label>
            <input
              type="text"
              id="treatment"
              name="treatment"
              value={formData.treatment}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex items-center justify-end col-span-3 md:col-span-1">
            <button
              type="submit"
              className="flex items-center p-1 text-white bg-green-600"
            >
              <MdOutlineBrowserUpdated className="mr-2 ml-2" /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
