import { useEffect, useState } from "react";
import "./App.css";
import { Mybox } from "./components/box/box";

function App() {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setUserList(data);
        console.log(data);
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

  return (
    <div className="">
      <div className="my-10 mx-10 border rounded-xl bg-white shadow h-[100vh]">
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
