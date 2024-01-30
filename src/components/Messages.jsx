import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { UserChatContext } from "../context/UserChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firesbaseConfig";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(UserChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
      console.log("Current data : ", doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div
      className="messages-container m-3 max-h-72 overflow-y-auto"
    >
      {/*  <div className="text-xl font-bold mb-4">Messages</div> */}
      <div className="messages">
        {messages.map((msg) => (
          <Message message={msg} key={msg.id} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
