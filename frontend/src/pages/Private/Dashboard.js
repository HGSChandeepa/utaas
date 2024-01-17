import React from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import FormComponentExamDuty from "../../Components/forms/ExamDuty";
import FormComponentPaperMarking from "../../Components/forms/PaperMarking";
import FormComponentVehicleReservation from "../../Components/forms/VehicalReservation";
const Dashboard = () => {
  return (
    <div className="flex flex-row ml-10 mt-10">
      <div className="">
        <div className="place-items-start align-top items-center">
          <SideBar />
        </div>
        <div className=" text-black w-64 h-full p-4"></div>
      </div>

      <div className=" flex gap-10">
        <FormComponentExamDuty />
        <FormComponentPaperMarking />
        <FormComponentVehicleReservation />
      </div>
    </div>
  );
};

export default Dashboard;
