// import  { useState, useEffect } from 'react';
// import axios from 'axios';

// function HomePage() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     // Fetch list of registered users
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('https://chatapp-webearl.onrender.com/api/users', {
//           headers: {
//             'jwt': localStorage.getItem('token'), 
//           },
//         });
//         setUsers(response.data.filter(user => user.username !== localStorage.getItem('username')));
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleUserClick = async (userId) => {
//     try {
//       const response = await axios.get(`https://chatapp-webearl.onrender.com/api/messages/${userId}`, {
//         headers:{
//           'jwt': localStorage.getItem('token'), // Assuming token is stored in localStorage after login
//         },
//       });
//       setMessages(response.data);
//       setSelectedUser(userId);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

//   const handleSendMessage = async () => {
//     try {
//       const response = await axios.post(`https://chatapp-webearl.onrender.com/api/messages/send/${selectedUser}`, {
//         message: newMessage,
//       }, {
//         headers: {
//           'jwt': localStorage.getItem('token'),
//           'Content-Type': 'application/json',
//         },
//       });
//       // Update messages state with the sent message
//       setMessages([...messages, response.data]);
//       // Clear the newMessage state
//       setNewMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };
  

//   return (
//     <div className="flex justify-between p-4">
//       {/* Users list */}
//       <div className="w-1/3">
//         <h2 className="text-xl font-bold mb-4">Registered Users</h2>
//         <ul>
//           {users.map(user => (
//             <li key={user._id} className="cursor-pointer hover:text-blue-500" onClick={() => handleUserClick(user._id)}>
//               {user.username}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat section */}
//       <div className="w-2/3">
//         {selectedUser ? (
//           <>
//             <h2 className="text-xl font-bold mb-4">Chat with {users.find(user => user._id === selectedUser)?.username}</h2>
//             <div>
//               {messages.map(message => (
//                 <div key={message._id} className="mb-2">
//                   <strong>{message.senderId === selectedUser ? 'Them:' : 'You:'}</strong> {message.message}
//                 </div>
//               ))}
//             </div>
//             <div className="flex items-center mt-4">
//               <input
//                 type="text"
//                 className="w-full border rounded px-3 py-2 mr-2"
//                 placeholder="Type your message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               />
//               <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//                 onClick={handleSendMessage}
//                 disabled={!newMessage.trim()}
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-500">Select a user to start chatting</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default HomePage;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io("https://chatapp-webearl.onrender.com"); // Adjust URL as needed

function HomePage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch list of registered users
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://chatapp-webearl.onrender.com/api/users', {
          headers: {
            'jwt': localStorage.getItem('token'), 
          },
        });
        setUsers(response.data.filter(user => user.username !== localStorage.getItem('username')));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Set up Socket.io event listeners
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('receiveMessage', (newMessage) => {
      if (newMessage.senderId === selectedUser || newMessage.receiverId === selectedUser) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('receiveMessage');
    };
  }, [selectedUser]);

  const handleUserClick = async (userId) => {
    try {
      const response = await axios.get(`https://chatapp-webearl.onrender.com/api/messages/${userId}`, {
        headers:{
          'jwt': localStorage.getItem('token'), // Assuming token is stored in localStorage after login
        },
      });
      setMessages(response.data);
      setSelectedUser(userId);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(`https://chatapp-webearl.onrender.com/api/messages/send/${selectedUser}`, {
        message: newMessage,
      }, {
        headers: {
          'jwt': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      });

      // Update messages state with the sent message
      const sentMessage = response.data;
      setMessages([...messages, sentMessage]);
      setNewMessage('');

      // Emit the new message to the server
      socket.emit('sendMessage', sentMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex justify-between p-4">
      {/* Users list */}
      <div className="w-1/3">
        <h2 className="text-xl font-bold mb-4">Registered Users</h2>
        <ul>
          {users.map(user => (
            <li key={user._id} className="cursor-pointer hover:text-blue-500" onClick={() => handleUserClick(user._id)}>
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat section */}
      <div className="w-2/3">
        {selectedUser ? (
          <>
            <h2 className="text-xl font-bold mb-4">Chat with {users.find(user => user._id === selectedUser)?.username}</h2>
            <div>
              {messages.map(message => (
                <div key={message._id} className="mb-2">
                  <strong>{message.senderId === selectedUser ? 'Them:' : 'You:'}</strong> {message.message}
                </div>
              ))}
            </div>
            <div className="flex items-center mt-4">
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mr-2"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
