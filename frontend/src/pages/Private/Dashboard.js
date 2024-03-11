import React, { useEffect, useState } from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        console.log(userId);
        const db = getFirestore();
        const userDataRef = doc(db, "users", userId);
        const userDataSnapshot = await getDoc(userDataRef);
        if (userDataSnapshot.exists()) {
          console.log(userDataSnapshot.data());
          setUserData(userDataSnapshot.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-row ml-10 mt-10">
      <div className="">
        <div className="place-items-start align-top items-center">
          <SideBar />
        </div>
        <div className=" text-black w-64 h-full p-4"></div>
      </div>

      <div className=" flex gap-10">
        <div className="flex  justify-between gap-[600px] items-center">
          <div>
            {userData ? (
              <div className=" flex gap-3">
                <p className=" text-xl">Hello</p>
                <p className=" text-xl font-semibold text-blue-600">
                  {" "}
                  {userData.firstName}
                </p>
                <p className=" text-xl font-semibold text-blue-600">
                  {userData.lastName}
                </p>
                <p className=" text-xl"> Welcome Back!</p>
              </div>
            ) : (
              <span>Loading...</span>
            )}
          </div>
          <div>
            <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {userData.role} Account
            </div>
          </div>
        </div>
      </div>
      {/* applicable forms */}
      <div></div>
    </div>
  );
};

export default Dashboard;
