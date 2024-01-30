import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../config/firesbaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
import { UserChatContext } from "../context/UserChatContext";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(UserChatContext);
  // console.log("ChatId",data.chatId);

  const handleSend = async () => {
    // If image is included
    if (img) {
      try {
        const storageRef = ref(storage, uuidv4());
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          (error) => {
            console.log("File upload error in Input", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuidv4(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
            );
          }
        );
      } catch (error) {
        console.log("Input Images Error ", error);
      }
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div
      // className="bg-slate-200 p-1"
      // className="bg-slate-200 w-full"
      className=" p-8 fixed bottom-40 w-4/6 "
    >
      <hr />
      <div
        // className="flex"
        className="flex items-center"
        // className="flex items-center space-x-2"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 m-2 flex-grow border rounded"
          type="text"
          placeholder="Type something..."
        />

        <div className="p-2 m-2">
          <input
            type="file"
            className="hidden"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label
            htmlFor="file"
            className="bg-blue-500 hover:bg-sky-500 text-white p-2 rounded m-2 transition-colors cursor-pointer"
          >
            Upload
          </label>
        </div>
        <button
          onClick={handleSend}
          className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded m-2 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
