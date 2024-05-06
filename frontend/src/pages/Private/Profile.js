import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { storage } from "../../config/firebase_configure";
import SideBar from "../../Components/Sidebar/SideBar";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../config/firebase_configure";
import { toast } from "react-toastify";
import { getAuth, updateProfile } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import default_profile from "../../assets/user.jpg";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(default_profile);
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = getDoc(docRef);
        //set the user data to the state
        docSnap
          .then((doc) => {
            if (doc.exists()) {
              const userData = doc.data();
              setUser(userData);
              setUserData(userData);
              // console.log("this is current user",currentUser);
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });
      } else {
        setUserData(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchurl = () => {
      if (user && user.uid) {
        const imageRef = ref(storage, `profile_pictures/${user.uid}`);
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            console.log("this is the url", url);
          })
          .catch((error) => {
            console.log("Error in setUrl", error.message);
          });
        setProfilePic(null);
      }
    };
    fetchurl();
  }, [user]);

  const handleInputPic = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  //prpofile pic upload
  const uploadpic = () => {
    const imageRef = ref(storage, `profile_pictures/${user.uid}`);
    const desertRef = ref(storage, `profile_pictures/${user.uid}`);
    if (profilePic === null) {
      toast.error("Please select a profile picture");
      return;
    } else {
      if (`profile_pictures/${user.uid}`) {
        deleteObject(desertRef)
          .then(() => {
            // toast.success("Profile Picture Deleted Successfully");
            console.log("File deleted successfully");
          })
          .catch((error) => {
            console.log("Error in deleting", error.message);
            toast.error("Error in deleting exist profile picture");
          });
      }

      uploadBytes(imageRef, profilePic)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setUrl(url);
              console.log("this is the url", url);
            })
            .catch((error) => {
              console.log(error.message, "Error in setUrl");
            });
          setProfilePic(null);
        })
        .catch((error) => {
          console.log("Error in uploading", error.message);
        });
      updateProfile(user, { url });
      toast.success("Profile Picture Uploaded Successfully");
      // window.location.reload();
    }
  };

  //input field changes save and store
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log(userData);
  };
  //update new details to the database
  const userDetailsUpdate = async (uid) => {
    const docRef = doc(firestore, "users", uid);
    try {
      await updateDoc(docRef, userData);
      window.location.reload();
      toast.success("User details updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Error updating user details");
    }
  };

  //#################log out
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out successfully");
        toast.success("User signed out successfully");
        navigate("/"); // Redirect to the landing page after logout
      })
      .catch((error) => {
        toast.error("Error signing out:", error.message);
        console.error("Error signing out:", error.message);
      });
  };

  return (
    <div className="flex flex-row m-4 w-full">
      <div className="">
        <div className="place-items-start w-64 align-top items-center">
          <SideBar />
        </div>
        <div className=" text-black w-64 h-full p-4"></div>
      </div>

      {/* new profile feature */}
      <div className="p-2 flex flex-col">
        {user ? (
          <div>
            <h1 className="text-[#4743E0] text-lg lg:text-6xl font-extrabold mb-3 lg:mb-8 mt-5 lg:mt-10">
              Welcome, {user.userName}
            </h1>
            {/* Profile Picture */}
            <div className="flex flex-col lg:flex-row items-center justify-center">
              <div
                className="flex flex-col justify-between"
                style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: 200,
                  height: 200,
                }}
              >
                {url ? (
                  <div className="relative w-44 h-44 lg:w-60 lg:h-60 mb-6 lg:mb-0 mr-0 lg:mr-12">
                    <img
                      src={url}
                      alt={"profile pic"}
                      className="w-full h-full object-cover rounded-full shadow-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gray-900 bg-opacity-75 rounded-full">
                      <input
                        type="file"
                        onChange={handleInputPic}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <span className="text-white text-sm lg:text-base font-semibold">
                        Change Picture
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-44 h-44">
                    <img
                      src={default_profile}
                      alt={"profile pic"}
                      className="w-full h-full object-cover rounded-full shadow-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gray-900 bg-opacity-75 rounded-full">
                      <input
                        type="file"
                        onChange={handleInputPic}
                        className="absolute opacity-0 cursor-pointer w-full h-full"
                      />
                      <span className="text-white text-sm lg:text-base font-semibold">
                        Change Picture
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <button
                  className="cursor-pointer bg-[#4743E0] text-white px-8 py-2 rounded-full ease-in-out hover:bg-opacity-80"
                  onClick={uploadpic}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        ) : (
           <div>user not found</div>
        )}  

        <div>
          {userData ? (
            <>
              <div></div>
              <hr className="mx-auto border-dashed rounded-md w-[1000%] lg:w-[1000px] mt-12 mb-5" />
              <div>
                <div>
                  <label htmlFor="userName" className="lg:ml-2 mb-2">
                    User Name
                  </label>
                  <input
                    id="userName"
                    type="text"
                    placeholder="John"
                    name="userName"
                    className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                    onChange={onChangeHandler}
                    value={userData.userName}
                  />

                  <label htmlFor="userEmail" className="lg:ml-2 mb-2">
                    User Email
                  </label>
                  <input
                    id="userEmail"
                    type="text"
                    placeholder="johnsmith@gmail.com"
                    name="userEmail"
                    className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                    value={userData.userEmail}
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="department" className="lg:ml-2 mb-2">
                    Department
                  </label>
                  <select
                    className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                    defaultValue={userData.department}
                    onChange={onChangeHandler}
                    id="department"
                    type="select"
                    name="department"
                  >
                    <option value="Civil">CEE</option>
                    <option value="Electrical">EIE</option>
                    <option value="Mechanical">MME</option>
                    <option value="IS">IS</option>
                  </select>

                  <label htmlFor="role" className="lg:ml-2 mb-2">
                    Role
                  </label>
                  <select
                    className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                    defaultValue={userData.role}
                    // onChange={onChangeHandler}
                    id="role"
                    type="select"
                    name="role"
                    disabled
                  >
                    <option value="HOD">HOD</option>
                    <option value="Admin">Admin</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Instructor">Instructor</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contactNumber" className="lg:ml-2 mb-2">
                    Contact Number
                  </label>
                  <input
                    id="contactNumber"
                    type="text"
                    placeholder="+94 000 000 000"
                    name="contactNumber"
                    className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                    onChange={onChangeHandler}
                    value={userData.contactNumber}
                  />
                </div>
                <button
                  onClick={() => {
                    userDetailsUpdate(userData.uid);
                  }}
                  className="bg-[#4743E0] text-white px-8 py-2 rounded-full"
                >
                  Save Changes
                </button>
              </div>
              <hr className="mx-auto border-dashed rounded-md w-[1000%] lg:w-[1000px] mt-12 mb-5" />
              <div>
                <h1 className="font-semibold text-lg">Change Password</h1>
                <div>
                  <label htmlFor="password" className="lg:ml-2 mb-2">
                    New Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="********"
                    name="password"
                    className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="lg:ml-2 mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="******"
                    name="confirmPassword"
                    className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                  />
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Log Out
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center ml-96 mb-10 justify-center w-96 h-screen p-4">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4  border-b-4   border-[#4743E0]"></div>
              Loading
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
