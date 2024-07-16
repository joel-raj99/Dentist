"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Ensure you have this import
import styles from "./navbar.module.css"; // Ensure you have this import
import Link from "next/link"; // Correct Link import

import { FaRegHospital } from "react-icons/fa";
import { FaUserDoctor, FaPersonCirclePlus } from "react-icons/fa6"; // Combined import
import { RxDashboard } from "react-icons/rx";
import { CiBellOn } from "react-icons/ci";
import { TbZoom } from "react-icons/tb";

export default function Navbar() {
  const pathname = usePathname(); // Get the current path
  const currentPath = pathname.split("/").pop(); // Get the last segment of the path
 
  // State variables for settings
  const [navbarColor, setNavbarColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [textStyle, setTextStyle] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);

  // State variable for search input
  const [searchQuery, setSearchQuery] = useState("");

  // Load settings from local storage
  useEffect(() => {
    const savedNavbarColor = localStorage.getItem("navbarColor");
    const savedTextColor = localStorage.getItem("textColor");
    const savedTextStyle = localStorage.getItem("textStyle");
    const savedFontSize = localStorage.getItem("fontSize");

    if (savedNavbarColor) setNavbarColor(savedNavbarColor);
    if (savedTextColor) setTextColor(savedTextColor);
    if (savedTextStyle) setTextStyle(savedTextStyle);
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, []);

  // Function to handle font size change
  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value)); // Ensure fontSize is parsed as an integer
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings to local storage
    localStorage.setItem("navbarColor", navbarColor);
    localStorage.setItem("textColor", textColor);
    localStorage.setItem("textStyle", textStyle);
    localStorage.setItem("fontSize", fontSize);
  };

  return (
    <div
      className={styles.container} // Use the correct style reference
      style={{
        backgroundColor: navbarColor,
        color: textColor,
        fontFamily: textStyle,
        fontSize: `${fontSize}px`, // Set font size inline style
      }}
    >
      <div className="flex items-center justify-between w-full px-4">
        <div className={styles.title}>
          <span className="block">{currentPath}</span> {/* Display the current path segment */}
        </div>

        {/* Centered Search Bar */}
        <div className="flex justify-center items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle search submission
              console.log("Search query:", searchQuery);
            }}
            className="relative w-80" // Set a width for the search bar
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input rounded-full pr-10 h-7 w-full pl-15" // Full width input with padding
              placeholder="Search"
            />
            <TbZoom className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </form>
        </div>

        <div className="flex items-start space-x-2">
          {/* Dashboard Icon */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <RxDashboard />
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">Event</span>
                <div className="card-actions">
                  <ul className="space-y-2"> {/* Add margin between list items */}
                    <li className="flex items-center space-x-2 mt-2">
                      <FaRegHospital />
                      <Link href="../../../Admin-Dashboard/Create-clinic">
                        <p>Add-clinic</p>
                      </Link>
                    </li>
                    <li className="flex items-center space-x-2 mt-2">
                      <FaUserDoctor />
                      <Link href="../../../Admin-Dashboard/Dentist">
                        <p>Update-Doctor</p>
                      </Link>
                    </li>
                    <li className="flex items-center space-x-2 mt-2">
                      <FaPersonCirclePlus />
                      <Link href="../../../Admin-Dashboard/Patient-Details">
                        <p>Add-patient</p>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Icon */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <CiBellOn />
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">5 Notifications</span>
                <span className="text-info">You have 5 new notifications</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View notifications</button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Icon */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full mr-2">
                <img
                  alt="Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
