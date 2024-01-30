import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const SideBar = () => {
  return (
    <div
      //  className="w-62 text-white "
      className=" text-white bg-e3d5ca"
    >
      <div
        style={{ backgroundColor: "#EEEEEE", color: "#00ADB5" }}
        className="text-2xl font-bold mb-4 p-4"
      >
        LINK UP
      </div>

      <Search />
      <Chats />
    </div>
  );
};

export default SideBar;
