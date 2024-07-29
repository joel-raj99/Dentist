"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";
import { MdSaveAlt } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const treatmentsData = {
  "Root Canal Therapy": ["Pulp Removal", "Cleaning", "Disinfecting", "Shaping", "Filling"],
  "Teeth Cleaning": ["Prophylaxis Cleaning", "Scaling and Root Planing", "Debridement", "Prophylaxis Cleaning with Dental Scaler", "Prophylaxis Cleaning Water Stream"],
  "Braces": ["Dental Cleaning"],
  "Invisalign": ["Tooth-Colored Attachments", "Initial Aligners", "Aligner Replacement"],
  "Dental": ["Implants-Initial Evaluation", "Grafting", "Implant Placement", "Abutment", "Full Mouth Dental Implant"],
  "Gum Surgery": ["Mucogingival Surgery", "Osseous Surgery"],
  "Crowns": ["Tooth Preparation", "Temporary Crown", "Permanent Crown Placement"],
};

const proceduresData = {
  "Pulp Removal": ["Reversible Pulpitis", "Irreversible Pulpitis"],
  "Cleaning": ["Compulsive Cleaning", "Symmetry and Ordering"],
  "Disinfecting": ["UV Lamp Disinfection Systems", "Glutaraldehyde Preparation", "Chlorine-Releasing Agents", "Sodium Chlorite (NaClO2)", "Hydrogen Peroxide", "Phenolics", "Iodophors", "Alcohols", "Quaternary Ammonium Compounds"],
  "Shaping": ["Magnetic Resonance Imaging (MRI)", "Shaping behavior", "Companion diagnostic", "Next-Generation Sequencing"],
  "Filling": ["Cavities", "Pulpitis", "Tooth Sensitivity", "Large Cavity"],
  // Add more procedure data here
};

const diagnosisData = {
  "Reversible Pulpitis": ["Diagnosis A", "Diagnosis B"],
  "Irreversible Pulpitis": ["Diagnosis C", "Diagnosis D"],
  "Compulsive Cleaning": ["Diagnosis E", "Diagnosis F"],
  // Add more diagnosis data here
};

