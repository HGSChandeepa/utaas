import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../config/firebase_configure";
import SideBar from "../../Components/Sidebar/SideBar";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../config/firebase_configure";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { CgProfile } from "react-icons/cg";
import { ref, uploadBytesResumable, getDownloadURL,deleteObject } from "firebase/storage";
import ImageFiller from "react-image-filler";
// import firebase from 'firebase/app';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState("");
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
              console.log(userData);
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

  //#################profile picture



useEffect(() => {
  const uploadFile = () => {
    if (profilePic) {
      // Check if there is an existing profile picture
      if (user.profilePicURL) {
        // Delete the existing profile picture
        const existingPicRef = ref(storage, user.profilePicURL);
        deleteObject(existingPicRef)
          .then(() => {
            console.log('Existing profile picture deleted successfully');
          })
          .catch((error) => {
            console.error('Error deleting existing profile picture:', error);
          });
      }

      // Upload the new profile picture
      const storageRef = ref(
        storage,
        `profile_pictures/${user.uid}/${profilePic.name}`
      );

      const uploadTask = uploadBytesResumable(storageRef, profilePic);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.error('Error uploading profile picture:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProfilePic(downloadURL);
          });
        }
      );
    }
  };

  uploadFile();
}, [profilePic]);

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
    <div className="flex flex-row ml-10 mt-10">
      <div className="">
        <div className="place-items-start align-top items-center">
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
            <div
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                width: 200,
                height: 200,
              }}
            >
              <ImageFiller width={200} height={200} 
              />
            </div>
          </div>
        ) : (
          <p></p>
        )}

        <div>
          {userData ? (
            <>
              <div>
                {/* <h1 className="text-[#4743E0] text-lg lg:text-6xl font-extrabold mb-3 lg:mb-8 mt-5 lg:mt-10">
                  Welcome, {userData.userName}
                </h1> */}
                {/* set profile picture */}
              </div>
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
            <p>Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
