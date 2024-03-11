import SideBar from "../../Components/Sidebar/SideBar";
import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SelectionCard from "../../Components/Admin/SectionCard";
import { SaveAllIcon } from "lucide-react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const MyActivities = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);

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
    setSectionData([
      ...sectionData,
      { input: "", selectedOption: "", dropdownData: [], multiSelectData: [] },
    ]);
  };

  const updateSectionData = (index, newData) => {
    const updatedData = [...sectionData];
    updatedData[index] = newData;
    setSectionData(updatedData);
  };

  const storeSectionData = () => {
    const exists = allSelectionCardData.cards.some((card) => {
      return JSON.stringify(card) === JSON.stringify(sectionData[0]);
    });

    if (!exists) {
      setAllSelectionCardData({
        cards: [...allSelectionCardData.cards, ...sectionData],
      });
    }
  };

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
            <button className="bg-green-500 flex gap-2 text-white px-4 py-2 rounded-full hover:bg-green-600">
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