export default function CreateClinic() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    website: "",
    primaryPhone: "",
    secondaryPhone: "",
    email: "",
    address: "",
    city: "",
    country: "",
    state: "",
    pincode: "",
    Treatment: "",
    Procedure: "",
    Diagnosis: "",
    costOfTreatment: "",
    costOfProcedure: "",
    costOfDiagnosis: "",
    introduction: "",
  });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [additionalLogos, setAdditionalLogos] = useState([]);
  const [additionalLogoPreviews, setAdditionalLogoPreviews] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [procedures, setProcedures] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalLogoChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalLogos(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setAdditionalLogoPreviews(previews);
  };

  const handleTreatmentChange = (e) => {
    const treatment = e.target.value;
    setSelectedTreatment(treatment);
    setFormData({ ...formData, Treatment: treatment });
    setProcedures(treatmentsData[treatment] || []);
    setSelectedProcedure("");
    setDiagnoses([]);
  };

  const handleProcedureChange = (e) => {
    const procedure = e.target.value;
    setSelectedProcedure(procedure);
    setFormData({ ...formData, Procedure: procedure });
    setDiagnoses(proceduresData[procedure] || []);
  };

  const handleDiagnosisChange = (e) => {
    const diagnosis = e.target.value;
    setFormData({ ...formData, Diagnosis: diagnosis });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload logo
      let logoPath = "";
      if (logo) {
        const formDataLogo = new FormData();
        formDataLogo.append("file", logo);
        const logoResponse = await axios.post("../../api/upload", formDataLogo);
        logoPath = logoResponse.data.image.path;
      }

      // Upload additional logos
      let additionalLogoPaths = [];
      if (additionalLogos.length > 0) {
        const formDataAdditionalLogos = new FormData();
        additionalLogos.forEach((file) =>
          formDataAdditionalLogos.append("files", file)
        );
        const additionalLogoResponse = await axios.post(
          "../../api/upload",
          formDataAdditionalLogos
        );
        additionalLogoPaths = additionalLogoResponse.data.images.map(
          (img) => img.path
        );
      }

      // Submit form data
      const response = await axios.post("../../api/Models/ClinicModels.js", {
        ...formData,
        logo: logoPath,
        additionalLogos: additionalLogoPaths,
      });

      if (response.data.success) {
        toast.success("Clinic information submitted successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({
          name: "",
          location: "",
          website: "",
          primaryPhone: "",
          secondaryPhone: "",
          email: "",
          address: "",
          city: "",
          country: "",
          state: "",
          pincode: "",
          Treatment: "",
          Procedure: "",
          Diagnosis: "",
          costOfTreatment: "",
          costOfProcedure: "",
          costOfDiagnosis: "",
          introduction: "",
        });
        setLogo(null);
        setLogoPreview("");
        setAdditionalLogos([]);
        setAdditionalLogoPreviews([]);
      } else {
        toast.error("An error occurred while submitting the information.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("An error occurred while submitting the information.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 ml-56 mr-5 mt-14">
      <div className="col-span-4">
        <h1 className="mt-5 text-2xl capitalize text-bold">Clinic Info</h1>
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Name of Clinic</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Clinic Logo</label>
        <input
          type="file"
          onChange={handleLogoChange}
          className="block w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black-700 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Clinic Logo Preview</label>
        {logoPreview && (
          <img src={logoPreview} alt="Preview" className="w-20 h-20 rounded-lg" />
        )}
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Additional Clinic Logos</label>
        <input
          type="file"
          onChange={handleAdditionalLogoChange}
          multiple
          className="block w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black-700 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Additional Logo Preview</label>
        {additionalLogoPreviews && (
          <img src={additionalLogoPreviews} alt="Preview" className="w-20 h-20 rounded-lg" />
        )}
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Website</label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Primary Phone Number</label>
        <input
          type="text"
          name="primaryPhone"
          value={formData.primaryPhone}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Secondary Phone Number</label>
        <input
          type="text"
          name="secondaryPhone"
          value={formData.secondaryPhone}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-2">
        <label className="block text-gray-700">Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-2">
        <label className="block text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Pincode</label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-4">
        <label className="block text-gray-700">Introduction</label>
        <textarea
          name="introduction"
          value={formData.introduction}
          onChange={handleChange}
          rows="3"
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div className="col-span-4 flex justify-end align-middle">
      <button className="btn btn-blue">Add</button>

</div>
      <div className="col-span-2">
        <label className="block text-gray-700">Treatment</label>
        <select
          name="Treatment"
          value={formData.Treatment}
          onChange={handleTreatmentChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Treatment</option>
          {Object.keys(treatmentsData).map((treatment) => (
            <option key={treatment} value={treatment}>
              {treatment}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-2">
        <label className="block text-gray-700">Cost of Treatment</label>
        <div className="flex">
        <input
          type="text"
          name="costOfTreatment"
          placeholder="Cost of Treatment"
          value={formData.costOfTreatment}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button className="btn btn-blue">Delete</button>
        </div>
      
      </div>
      <div className="col-span-4 flex justify-end align-middle">
      <button className="btn btn-blue">Add</button>

</div>
      <div className="col-span-2">
        <label className="block text-gray-700">Procedure</label>
        <select
          name="Procedure"
          value={formData.Procedure}
          onChange={handleProcedureChange}
          disabled={!selectedTreatment}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Procedure</option>
          {procedures.map((procedure) => (
            <option key={procedure} value={procedure}>
              {procedure}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-2">
        <label className="block text-gray-700">Cost of Procedure</label>
        <div className="flex">
        <input
          type="text"
          name="costOfProcedure"
          placeholder="Cost of Procedure"
          value={formData.costOfProcedure}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button className="btn btn-blue">Delete</button>
        </div>
       
        
      </div>
      <div className="col-span-4 flex justify-end align-middle">
      <button className="btn btn-blue">Add</button>

</div>
      
      <div className="col-span-2">
        <label className="block text-gray-700">Diagnosis</label>
        <select
          name="Diagnosis"
          value={formData.Diagnosis}
          onChange={handleDiagnosisChange}
          disabled={!selectedProcedure}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Diagnosis</option>
          {diagnoses.map((diagnosis) => (
            <option key={diagnosis} value={diagnosis}>
              {diagnosis}
            </option>
          ))}
        </select>
      </div>
   
 
      <div className="col-span-2">
        <label className="block text-gray-700">Cost of Diagnosis</label>
        <div className="flex">
        <input
          type="text"
          name="costOfDiagnosis"
          placeholder="Cost of Diagnosis"
          value={formData.costOfDiagnosis}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button className="btn btn-blue">Delete</button>
        </div>
        
      </div>
      <div className="col-span-4 flex justify-end align-middle">
      <button className="btn btn-blue">Add</button>

</div>
      <div className="col-span-4">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 mt-1 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </form>
  );
}
