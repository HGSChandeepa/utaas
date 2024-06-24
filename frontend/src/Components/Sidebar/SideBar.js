import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { SidebarData } from "./SidebarData";

const SideBar = () => {
  const [open, setOpen] = useState(true);

  const handleResize = () => {
    setOpen(window.innerWidth >= 1200);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="grid grid-flow-col overflow-hidden h-full">
      <section className="flex gap-6">
        <div
          className={`bg-slate-100 min-h-screen ${
            open ? "w-72" : "w-16"
          } duration-500 text-black-100 px-4`}
        >
          <div className="py-3 flex justify-between">
            <h1
              className={`${
                !open && "hidden"
              } ml-2 text-3xl text-ellipsis text-[#4743E0] font-semibold `}
            >
              LOGO
            </h1>
            <HiMenu
              size={22}
              className={`${!open} ml-1 cursor-pointer  justify-end opacity-50 `}
              style={{
                transitionDelay: `${3}00ms`,
              }}
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-5 flex flex-col gap-1 relative">
            {SidebarData.map((menu, i) => (
              <Link
                to={menu.path}
                key={i}
                className={` ${
                  menu.margin && "mt-5"
                } group flex items-center text-md opacity-70  rounded-xl gap-4 font-normal p-2 hover:bg-blue-200 hover:text-blue-500`}
              >
                <div>{React.createElement(menu.icon, { size: "20" })}</div>
                <h2
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden "
                  }`}
                >
                  {menu.title}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu.title}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SideBar;
