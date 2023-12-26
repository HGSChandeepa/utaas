import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  GrInProgress,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

const SideNavBar = () => {
  return (
    <div>
      <Sidebar className="">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}
            className='border bg-blue-200 rounded-md py-2 px-3 mb-4 text-grey-darker w-60 ' >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards}
             className='border  bg-blue-200 rounded-md py-2 px-3 mb-4 text-grey-darker w-60 '>
              My Activities
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox}  className='border bg-blue-200 rounded-md py-2 px-3 mb-4 text-grey-darker w-60 ' >
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}  className='border bg-blue-200 rounded-md py-2 px-3 mb-4 text-grey-darker w-60 '>
              Progress
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}  className='border bg-blue-200 rounded-md py-2 px-3 mb-4 text-grey-darker w-60 '>
              Favorites
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser} className='border bg-blue-200 rounded-md py-2 px-3 mb-4 text-grey-darker w-60 '>
              Profile
            </Sidebar.Item>
            
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SideNavBar;
