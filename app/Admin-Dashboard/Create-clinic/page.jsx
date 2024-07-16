'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function CreateClinic() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    website: '',
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    address: '',
    city: '',
    country:'',
    state: '',
    pincode: '',
    costOfTreatment: '',
    costOfProcedure: '',
    costOfDiagnosis: '',
    introduction: '',
  });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [additionalLogos, setAdditionalLogos] = useState([]);
  const [additionalLogoPreviews, setAdditionalLogoPreviews] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload logo
      let logoPath = '';
      if (logo) {
        const formDataLogo = new FormData();
        formDataLogo.append('file', logo);
        const logoResponse = await axios.post('../../api/upload', formDataLogo);
        logoPath = logoResponse.data.image.path;
      }
s
      // Upload additional logos
      let additionalLogoPaths = [];
      if (additionalLogos.length > 0) {
        const formDataAdditionalLogos = new FormData();
        additionalLogos.forEach((file) => formDataAdditionalLogos.append('files', file));
        const additionalLogoResponse = await axios.post('../../api/upload', formDataAdditionalLogos);
        additionalLogoPaths = additionalLogoResponse.data.images.map(img => img.path);
      }

      // Submit form data
      const response = await axios.post('../../api/Models/ClinicModels.js', {
        ...formData,
        logo: logoPath,
        additionalLogos: additionalLogoPaths,
      });

      if (response.data.success) {
        alert('Clinic information submitted successfully!');
        setFormData({
          name: '',
          location: '',
          website: '',
          primaryPhone: '',
          secondaryPhone: '',
          email: '',
          address: '',
          city: '',
          country: '',
          state: '',
          pincode: '',
          costOfTreatment: '',
          costOfProcedure: '',
          costOfDiagnosis: '',
          introduction: '',
        });
        setLogo(null);
        setLogoPreview('');
        setAdditionalLogos([]);
        setAdditionalLogoPreviews([]);
      } else {
        alert('An error occurred while submitting the information.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the information.');
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
        {logoPreview && <img src={logoPreview} alt="Preview" className="w-20 h-20 rounded-lg" />}
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
        <label className="block text-gray-700">Additional Logos</label>
        <input
          type="file"
          onChange={handleAdditionalLogoChange}
          multiple
          className="block w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black-700 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Additional Logos Preview</label>
        {additionalLogoPreviews.length > 0 && additionalLogoPreviews.map((preview, index) => (
          <img key={index} src={preview} alt="Preview" className="w-20 h-20 mb-2 rounded-lg" />
        ))}
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Clinic Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-1">
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
          type="number"
          name="pincode"
          value={formData.pincode}
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
        <label className="block text-gray-700">Primary Phone Number</label>
        <input
          type="tel"
          name="primaryPhone"
          value={formData.primaryPhone}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Secondary Phone Number</label>
        <input
          type="tel"
          name="secondaryPhone"
          value={formData.secondaryPhone}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-4">
        <h1 className="mt-5 text-2xl capitalize text-bold">Other Info</h1>
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Cost of Treatment</label>
        <input
          type="number"
          name="costOfTreatment"
          value={formData.costOfTreatment}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Cost of Procedure</label>
        <input
          type="number"
          name="costOfProcedure"
          value={formData.costOfProcedure}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Cost of Diagnosis</label>
        <input
          type="number"
          name="costOfDiagnosis"
          value={formData.costOfDiagnosis}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-4">
        <label className="block text-gray-700">Basic Introduction of Clinic</label>
        <textarea
          name="introduction"
          value={formData.introduction}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows="4"
        ></textarea>
      </div>
      <div className="flex justify-end col-span-4 mr-7">
        <button
          type="submit"
          className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Update
        </button>
      </div>
    </form>
  );
}
