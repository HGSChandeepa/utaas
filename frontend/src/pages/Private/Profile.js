import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { storage } from "../../config/firebase_configure";
import SideBar from "../../Components/Sidebar/SideBar";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../config/firebase_configure";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiUploadSimpleLight } from "react-icons/pi";
import { PiCheckSquareOffsetLight } from "react-icons/pi";
import default_profile from "../../assets/user.jpg";
import {
  getAuth,
  updateProfile,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

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
        const docRef = doc(firestore, "users", user.uid);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
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

  useEffect(() => {
    const fetchUrl = () => {
      if (user && user.uid) {
        const imageRef = ref(storage, `profile_pictures/${user.uid}`);
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log("Error in setUrl", error.message);
          });
        setProfilePic(null);
      }
    };
    fetchUrl();
  }, [user]);

  const handleInputPic = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
      toast.success(
        "Please click the Upload button to update your profile picture."
      );
    }
  };

  const uploadPic = () => {
    const imageRef = ref(storage, `profile_pictures/${user.uid}`);
    const desertRef = ref(storage, `profile_pictures/${user.uid}`);
    if (profilePic === null) {
      toast.error("Please select a profile picture.");
      return;
    } else {
      if (`profile_pictures/${user.uid}`) {
        deleteObject(desertRef)
          .then(() => {
            console.log("File deleted successfully");
          })
          .catch((error) => {
            console.log("Error in deleting", error.message);
            // toast.error("Error in deleting existing profile picture.");
          });
      }
      uploadBytes(imageRef, profilePic)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setUrl(url);
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
      toast.success("Profile picture uploaded successfully.");
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const userDetailsUpdate = async (uid) => {
    const docRef = doc(firestore, "users", uid);
    try {
      await updateDoc(docRef, userData);
      toast.success("User details updated successfully.");
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Error updating user details.");
    }
  };

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const passwordHandler = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const changePassword = () => {
    const userNow = auth.currentUser;
    const oldPassword = password.oldPassword;
    const newPassword = password.newPassword;
    const confirmPassword = password.confirmPassword;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    } else {
      const credential = EmailAuthProvider.credential(
        userNow.email,
        oldPassword
      );
      reauthenticateWithCredential(userNow, credential)
        .then(() => {
          updatePassword(userNow, newPassword)
            .then(() => {
              toast.success("Password updated successfully.");
            })
            .catch((error) => {
              console.error("Error updating password:", error.message);
              toast.error("Error updating password:", error.message);
            });
        })
        .catch((error) => {
          console.error("Error re-authenticating:", error.message);
          toast.error("Error re-authenticating:", error.message);
        });
    }
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        toast.success("User signed out successfully.");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error signing out:", error.message);
      });
  };

  return (
    <div className="flex flex-row w-full h-full">
      <div className="place-items-start align-top items-center">
        <SideBar />
      </div>
      <div className="p-4 w-full">
        {user ? (
          <div className="flex flex-col lg:flex-row items-center justify-center p-10 gap-8">
            <div className="w-full lg:w-2/3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="w-full lg:w-1/3 flex flex-col items-center">
                  {/* / */}
                  <div className="relative w-32 h-32 mb-4">
                    <img
                      src={url || default_profile}
                      alt="profile pic"
                      className="w-full h-full object-cover rounded-full shadow-md"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gray-900 bg-opacity-50 rounded-full">
                      <input
                        type="file"
                        onChange={handleInputPic}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <span className="text-white">Change Picture</span>
                    </div>
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                    onClick={uploadPic}
                  >
                    Upload
                  </button>
                </div>

                <div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                      User Details
                    </h2>
                    <form>
                      <div className="mb-4">
                        <label
                          className="block text-gray-600 mb-2"
                          htmlFor="userName"
                        >
                          User Name
                        </label>
                        <input
                          type="text"
                          id="userName"
                          name="userName"
                          value={userData.userName}
                          onChange={onChangeHandler}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-600 mb-2"
                          htmlFor="userEmail"
                        >
                          User Email
                        </label>
                        <input
                          type="email"
                          id="userEmail"
                          name="userEmail"
                          value={userData.userEmail}
                          disabled
                          className="w-full px-3 py-2 border rounded-md bg-gray-100"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-600 mb-2"
                          htmlFor="department"
                        >
                          Department
                        </label>
                        <select
                          id="department"
                          name="department"
                          value={userData.department}
                          onChange={onChangeHandler}
                          className="w-full px-3 py-2 border rounded-md"
                        >
                          <option value="Civil">CEE</option>
                          <option value="Electrical">EIE</option>
                          <option value="Mechanical">MME</option>
                          <option value="IS">IS</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-600 mb-2"
                          htmlFor="contactNumber"
                        >
                          Contact Number
                        </label>
                        <input
                          type="text"
                          id="contactNumber"
                          name="contactNumber"
                          value={userData.contactNumber}
                          onChange={onChangeHandler}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => userDetailsUpdate(userData.uid)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        Save Changes
                      </button>
                    </form>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4 mt-10">
                    Change Password
                  </h2>
                  <form>
                    <div className="mb-4">
                      <label
                        className="block text-gray-600 mb-2"
                        htmlFor="oldPassword"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        onChange={passwordHandler}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-600 mb-2"
                        htmlFor="newPassword"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        onChange={passwordHandler}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-600 mb-2"
                        htmlFor="confirmPassword"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={passwordHandler}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={changePassword}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Change Password
                    </button>
                  </form>
                </div>
              </div>

              <hr className="my-8" />

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mb-4"></div>
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
