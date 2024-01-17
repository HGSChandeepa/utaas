import React from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import { SiGoogleforms } from "react-icons/si";

import Forms from "../../Components/Forms/Forms";

const Dashboard = () => {
  return (
    <div className="flex flex-row ml-10 mt-10">
      <div className="">
        <div className="place-items-start align-top items-center">
          <SideBar />
        </div>
        <div className=" text-black w-64 h-full p-4"></div>
      </div>

      <div className='grid grid-cols-[200px_minmax(900px,_1fr)_100px]'>
        <h1>Dashboard</h1>
        <div className=''>
          <Forms description="Complete the following form to provide details about your availability and preferences for exam invigilation duties. Your input is crucial for efficient scheduling and ensuring a smooth examination process. Thank you for your cooperation!"
          title='EXAM DUTY'
          imgAlt='#'
          imgSrc={'https://www.flowbite-react.com/images/blog/image-1.jpg'}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
