import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firesbaseConfig";
import { AuthContext } from "../context/AuthContext";
import { doc } from "firebase/firestore";

const Search = () => {
  const [searchName, setSearchName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setRrr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const searchUser = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", searchName)
    );

    console.log("q", q);

    try {
      const querySnapshot = await getDocs(q);
      console.log("querySnapshot", querySnapshot);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
      console.log("search query snapshot");
    } catch (error) {
      console.log("Search : ", error);
      setRrr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && searchUser();
  };

  const handleSelect = async () => {
    // Check whether the grp (chats between 2 in firestore) exits ,if not create
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      // If chats between the current user and search user exits
      const res = await getDoc(doc(db, "chats", combineId));

      // If chats does not exist
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        // create a userChats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log("handleSelect Error ", error);
    }

    setUser(null);
    setSearchName("");
  };

  return (
    <>
      <div style={{ backgroundColor: "#393E46" }} className="flex">
        <div className="p-2 rounded">
          <input
            type="text"
            placeholder="Search Users"
            value={searchName}
            onKeyDown={handleKey} // for keyboard tracking
            onChange={(e) => setSearchName(e.target.value)}
            className="border p-2 rounded-md focus:outline-none focus:border-black-500 text-slate-700"
          />
        </div>

        <div className="p-2">
          <button
            onClick={handleKey}
            className="bg-slate-100 px-2 py-2 text-gray-950 rounded-md hover:bg-slate-200 focus:outline-none"
          >
            Search
          </button>
        </div>
      </div>

      <div
        className="bg-gray-100 overflow-y-auto"
        style={{ backgroundColor: "#393E46" }}
      >
        {user && (
          <div
            className="text-lg flex flex-row p-2 hover:bg-gray-200 hover:text-black"
            onClick={handleSelect}
          >
            <img
              className="h-10 w-10 rounded-full m-2"
              src={user.photoURL}
              alt=""
            />
            <span className="p-2 ">{user.displayName}</span>
          </div>
        )}
        <div className="bg-white h-px w-full mt-2"></div>
      </div>
    </>
  );
};

export default Search;
