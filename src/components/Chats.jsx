import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../config/firesbaseConfig";
import { onSnapshot } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { UserChatContext } from "../context/UserChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(UserChatContext);

  const getChats = () => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data());
      console.log("Current data : ", doc.data());
    });

    return () => {
      unsub();
    };
  };

  useEffect(() => {
    currentUser.uid && getChats()
  }, [currentUser.uid]);

  console.log("Chats : ", Object.entries(chats));

  const handleSelect = (userInfo) => {
    dispatch({type: "CHANGE_USER", payload: userInfo});
  }



  return (
    <div
      className="bg-gray-100 overflow-y-auto h-96"
      style={{ backgroundColor: "#393E46" }}
    >
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="text-lg flex flex-row p-2 hover:bg-gray-200 hover:text-black"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              className="h-10 w-10 rounded-full"
              src={
                chat[1].userInfo.photoURL
                  ? chat[1].userInfo.photoURL
                  : "data:image/jpeg;base64,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"
              }
              alt="img"
            />
            <span className="p-2 ">{chat[1].userInfo.displayName}</span>
            <p className="p-2">{chat[1].lastMessage?.text}</p>
          </div>
        ))}
    </div>
  );
};

export default Chats;
