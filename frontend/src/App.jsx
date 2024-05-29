// import { useEffect, useState } from "react";
// import "./App.css";
// import { Mybox } from "./components/box/box";
// import axios from 'axios'

// function App() {
//   const [userList, setUserList] = useState([]);
//   console.log(userList);
//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/users",
//           {
//             headers: {
//               jwt: token,
//             },
//           }
//         );
//         setUserList(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getConversations();
//   }, []);

//   const [sendId, setSendId] = useState("");

//   const showMessage = (e) => {
//     setSendId(e);
//   };

//   const [number, setNumber] = useState("");
//   const [password, setPassword] = useState("");

//   const [token, setToken] = useState(localStorage.getItem("chatToken"));

//   useEffect(() => {
//     const tokenGot = localStorage.getItem("chatToken");
//     setToken(tokenGot);
//   }, []);

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/auth/login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             username: "maharsh",
//             password: "maharsh123",
//           }),
//         }
//       );

//       if (!response.ok) {
//         // Handle non-2xx HTTP responses
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       // Optionally store the token
//       localStorage.setItem("chatToken", data.data.token);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="">
//       <div className="my-10 mx-10 border rounded-xl bg-white shadow h-[100vh]">
//         <div>
//           <input
//             type="text"
//             className="border bg-yellow-500"
//             onChange={(e) => setNumber(e.target.value)}
//           />
//           <input
//             type="text"
//             className="border bg-red-500"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={handleLogin} className="border">
//             login
//           </button>
//           {token && <button onClick={localStorage.removeItem('chatToken')}>Log Out</button>}
//         </div>
//         <div className="grid grid-cols-[1fr,2fr]">
//           <div className="border-r-2 border-gray-400 pt-8 px-10 ">
//             {userList &&
//               userList.map((e) => (
//                 <p
//                   key={e._id}
//                   className="font-semibold text-gray-300 py-2 text-xl cursor-pointer"
//                   onClick={() => showMessage(e._id)}
//                 >
//                   {e.username}
//                 </p>
//               ))}
//           </div>
//           <div>
//             <Mybox sendId={sendId} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


// import { useEffect, useState } from "react";
// import "./App.css";
// import { Mybox } from "./components/box/box";
// import axios from 'axios';

// function App() {
//   const [userList, setUserList] = useState([]);
//   const [sendId, setSendId] = useState("");
//   const [number, setNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [token, setToken] = useState(localStorage.getItem("chatToken"));

//   useEffect(() => {
//     const tokenGot = localStorage.getItem("chatToken");
//     setToken(tokenGot);
//   }, []);

//   useEffect(() => {
//     if (token) {
//       const getConversations = async () => {
//         try {
//           const response = await axios.get(
//             "http://localhost:5000/api/users",
//             {
//               headers: {
//                 jwt: token,
//               },
//             }
//           );
//           setUserList(response.data);
//         } catch (error) {
//           console.log(error);
//         }
//       };

//       getConversations();
//     }
//   }, [token]);

//   const showMessage = (e) => {
//     setSendId(e);
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/auth/login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             username:number,
//             password:password,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       localStorage.setItem("chatToken", data.data.token);
//       setToken(data.data.token); // Update state with new token
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("chatToken");
//     setToken(null);
//     setUserList([]);
//   };

//   return (
//     <div className="">
//       <div className="my-10 mx-10 border rounded-xl bg-white shadow h-[100vh]">
//         <div>
//           <input
//             type="text"
//             className="border bg-yellow-500"
//             onChange={(e) => setNumber(e.target.value)}
//           />
//           <input
//             type="text"
//             className="border bg-red-500"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={handleLogin} className="border">
//             Login
//           </button>
//           {token && (
//             <button onClick={handleLogout} className="border">
//               Log Out
//             </button>
//           )}
//         </div>
//         <div className="grid grid-cols-[1fr,2fr]">
//           <div className="border-r-2 border-gray-400 pt-8 px-10 ">
//             {userList &&
//               userList.map((e) => (
//                 <p
//                   key={e._id}
//                   className="font-semibold text-gray-300 py-2 text-xl cursor-pointer"
//                   onClick={() => showMessage(e._id)}
//                 >
//                   {e.username}
//                 </p>
//               ))}
//           </div>
//           <div>
//             <Mybox sendId={sendId} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


// import { useEffect, useState } from "react";
// import "./App.css";
// import { Mybox } from "./components/box/box";
// import axios from 'axios';

// function App() {
//   const [userList, setUserList] = useState([]);
//   const [sendId, setSendId] = useState("");
//   const [number, setNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [token, setToken] = useState(localStorage.getItem("chatToken"));
//   const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("username")); // New state for logged-in user

//   useEffect(() => {
//     const tokenGot = localStorage.getItem("chatToken");
//     setToken(tokenGot);
//   }, []);

//   useEffect(() => {
//     if (token) {
//       const getConversations = async () => {
//         try {
//           const response = await axios.get(
//             "http://localhost:5000/api/users",
//             {
//               headers: {
//                 jwt: token,
//               },
//             }
//           );
//           setUserList(response.data);
//         } catch (error) {
//           console.log(error);
//         }
//       };

//       getConversations();
//     }
//   }, [token]);

//   const showMessage = (e) => {
//     setSendId(e);
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/auth/login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             username: number,
//             password: password,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       localStorage.setItem("chatToken", data.data.token);
//       localStorage.setItem("username", number); // Store logged-in username
//       setToken(data.data.token); // Update state with new token
//       setLoggedInUser(number); // Update state with logged-in user
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("chatToken");
//     localStorage.removeItem("username");
//     setToken(null);
//     setUserList([]);
//     setLoggedInUser(null);
//   };

//   return (
//     <div className="">
//       <div className="my-10 mx-10 border rounded-xl bg-white shadow h-[100vh]">
//         <div>
//           <input
//             type="text"
//             className="border bg-yellow-500"
//             onChange={(e) => setNumber(e.target.value)}
//           />
//           <input
//             type="text" // Changed to password input type for security
//             className="border bg-red-500"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={handleLogin} className="border">
//             Login
//           </button>
//           {token && (
//             <button onClick={handleLogout} className="border">
//               Log Out
//             </button>
//           )}
//         </div>
//         <div className="grid grid-cols-[1fr,2fr]">
//           <div className="border-r-2 border-gray-400 pt-8 px-10 ">
//             {userList &&
//               userList
//                 .filter((user) => user.username !== loggedInUser) // Filter out the logged-in user
//                 .map((user) => (
//                   <p
//                     key={user._id}
//                     className="font-semibold text-gray-300 py-2 text-xl cursor-pointer"
//                     onClick={() => showMessage(user._id)}
//                   >
//                     {user.username}
//                   </p>
//                 ))}
//           </div>
//           <div>
//             <Mybox sendId={sendId} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/Homepage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} /> {/* Pass setIsLoggedIn to Login component */}
      </Routes>
    </Router>
  );
}

export default App;