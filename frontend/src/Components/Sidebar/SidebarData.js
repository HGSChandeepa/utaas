import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { FiActivity } from "react-icons/fi";
import { GrTask } from "react-icons/gr";
import { GrInProgress } from "react-icons/gr";
import { GrFavorite } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
export const SidebarData = [
    {
        title:'Dashboard',
        path:'/dashboard',
        icon:<RxDashboard />,
        cName:'nav-text'
        
    },
    {
        title: 'MyActivity',
        path: '/myactivity',
        icon: <FiActivity />,
        cName: 'nav-text'
    },
    {
        title:'Tasks',
        path:'/tasks',
        icon:<GrTask />,
        cName:'nav-text'
    },
    {
        title:'Progress',
        path:'/progress',
        icon:<GrInProgress />,
        cName:'nav-text'
    },
    {
        title:'Favorites',
        path:'/favorites',
        icon:<GrFavorite />,
        cName:'nav-text'
    },
    {
        title:'Profile',
        path:'/profile',
        icon:<CgProfile />,
        cName:'nav-text'
    }
];