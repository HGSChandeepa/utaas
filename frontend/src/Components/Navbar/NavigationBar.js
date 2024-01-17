import React from "react";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import Search from "../Search/Search";

const NavigationBar = () => {
  const options = ["Profile", "Settings", "Logout"];
  const handleSelect =(selectedOption) => {
    
  };
  const navigate = () => {
    window.location.href = "/profile";
  };
  return (
    <div className="flex justify-around flex-row">
      <div>
        <Search  />
      </div>
      <div className="flex flex-row justify-normal">
        <CiSettings  onClick={navigate }/>
        <IoIosNotificationsOutline />
        <div>
            <DropDownMenu options={options} onSelect={handleSelect}/>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
