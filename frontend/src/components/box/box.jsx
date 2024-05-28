import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Adjust URL as needed

export const Mybox = ({ sendId }) => {
  const [messages, setMessages] = useState([]);
  const [TypeMessage, setTypeMessage] = useState('');

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(`/api/messages/${sendId}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (sendId) getMessages();
  }, [sendId]);

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  const handleSend = async () => {
    try {
      const res = await fetch(`/api/messages/send/${sendId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: TypeMessage }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-end">
        {messages && messages.map((e) => (
          <p key={e._id}>{e.message}</p>
        ))}
      </div>
      <div className="flex mt-auto">
        <input
          type="text"
          className="border bg-transparent"
          value={TypeMessage}
          onChange={(e) => setTypeMessage(e.target.value)}
        />
        <button className="border" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};
