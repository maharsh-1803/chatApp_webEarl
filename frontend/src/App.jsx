import { useEffect, useState } from "react";
import "./App.css";
import { Mybox } from "./components/box/box";
import axios from 'axios'

function App() {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(
          "https://chatapp-webearl.onrender.com/api/users",
          {
            headers: {
              jwt: token,
            },
          }
        );
        const data = await response.json();
        setUserList(data.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getConversations();
  }, []);

  const [sendId, setSendId] = useState("");

  const showMessage = (e) => {
    setSendId(e);
    console.log(e);
  };

  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState(localStorage.getItem("chatToken"));

  useEffect(() => {
    const tokenGot = localStorage.getItem("chatToken");
    setToken(tokenGot);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `https://chatapp-webearl.onrender.com/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "maharsh",
            password: "maharsh123",
          }),
        }
      );

      if (!response.ok) {
        // Handle non-2xx HTTP responses
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      // Optionally store the token
      localStorage.setItem("chatToken", data.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="my-10 mx-10 border rounded-xl bg-white shadow h-[100vh]">
        <div>
          <input
            type="text"
            className="border bg-yellow-500"
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="text"
            className="border bg-red-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="border">
            login
          </button>
          {token && <button>Log Out</button>}
        </div>
        <div className="grid grid-cols-[1fr,2fr]">
          <div className="border-r-2 border-gray-400 pt-8 px-10 ">
            {userList &&
              userList.map((e) => (
                <p
                  key={e._id}
                  className="font-semibold text-gray-300 py-2 text-xl cursor-pointer"
                  onClick={() => showMessage(e._id)}
                >
                  {e.username}
                </p>
              ))}
          </div>
          <div>
            <Mybox sendId={sendId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
