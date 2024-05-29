// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import axios from 'axios'

// const socket = io("http://localhost:3000"); // Adjust URL as needed

// const fetchWithToken = async (url, options = {}) => {
//   const token = localStorage.getItem("chatToken");
//   const headers = {
//     "Content-Type": "application/json",
//     jwt: token,
//     ...options.headers,
//   };

//   const response = await fetch(url, { ...options, headers });
//   const data = await response.json();
//   if (data.error) throw new Error(data.error);
//   return data;
// };

// export const Mybox = ({ sendId }) => {
//   const [token, setToken] = useState(localStorage.getItem("chatToken"));
//   const [messages, setMessages] = useState([]);
//   const [typeMessage, setTypeMessage] = useState("");

//   useEffect(() => {
//     const tokenGot = localStorage.getItem("chatToken");
//     setToken(tokenGot);
//   }, []);

//   useEffect(() => {
//     const fetchUserList = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/messages/${sendId}`,
//           {
//             headers: {
//               jwt: token,
//             },
//           }
//         );
//         console.log(response);
//         setMessages(response.data)
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     if (sendId) fetchUserList();
//   }, [sendId]);

//   useEffect(() => {
//     socket.on("newMessage", (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     return () => {
//       socket.off("newMessage");
//     };
//   }, []);

//   const handleSend = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/messages/send/${sendId}`,
//         {
//           message: typeMessage, // Body content
//         },
//         {
//           headers: {
//             jwt:  token, // Header with token
//           },
//         }
//       );
//       setMessages([...messages, response.data]);
//       setTypeMessage("");
//     } catch (error) {
//       console.log(error);
//     }
//   };
  

//   return (
//     <div className="flex flex-col">
//       <div className="flex flex-col justify-end">
//         {messages && messages.map((e) => <p key={e._id}>{e.message}</p>)}
//       </div>
//       <div className="flex mt-auto">
//         <input
//           type="text"
//           className="border bg-transparent px-5"
//           value={typeMessage}
//           onChange={(e) => setTypeMessage(e.target.value)}
//         />
//         <button className="border" onClick={handleSend}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };


// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import axios from 'axios';

// const socket = io("http://localhost:3000"); // Adjust URL as needed

// export const Mybox = ({ sendId }) => {
//   const [token, setToken] = useState(localStorage.getItem("chatToken"));
//   const [messages, setMessages] = useState([]);
//   const [typeMessage, setTypeMessage] = useState("");

//   useEffect(() => {
//     const tokenGot = localStorage.getItem("chatToken");
//     setToken(tokenGot);
//   }, []);

//   useEffect(() => {
//     if (sendId && token) {
//       const fetchMessages = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:5000/api/messages/${sendId}`,
//             {
//               headers: {
//                 jwt: token,
//               },
//             }
//           );
//           setMessages(response.data);
//         } catch (error) {
//           if (error.response && error.response.status === 401) {
//             console.log('Unauthorized access - possibly due to an invalid token.');
//           } else {
//             console.log(error);
//           }
//         }
//       };

//       fetchMessages();
//     }
//   }, [sendId, token]);

//   useEffect(() => {
//     socket.on("newMessage", (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     return () => {
//       socket.off("newMessage");
//     };
//   }, []);

//   const handleSend = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/messages/send/${sendId}`,
//         {
//           message: typeMessage, // Body content
//         },
//         {
//           headers: {
//             jwt: token, // Header with token
//           },
//         }
//       );
//       setMessages([...messages, response.data]);
//       setTypeMessage("");
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         console.log('Unauthorized access - possibly due to an invalid token.');
//       } else {
//         console.log(error);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col">
//       <div className="flex flex-col justify-end">
//         {messages && messages.map((e) => <p key={e._id}>{e.message}</p>)}
//       </div>
//       <div className="flex mt-auto">
//         <input
//           type="text"
//           className="border bg-transparent px-5"
//           value={typeMessage}
//           onChange={(e) => setTypeMessage(e.target.value)}
//         />
//         <button className="border" onClick={handleSend}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import axios from 'axios';

// const socket = io("http://localhost:3000"); // Adjust URL as needed

