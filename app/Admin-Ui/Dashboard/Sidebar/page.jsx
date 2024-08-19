"use client"


import { useEffect, useState } from 'react';
import styles from './sidebar.module.css';
import MenuLink from './menuLink/menuLink';
import { MdDashboard } from "react-icons/md";
import { FaClinicMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { BsGear } from "react-icons/bs";
import { RiUser3Fill } from "react-icons/ri";
import Image from 'next/image';

const menuItems = [
  {
    title: "",
    list: [
      {
        title: "Dashboard",
        path: "/Admin-Dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Create-Clinic",
        path: "/Admin-Dashboard/Create-clinic",
        icon: <FaClinicMedical />,
      },
      {
        title: "Create-Dentist",
        path: "/Admin-Dashboard/Create-dentist",
        icon: <FaUserDoctor />,
      },
      {
        title: "Patient-settings",
        path:"/Admin-Dashboard/Patient-Details",
        icon:<RiUser3Fill />
      },
      {
        title: "Clinic-settings",
        path: "/Admin-Dashboard/Clinic-settings",
        icon: <BsGear />,
      },
      
    ]
  }
]

export default function Sidebar() {
  // State variables for settings
  const [sidebarColor, setSidebarColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [textStyle, setTextStyle] = useState('Arial');
  const [fontSize, setFontSize] = useState();

  // Load settings from local storage
  useEffect(() => {
    const savedSidebarColor = localStorage.getItem('sidebarColor');
    const savedTextColor = localStorage.getItem('textColor');
    const savedTextStyle = localStorage.getItem('textStyle');
    const savedFontSize = localStorage.getItem('fontSize');

    if (savedSidebarColor) setSidebarColor(savedSidebarColor);
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
  localStorage.setItem('navbarColor', navbarColor);
  localStorage.setItem('textColor', textColor);
  localStorage.setItem('textStyle', textStyle);
  localStorage.setItem('fontSize', fontSize);
};





  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: sidebarColor,
        color: textColor,
        fontFamily: textStyle,
        fontSize: `${fontSize}px`
        
      }}
    >
      <div className={styles.user}>
        <Image quality={100} className={styles.userImage} src="/images1.png" alt="images.jpg" width="150" height="0" />
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map(item => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}
