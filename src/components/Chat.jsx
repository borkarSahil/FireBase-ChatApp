import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { UserChatContext } from "../context/UserChatContext";

const Chat = () => {
  const { data } = useContext(UserChatContext);
  // console.log("data", data.user.displayName);
  return (
    <div className="flex flex-col">
      <div
        style={{ backgroundColor: "#EEEEEE" }}
        // className=" flex justify-between items-center p-5"
        className="p-5"
      >
        <div className="flex justify-between items-center">
          <div
            style={{ backgroundColor: "#EEEEEE", color: "#00ADB5" }}
            className="font-bold"
          >
            Chat
          </div>
          <div className="flex items-center">
            {data.user.photoURL ? (
              <img
                className="h-6 w-6 rounded-full"
                src={data.user.photoURL}
                alt="img"
              />
            ) : (
              ""
            )}
            <div className="ml-3">{data.user?.displayName}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <Messages />
      </div>

      <div className="">
        <Input />
      </div>
    </div>
  );
};

export default Chat;
