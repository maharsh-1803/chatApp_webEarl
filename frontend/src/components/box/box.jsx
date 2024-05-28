import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from 'axios'

const socket = io("https://chatapp-webearl.onrender.com"); // Adjust URL as needed

const fetchWithToken = async (url, options = {}) => {
  const token = localStorage.getItem("chatToken");
  const headers = {
    "Content-Type": "application/json",
    jwt: token,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data;
};

export const Mybox = ({ sendId }) => {
  const [token, setToken] = useState(localStorage.getItem("chatToken"));
  const [messages, setMessages] = useState([]);
  const [typeMessage, setTypeMessage] = useState("");

  useEffect(() => {
    const tokenGot = localStorage.getItem("chatToken");
    setToken(tokenGot);
  }, []);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get(
          `https://chatapp-webearl.onrender.com/api/messages/${sendId}`,
          {
            headers: {
              jwt: token,
            },
          }
        );
        console.log(response);
        setMessages(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    if (sendId) fetchUserList();
  }, [sendId]);

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const handleSend = async () => {
    try {
      const response = await axios.post(
        `https://chatapp-webearl.onrender.com/api/messages/send/${sendId}`,
        {
          message: typeMessage, // Body content
        },
        {
          headers: {
            jwt:  token, // Header with token
          },
        }
      );
      setMessages([...messages, response.data]);
      setTypeMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-end">
        {messages && messages.map((e) => <p key={e._id}>{e.message}</p>)}
      </div>
      <div className="flex mt-auto">
        <input
          type="text"
          className="border bg-transparent px-5"
          value={typeMessage}
          onChange={(e) => setTypeMessage(e.target.value)}
        />
        <button className="border" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};
