import {React, useHistory, useState} from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import Logo from "../Logo/Logo";
import { CiLogout } from "react-icons/ci";

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
            <span className="flex flex-row justify-end px-2 py-2 mt-96 space-x-4 ml-4 w-52 text-slate-700 hover:text-black cursor-pointer ">
              <div className="pl-4 flex flex-row mx-1 mb-0" onClick={()=>{}}>
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
