import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import SideBar from "../../Components/Sidebar/SideBar";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const db = getFirestore();
        const userDataRef = doc(db, "users", userId);
        const userDataSnapshot = await getDoc(userDataRef);
        if (userDataSnapshot.exists()) {
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
        <div className="container mx-auto py-8">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {userData ? (
              <>
                <h1 className="text-2xl mb-4">
                  Welcome, {userData.firstName} {userData.lastName}
                </h1>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
                  <p className="text-gray-700">{userData.email}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Contact Number:
                  </label>
                  <p className="text-gray-700">{userData.contactNumber}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Department:
                  </label>
                  <p className="text-gray-700">{userData.department}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Role:
                  </label>
                  <p className="text-gray-700">{userData.role}</p>
                </div>
                {/* Add more fields as needed */}
              </>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
