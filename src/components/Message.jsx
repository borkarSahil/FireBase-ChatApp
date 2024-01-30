import React, { useContext, useEffect, useRef } from "react";
import { UserChatContext } from "../context/UserChatContext";
import { AuthContext } from "../context/AuthContext";

const Message = ({ message }) => {
  // console.log("Message", message);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(UserChatContext);

  const isOwner = message.senderId && message.senderId === currentUser.uid;
  //  console.log(
  //    "Current user img : ",
  //    currentUser.photoURL,
  //    "Daar",
  //    data.user.photoURL
  //  );
  //  console.log("Message:", currentUser.displayName);
  //  console.log("Current user ID:", message.id);
  //  console.log("Message sender ID:", message.senderId);
  //  console.log("isOwner:", isOwner);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div
        ref={ref}
        style={{ flexDirection: isOwner ? "row-reverse" : "row" }}
        className={`message-container ${isOwner ? "owner" : "other-user"} flex`}
      >
        <div className="flex flex-col m-1 mb-2">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full"
              src={isOwner ? currentUser.photoURL : data.user.photoURL}
              alt="img"
            />
            <span className="ml-2">
              {isOwner ? currentUser.displayName : data.user.displayName}
            </span>
          </div>

          <div
            className={`p-2 bg-zinc-300 rounded m-2 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ${
              message.img ? "max-w-xs" : ""
            }`}
          >
            <div>
              <p>{message.text}</p>
              <div>
                {message.img && (
                  <img className="max-w-full mt-2" src={message.img} alt="" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
