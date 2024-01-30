import React from "react";
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="border-2 mb-5 flex w-full p-5">
        <div
          style={{ backgroundColor: "#393E46" }}
          className="flex-2 border-r-2 border-white"
        >
          <SideBar />
        </div>
        <div style={{ backgroundColor: "#393E46" }} className="flex-1 relative">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;
