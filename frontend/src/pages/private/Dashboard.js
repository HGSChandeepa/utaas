import React from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import Card from "../../Components/Card/Card";

const Dashboard = () => {
  return (
    <div className="flex flex-row ml-10 mt-10">
      <div className="">
        <div className="place-items-start align-top items-center">
          <SideBar />
        </div>
        <div className=" text-black w-64 h-full p-4"></div>
      </div>

      <div>
        <h1>Dashboard</h1>
        <div>
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
