import React from 'react'
import SideBar from '../../Components/Sidebar/SideBar'


const Favorites = () => {
  return (
    <div className="flex flex-row">
      <div className="">
        <div className="place-items-start align-top items-center">
        <SideBar />
        </div>
        <div className=" text-black w-64 h-full p-4">
          
        </div>
      </div>

      <div>
        <h1>Favorites</h1>
      </div>
    </div>
    
  )
}

export default Favorites