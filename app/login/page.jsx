// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import { useRouter } from 'next/navigation'; // Import useRouter for redirection
// import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify for notifications

// export default function Login() {
//   const [emailOrdentistid, setemailOrdentistid] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter(); // Initialize useRouter

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make a POST request to the backend login API
//       const response = await axios.post("/api/login", { emailOrdentistid, password });
      
//       // Handle success (e.g., redirect or display success message)
//       toast.success("Login successful!",
//         {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         }
//       );
      
//       // Example redirection based on user role
//       if (response.data.role === "admin") {
//         router.push("/Admin-Dashboard");
//       } else if (response.data.role === "dentist") {
//         router.push("/Doctor-Dashboard");
//       }
//     } catch (error) {
//       // Handle error (e.g., display error message)
//       toast.error("Login failed. Please check your credentials.",
//         {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         }
//       );
//     }
//   };

//   return (
//     <div className="container -mb-20">
//       <div className="grid grid-cols-12 gap-6">
//         <div className="col-span-6">
//         <Image
//             src="/Images1.png"
//             alt="First image"
//             width={200}
//             height={80}
//             quality={100}
//             className="image1"
//           />
//           <Image
//             src="/dentist-with-smile (2) 1.png"
//             alt="Second image"
//             width={700}
//             height={400}
//             quality={100}
//             className="image2"
//           />
//         </div>
//         <div className="items-center h-1 col-span-6 ">
//           <div className="flex w-full pl-8 card bg-base-100">
//             <div className="card-body">
//               <h1 className="text-4xl font-semibold text-center uppercase">Login</h1>
//               <h2 className="mt-4 text-center capitalize card-title">Welcome</h2>
//               <p className="text-center">Login into your account</p>
//               <form onSubmit={handleSubmit} className="flex flex-col items-start mt-6 gap-y-3">
//                 <label htmlFor="emailOrdentistid" className="text-sm font-medium capitalize">
//                   Email address or ID
//                 </label>
//                 <input
//                   type="text"
//                   id="emailOrdentistid"
//                   name="emailOrdentistid"
//                   placeholder="Enter your Email address or ID"
//                   value={emailOrdentistid}
//                   onChange={(e) => setemailOrdentistid(e.target.value)}
//                   className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
//                 />
//                 <label htmlFor="password" className="mt-4 text-sm font-medium capitalize">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
//                 />
//                 <button type="submit" className="w-full mt-2 btn btn-primary">Login</button>
//               </form>
//             </div>
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [emailOrdentistid, setemailOrdentistid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (!emailOrdentistid || !password) {
  //     toast.error("Please fill in all fields.",
  //       {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       }
  //     );
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const response = await axios.post("/api/login", { emailOrdentistid, password });
      
  //     const { token, role } = response.data;

  //     // Save the token to local storage (consider using cookies for better security)
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("role", role);

  //     toast.success("Login successful!",
  //       {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       }
  //     );

  //     // Redirect based on user role
  //     if (role === "admin") {
  //       router.push("/Admin-Dashboard");
  //     } else if (role === "dentist") {
  //       router.push("/Doctor-Dashboard");
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     toast.error("Login failed. Please check your credentials.",
  //       {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       }
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (!emailOrdentistid || !password) {
  //     toast.error("Please fill in all fields.");
  //     return;
  //   }
  
  //   setLoading(true);
  
  //   try {
  //     const response = await axios.post("/api/login", { emailOrdentistid, password });
  
  //     const { token, role } = response.data;
  
  //     // Store the token and role
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("role", role);
  
  //     console.log("Stored role:", role); // Debugging line
  
  //     toast.success("Login successful!");
  
  //     // Redirect based on role
  //     if (role === "admin") {
  //       router.push("/Admin-Dashboard");
  //     } else if (role === "dentist") {
  //       router.push("/Doctor-Dashboard");
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     toast.error("Login failed. Please check your credentials.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!emailOrdentistid || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post("/api/login", { emailOrdentistid, password });
      
      console.log("API response:", response.data); // Check the entire response
  
      const { token, role } = response.data;
  
      if (role) {
        // Store the token and role
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);
  
        console.log("Stored role:", role); // Confirm role storage
      } else {
        console.error("Role not found in response.");
        toast.error("Login failed. user not found.");
        return;
      }
  
      toast.success("Login successful!");
  
      // Redirect based on role
      if (role === "admin") {
        router.push("/Admin-Dashboard");
      } else if (role === "dentist") {
        router.push("/Doctor-Dashboard");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container -mb-20">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <Image
            src="/Images1.png"
            alt="First image"
            width={200}
            height={80}
            quality={100}
            className="image1"
          />
          <Image
            src="/dentist-with-smile (2) 1.png"
            alt="Second image"
            width={700}
            height={400}
            quality={100}
            className="image2"
          />
        </div>
        <div className="items-center h-1 col-span-6">
          <div className="flex w-full pl-8 card bg-base-100">
            <div className="card-body">
              <h1 className="text-4xl font-semibold text-center uppercase">Login</h1>
              {/* <h2 className="mt-4 ml-20 text-center capitalize card-title">Welcome</h2> */}
              <p className="text-center">Login into your account</p>
              <form onSubmit={handleSubmit} className="flex flex-col items-start mt-6 gap-y-3">
                <label htmlFor="emailOrdentistid" className="text-sm font-medium capitalize">
                  Email address or ID
                </label>
                <input
                  type="text"
                  id="emailOrdentistid"
                  name="emailOrdentistid"
                  placeholder="Enter your Email address or ID"
                  value={emailOrdentistid}
                  onChange={(e) => setemailOrdentistid(e.target.value)}
                  className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
                />
                <label htmlFor="password" className="mt-4 text-sm font-medium capitalize">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
                />
                <button
                  type="submit"
                  className={`w-full mt-2 btn btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
