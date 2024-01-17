import React from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import Logo from "../Logo/Logo";

function SideBar() {
  return (
    <>
      <div className="">
        <nav
          className={`bg-white-300 h-full flex justify-center fixed top-0 left-0 transition-transform duration-350 bg-slate-50 px-5`}
        >
          <ul className=" ">
            <Logo />
            {SidebarData.map((item, index) => (
              <li key={index} className={`${item.cName} nav-tex`}>
                <Link
                  to={item.path}
                  className="flex items-center text-black text-lg w-95 h-full pb-4 "
                >
                  <span
                    className="flex flex-row px-2 py-2 space-x-4 rounded-full  ml-4 w-52 border bg-blue-300 items-center hover:bg-blue-400 hover:text-white "
                    onClick={() => {}}
                  >
                    <div className="pl-4">{item.icon}</div>
                    <div>{item.title}</div>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default SideBar;