// export const Mybox = ({ sendId }) => {
//   const [token, setToken] = useState(localStorage.getItem("chatToken"));
//   const [messages, setMessages] = useState([]);
//   const [typeMessage, setTypeMessage] = useState("");

//   useEffect(() => {
//     const tokenGot = localStorage.getItem("chatToken");
//     setToken(tokenGot);
//   }, []);

//   useEffect(() => {
//     if (sendId && token) {
//       const fetchMessages = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:5000/api/messages/${sendId}`,
//             {
//               headers: {
//                 jwt: token,
//               },
//             }
//           );
//           setMessages(response.data);
//         } catch (error) {
//           if (error.response && error.response.status === 401) {
//             console.log('Unauthorized access - possibly due to an invalid token.');
//           } else {
//             console.log(error);
//           }
//         }
//       };

//       fetchMessages();
//     }
//   }, [sendId, token]);

//   useEffect(() => {
//     socket.on("newMessage", (newMessage) => {
//       if (newMessage.sendId === sendId) {
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//       }
//     });

//     return () => {
//       socket.off("newMessage");
//     };
//   }, [sendId,messages]);

//   const handleSend = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/messages/send/${sendId}`,
//         {
//           message: typeMessage, // Body content
//         },
//         {
//           headers: {
//             jwt: token, // Header with token
//           },
//         }
//       );

//       const sentMessage = response.data;
//       setMessages([...messages, sentMessage]);
//       setTypeMessage("");

//       // Emit the new message to the server
//       socket.emit("sendMessage", sentMessage);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         console.log('Unauthorized access - possibly due to an invalid token.');
//       } else {
//         console.log(error);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col">
//       <div className="flex flex-col justify-end">
//         {messages && messages.map((e) => <p key={e._id}>{e.message}</p>)}
//       </div>
//       <div className="flex mt-auto">
//         <input
//           type="text"
//           className="border bg-transparent px-5"
//           value={typeMessage}
//           onChange={(e) => setTypeMessage(e.target.value)}
//         />
//         <button className="border" onClick={handleSend}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from 'axios';

const socket = io("http://localhost:3000"); // Adjust URL as needed

export const Mybox = ({ sendId }) => {
  const [token, setToken] = useState(localStorage.getItem("chatToken"));
  const [messages, setMessages] = useState([]);
  const [typeMessage, setTypeMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const tokenGot = localStorage.getItem("chatToken");
    setToken(tokenGot);

    // Fetch logged-in user's details if necessary
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/me`, {
          headers: {
            jwt: tokenGot,
          },
        });
        setLoggedInUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (tokenGot) {
      fetchUserDetails();
    }
  }, []);

  useEffect(() => {
    if (sendId && token) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/messages/${sendId}`,
            {
              headers: {
                jwt: token,
              },
            }
          );
          setMessages(response.data);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            console.log('Unauthorized access - possibly due to an invalid token.');
          } else {
            console.log(error);
          }
        }
      };

      fetchMessages();
    }
  }, [sendId, token]);

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      if (newMessage.sendId === sendId || newMessage.receiveId === sendId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [sendId, messages]);

  const handleSend = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/messages/send/${sendId}`,
        {
          message: typeMessage, // Body content
        },
        {
          headers: {
            jwt: token, // Header with token
          },
        }
      );

      const sentMessage = response.data;
      setMessages([...messages, sentMessage]);
      setTypeMessage("");

      // Emit the new message to the server
      socket.emit("sendMessage", sentMessage);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized access - possibly due to an invalid token.');
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex flex-col flex-grow overflow-y-auto mb-4">
        {messages && messages.map((message) => (
          <div
            key={message._id}
            className={`p-3 rounded-lg mb-2 max-w-xs ${message.senderId === loggedInUser?._id ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}
          >
            <p>{message.message}</p>
          </div>
        ))}
      </div>
      <div className="flex mt-auto">
        <input
          type="text"
          className="border rounded-lg p-2 flex-grow mr-2"
          placeholder="Type a message"
          value={typeMessage}
          onChange={(e) => setTypeMessage(e.target.value)}
        />
        <button
          className="border rounded-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};
