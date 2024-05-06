import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { storage } from "../../config/firebase_configure";
import SideBar from "../../Components/Sidebar/SideBar";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../config/firebase_configure";
import { toast } from "react-toastify";
import { getAuth, updateProfile } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { PiUploadSimpleLight } from "react-icons/pi";
import { PiCheckSquareOffsetLight } from "react-icons/pi";
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

  //get the profile picture url
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

  //handle input profile picture and set it to the state
  const handleInputPic = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
      toast.success("Please Click Upload button to update profile picture");
    }
  };

  //prpofile pic upload
  const uploadpic = () => {
    const imageRef = ref(storage, `profile_pictures/${user.uid}`);
    const desertRef = ref(storage, `profile_pictures/${user.uid}`);
    //file selection
    if (profilePic === null) {
      toast.error("Please select a profile picture");
      return;
    } else {
      //if already exist profile picture delete it
      if (`profile_pictures/${user.uid}`) {
        deleteObject(desertRef)
          .then(() => {
            console.log("File deleted successfully");
          })
          .catch((error) => {
            console.log("Error in deleting", error.message);
            toast.error("Error in deleting exist profile picture");
          });
      }
      //upload new profile picture
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

      {/* profile picture section */}
      <div className="p-2 flex flex-col w-full mx-5">
        {user ? (
          <div className="flex flex-row  items-center justify-between gap-5">
            <h1 className="text-[#4743E0] text-6xl font-extrabold mb-3 lg:mb-8 mt-5 lg:mt-10">
              {user.userName}
            </h1>
            <div className="flex flex-col lg:flex-col items-center justify-center ">
              {/* Profile Picture */}
              <div className="flex-shrink-0  relative w-32 h-32 m-2 justify-center items-center lg:w-44 lg:h-44 mb-6 lg:mb-0 mr-0 lg:mr-12">
                <img
                  src={url || default_profile}
                  alt="profile pic"
                  className="justify-center items-center w-full h-full object-cover rounded-full shadow-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gray-900 bg-opacity-75 rounded-full">
                  <input
                    type="file"
                    onChange={handleInputPic}
                    className="absolute justify-center inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <span className="text-white text-sm justify-center lg:justify-center font-normal">
                    <PiCheckSquareOffsetLight className="justify-center w-6 h-6 ml-10" />
                    Change Picture
                  </span>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center lg:mr-10 mt-2 ">
                <button
                  className="cursor-pointer flex flex-row justify-center border-2  text-gray-800 px-4 py-1 rounded-full ease-in-out hover:underline hover:bg-slate-100"
                  onClick={uploadpic}
                >
                  <PiUploadSimpleLight className="m-1" />
                  Upload
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className=" text-lg lg:text-2xl font-thin mt-5">
            User not found
          </div>
        )}

        {/* profile details section */}
        <div>
          {userData ? (
            <>
              <hr className="mx-auto border-dashed rounded-md lg:w-full mt-12 mb-5" />
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
                    onChange={onChangeHandler}
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
              <hr className="mx-auto border-dashed rounded-md lg:w-full mt-12 mb-5" />
              {/* Password section */}
              <div>
                <h1 className="font-semibold text-lg m-2">Change Password</h1>
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
                    // onChange={passwordHandler}
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
                    // onChange={confirmPasswordHandler}
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
