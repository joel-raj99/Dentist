"use client"
import React, { useState, useEffect } from 'react';

export default function ClinicSettings() {
  // State variables
  const [sidebarColor, setSidebarColor] = useState('#ffffff');
  const [navbarColor, setNavbarColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [textStyle, setTextStyle] = useState('Arial');
  const [fontSize, setFontSize] = useState(16); // Default font size

  // Load settings from local storage when the component mounts
  useEffect(() => {
    const savedSidebarColor = localStorage.getItem('sidebarColor');
    const savedNavbarColor = localStorage.getItem('navbarColor');
    const savedTextColor = localStorage.getItem('textColor');
    const savedTextStyle = localStorage.getItem('textStyle');
    const savedFontSize = localStorage.getItem('fontSize');

    if (savedSidebarColor) setSidebarColor(savedSidebarColor);
    if (savedNavbarColor) setNavbarColor(savedNavbarColor);
    if (savedTextColor) setTextColor(savedTextColor);
    if (savedTextStyle) setTextStyle(savedTextStyle);
    if (savedFontSize) setFontSize(parseInt(savedFontSize)); // Ensure fontSize is parsed as an integer
  }, []);

  // Function to handle sidebar color change
  const handleSidebarColorChange = (e) => {
    setSidebarColor(e.target.value);
  };

  // Function to handle navbar color change
  const handleNavbarColorChange = (e) => {
    setNavbarColor(e.target.value);
  };

  // Function to handle text color change
  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
  };

  // Function to handle text style change
  const handleTextStyleChange = (e) => {
    setTextStyle(e.target.value);
  };

  // Function to handle font size change
  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value)); // Ensure fontSize is parsed as an integer
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings to local storage
    localStorage.setItem('sidebarColor', sidebarColor);
    localStorage.setItem('navbarColor', navbarColor);
    localStorage.setItem('textColor', textColor);
    localStorage.setItem('textStyle', textStyle);
    localStorage.setItem('fontSize', fontSize);
    window.location.reload(); // Refresh the page to apply changes
  };

  return (
    <div
      className="p-6 mt-16 mr-6 bg-white rounded-lg shadow-lg ml-52"
      
    >
      <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
        {/* Sidebar Color Input */}
        <div className="col-span-1">
          <label className="block text-gray-700">Sidebar Color</label>
          <input
            type="color"
            className="block w-full h-10 p-1 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={sidebarColor}
            onChange={handleSidebarColorChange}
            aria-label="Sidebar Color"
          />
        </div>

        {/* Navbar Color Input */}
        <div className="col-span-1">
          <label className="block text-gray-700">Navbar Color</label>
          <input
            type="color"
            className="block w-full h-10 p-1 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={navbarColor}
            onChange={handleNavbarColorChange}
            aria-label="Navbar Color"
          />
        </div>

        {/* Text Color Input */}
        <div className="col-span-1">
          <label className="block text-gray-700">Text Color</label>
          <input
            type="color"
            className="block w-full h-10 p-1 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={textColor}
            onChange={handleTextColorChange}
            aria-label="Text Color"
          />
        </div>

        {/* Text Style Dropdown */}
        <div className="col-span-1">
          <label className="block text-gray-700">Text Style</label>
          <select
            className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={textStyle}
            onChange={handleTextStyleChange}
            aria-label="Text Style"
          >
            <option>Arial</option>
            <option>Times New Roman</option>
            <option>Helvetica</option>
            <option>Verdana</option>
            <option>Georgia</option>
            <option>Courier New</option>
            <option>Monospace</option>
            <option>Tahoma</option>
            <option>Impact</option>
            <option>fantasy</option>
            <option>Trattatello</option>
            <option>Marker Felt</option>
            <option>Stencil Std</option>
            <option>Blippo</option>
            <option>Jazz LET</option>
            <option>Chalkduster</option>
            <option>Luminari</option>
            <option>Snell Roundhand</option>
          </select>
        </div>

        {/* Font Size Input */}
        <div className="col-span-1">
          <label className="block text-gray-700">Font Size (px)</label>
          <input
            type="number"
            min="12" // Minimum font size
            className="block w-full h-10 p-1 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={fontSize}
            onChange={handleFontSizeChange}
            aria-label="Font Size"
          />
        </div>

        {/* Update Button */}
        <div className="flex justify-end col-span-3">
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"aa
            aria-label="Update Settings"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
