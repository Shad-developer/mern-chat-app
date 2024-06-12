import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MsgContainer from "../../components/messages/MsgContainer";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-sky-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-1">
      <Sidebar />
      <MsgContainer />
    </div>
  );
};

export default Home;
