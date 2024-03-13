import SideBar from "../../Components/Sidebar/SideBar";
import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SelectionCard from "../../Components/Admin/SectionCard";
import { SaveAllIcon } from "lucide-react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyActivities = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [formType, setFromType] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);
  const [numberOfApplication, setNumberOfApplication] = useState(0);
  const [userid, setUserid] = useState(null);

  const handleOptionClick = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  console.log(selectedOptions);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        setUserid(userId);
        console.log(userId);
        const db = getFirestore();
        const userDataRef = doc(db, "users", userId);
        const userDataSnapshot = await getDoc(userDataRef);
        if (userDataSnapshot.exists()) {
          console.log(userDataSnapshot.data());
          setUserData(userDataSnapshot.data());
          setUserRole(userDataSnapshot.data().role);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const [numberOfSections, setNumberOfSections] = useState(1);
  const [sectionData, setSectionData] = useState([
    {
      input: "",
      selectedOption: "",
      dropdownData: [],
      multiSelectData: [],
    },
  ]);

  const [allSelectionCardData, setAllSelectionCardData] = useState({
    cards: [],
  });

  const handleAddSection = () => {
    setNumberOfSections(numberOfSections + 1);
    setSectionData([...sectionData, { input: "", selectedOption: "" }]);
  };

  const updateSectionData = (index, newData) => {
    const updatedData = [...sectionData];
    updatedData[index] = newData;
    setSectionData(updatedData);
  };



  const newUserRole = userRole + "forms";
  const storeSectionData = () => {
    const exists = allSelectionCardData.cards.some((card) => {
      return (
        JSON.stringify(card) ===
        JSON.stringify(sectionData[numberOfSections - 1])
      );
    });

    if (!exists) {
      setAllSelectionCardData((prevData) => ({
        ...prevData,
        cards: [...prevData.cards, sectionData[numberOfSections - 1]],
        userRole: newUserRole,
        selectedOption: selectedOptions,
        formType: formType,
        numberOfSections: numberOfSections,
        userData: userData,
        numberOfApplication: numberOfApplication,
      }));
    }
  };

  const saveNewProduct = async () => {
    try {
      const db = getFirestore();
      const newDocRef = await addDoc(
        collection(db, newUserRole),
        allSelectionCardData
      );

      //also store under user collection
      const userDocRef = await addDoc(
        collection(db, "users", userid, "forms"),
        allSelectionCardData
      );

      console.log("Document written with ID: ", userid);
      // add toast
      toast.success("New Form Added Successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
      //add toast
      toast.error("Error adding new form");
    }
  };

  console.log(numberOfApplication);
  console.log(allSelectionCardData);

  return (
    <div className="flex flex-row ml-10 mt-10">
      <div className="">
        <div className="place-items-start align-top items-center">
          <SideBar />
        </div>
        <div className=" text-black w-64 h-full p-4"></div>
      </div>

      <div>
        <section>
          <select
            className="border-2 rounded-full py-2 px-3 mb-4 text-grey-100 bg-slate-100 w-72"
            defaultValue=""
            onChange={(e) => setFromType(e.target.value)}
          >
            <option value="" disabled>
              Select the form type
            </option>
            <option value="Vehical Reservation Form">
              Vehical Reservation Form
            </option>
            <option value="Exam Duty Form">Exam Duty Form</option>
            <option value="Cleaning Service Form">Cleaning Service Form</option>
            <option value="Paper Marking Form">Paper Marking Form</option>
          </select>

          {/* select appicable */}

          <div className=" mb-10">
            <label
              for="last_name"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Number Of Application Required
            </label>
            <input
              type="number"
              id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full block  p-2.5   "
              placeholder="12"
              required
              onChange={(e) => setNumberOfApplication(e.target.value)}
            />
          </div>

          <div className="">
            <h3 className="mb-4 font-semibold text-gray-900">Identification</h3>
            <ul className="items-center    text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex  dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div className="flex items-center ps-3">
                  <input
                    id="vue-checkbox-list"
                    type="checkbox"
                    value="Admin"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onClick={() => handleOptionClick("Admin")}
                  />
                  <label
                    htmlFor="vue-checkbox-list"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
                  >
                    Admin
                  </label>
                </div>
              </li>

              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="angular-checkbox-list"
                    type="checkbox"
                    value="Lecturer"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onClick={() => handleOptionClick("Lecturer")}
                  />
                  <label
                    htmlFor="angular-checkbox-list"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
                  >
                    Lecturer
                  </label>
                </div>
              </li>
              <li className="w-full dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="laravel-checkbox-list"
                    type="checkbox"
                    value="Instructor"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onClick={() => handleOptionClick("Instructor")}
                  />
                  <label
                    htmlFor="laravel-checkbox-list"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
                  >
                    Instructor
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <div className="flex flex-col w-full p-5 pb-52 px-4 ">
          <h2 className="font-semibold opacity-70 text-xl">
            Create A New Form As{" "}
            <span className="text-yellow-600">{userRole}</span>
          </h2>
          <div className="w-full mt-5 flex flex-col gap-5 items-center justify-center">
            {Array.from({ length: numberOfSections }).map((_, index) => (
              <SelectionCard
                key={index}
                index={index}
                sectionData={sectionData[index]}
                updateSectionData={updateSectionData}
              />
            ))}
          </div>
          <div className="flex justify-end mt-5">
            <button
              onClick={() => {
                handleAddSection();
                storeSectionData();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
            >
              Add New Data
              <span>
                <AddCircleIcon />
              </span>
            </button>
          </div>

          <div className=" my-5">
            <p className=" text-lg">
              Please note that the data you have entered is{" "}
              <span className=" text-blue-600 ">plaease double checkeds</span>{" "}
              and after you can save the new product.
            </p>
          </div>

          <div className="flex justify-end mt-10 border-t-2 py-4 border-slate-200">
            <button
              className="bg-green-500 flex gap-2 text-white px-4 py-2 rounded-full hover:bg-green-600"
              onClick={() => {
                saveNewProduct();
              }}
            >
              Save New Product
              <span>
                <SaveAllIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivities;
