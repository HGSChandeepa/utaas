import React from "react";
import Logo from "../Components/Logo/Logo";
import SideNavBar from "../Components/SideNavBar/SideNavBar";



const Dashboard = () => {
  return (
    <div className="flex flex-row">
      <div className="">
        <div className="place-items-start align-top items-center">
          <Logo />
        </div>
        <div className=" text-black w-64 h-full p-4">
          <SideNavBar />
        </div>
      </div>

      <div>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
