import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import Logo from "../Logo/Logo";
import { CiLogout } from "react-icons/ci";

function SideBar() {
  const [open, setOpen] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const location = window.location.pathname;
  const handleResize = () => {
    // Close the sidebar when the window width is less than or equal to a certain threshold (e.g., 768px)
    if (window.innerWidth <= 1200) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  // Add event listener for window resizing
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onClickHandler = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div>
        <nav
          className={`bg-white-300 h-full flex justify-center fixed top-0 left-0 transition-transform duration-350 bg-slate-50 px-5
         `}
        >
          <ul
          // className= {` ${
          //   open ? "w-72" : "w-16"
          // } `}
          >
            <Logo />
            {SidebarData.map((item, index) => (
              <li key={index} className={`${item.cName} nav-tex`}>
                <Link
                  to={item.path}
                  className="flex items-center text-black text-lg w-95 h-full pb-4 "
                  onClick={onClickHandler}
                >
                  <span
                   
                    className={`flex flex-row px-2 py-2 space-x-4 rounded-full  ml-4 w-52 border bg-blue-300 items-center
                     hover:bg-blue-500 hover:text-white 
                     ${isActive && location === item.path ? "bg-blue-900 text-white" : "text-black"}`}
                  >
                    <div className="pl-4">{item.icon}</div>
                    <div className={``}>{item.title}</div>
                  </span>
                </Link>
              </li>
            ))}
            <span className="flex flex-row justify-end px-2 py-2 mt-96 space-x-4 ml-4 w-52 text-slate-700 hover:text-black cursor-pointer ">
              <div className="pl-4 flex flex-row mx-1 mb-0" onClick={() => {}}>
                <CiLogout />
                <p className="ml-2 mb-2">Logout</p>
              </div>
            </span>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default SideBar;
