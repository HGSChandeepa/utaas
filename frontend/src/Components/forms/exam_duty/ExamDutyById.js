import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../../../Components/Sidebar/SideBar";
import { auth } from "../../../config/firebase_configure";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../../config/firebase_configure";
import { toast } from "react-toastify";
import {
  editedBySecondReviewerService,
  editedByFirstReviewerService,
} from "../../../services/progress/progress_exam_duty";

function ExamDutyById() {
  const { examFormId } = useParams();

  const [formData, setFormData] = useState({
    voucherNumber: "",
    date: "",
    currencyType: "",
    noOfCheques: "",
    name: "",
    email: "",
    post: "",
    reservedAddress: "",
    examinationName: "",
    examinationHall: "",
    completedExamDuty: "",
    tableEntries: [{ date: "", startTime: "", endTime: "", amountToBePaid: 0 }],
    isDataTrue: false,
    totalAmount: 0,
  });

  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [abletoEdit, setAbleToEdit] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const docRef = doc(firestore, "users", user.uid);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setUserData(userData);
              setUserRole(userData.role);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTableChange = (index, e) => {
    const { name, value } = e.target;
    const newTableEntries = formData.tableEntries.map((entry, i) => {
      if (i === index) {
        return { ...entry, [name]: value };
      }
      return entry;
    });
    setFormData((prevData) => ({
      ...prevData,
      tableEntries: newTableEntries,
    }));
  };

  const addTableRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      tableEntries: [
        ...prevData.tableEntries,
        { date: "", startTime: "", endTime: "", amountToBePaid: 0 },
      ],
    }));
  };

  const removeTableRow = (index) => {
    const newTableEntries = formData.tableEntries.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      tableEntries: newTableEntries,
    }));
  };

  const calculateTotalAmount = () => {
    const total = formData.tableEntries.reduce(
      (sum, entry) => sum + parseFloat(entry.amountToBePaid || 0),
      0
    );
    setFormData((prevData) => ({
      ...prevData,
      totalAmount: total,
    }));
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [formData.tableEntries]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.voucherNumber ||
      !formData.date ||
      !formData.currencyType ||
      !formData.noOfCheques ||
      !formData.name ||
      !formData.email ||
      !formData.post ||
      !formData.reservedAddress ||
      !formData.examinationName ||
      !formData.examinationHall ||
      !formData.completedExamDuty ||
      !formData.isDataTrue
    ) {
      toast.error("Please fill in all fields and confirm the data is true");
      return;
    }

    try {
      const docRef = doc(firestore, "exam_duty", examFormId);
      await setDoc(docRef, formData);

      if (
        userData &&
        userData.userEmail.trim() === formData.first_reciver_email.trim()
      ) {
        await editedByFirstReviewerService(examFormId);
      }
      if (
        userData &&
        userData.userEmail.trim() === formData.second_reciver_email.trim()
      ) {
        await editedBySecondReviewerService(examFormId);
      }

      toast.success("Form data updated successfully");
    } catch (error) {
      toast.error("Error updating form data: " + error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (examFormId) {
          const docRef = doc(firestore, "exam_duty", examFormId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const formData = docSnap.data();
            setFormData(formData);

            if (userData && userData.userEmail === formData.applicant_email) {
              setAbleToEdit(false);
            } else if (
              userData &&
              userData.userEmail === formData.first_reciver_email &&
              formData.edited_by_second_reciver
            ) {
              setAbleToEdit(false);
            } else {
              setAbleToEdit(true);
            }
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [examFormId, userData]);

  return (
    <div>
      <div>
        <div className="flex gap-10 w-full">
          <div>
            <div className="place-items-start align-top items-center h-full">
              <SideBar />
            </div>
          </div>
          <div className="flex flex-col gap-2 overflow-hidden p-6">
            <h2 className="text-2xl font-semibold text-yellow-500">
              Here Are Some Forms Submitted By You
            </h2>
            <div className="bg-yellow-100 text-yellow-800 w-40 flex gap-2 font-medium px-4 py-0.5 rounded-full text-md">
              {userRole} <span>Account</span>
            </div>
            <p className="text-gray-500">
              Apply for leave by filling in the form below and submitting it to
              your department head. You will be notified of the status of your
              application. And also, you can apply for a loan by filling in the
              form below and submitting it to your department head. You will be
              notified of the status of your application.
            </p>

            <section className="my-5">
              {abletoEdit ? (
                <h2 className="text-md font-semibold text-green-500 w-fit p-2 px-3 bg-green-100 rounded-full">
                  You are able to Edit
                </h2>
              ) : (
                <h2 className="text-md font-semibold text-red-500 w-fit p-2 px-3 bg-red-100 rounded-full">
                  You are not able to Edit
                </h2>
              )}
            </section>
            <div className="grid grid-cols-2 ">
              <form
                onSubmit={handleSubmit}
                className="mb-5 border-2 p-10 rounded-lg border-gray-200 bg-slate-50"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="voucherNumber"
                  >
                    Voucher Number 
                  </label>
                  <input
                    type="text"
                    id="voucherNumber"
                    name="voucherNumber"
                    value={formData.voucherNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="date"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="currencyType"
                  >
                    Currency Type
                  </label>
                  <input
                    type="text"
                    id="currencyType"
                    name="currencyType"
                    value={formData.currencyType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="noOfCheques"
                  >
                    No. Of Cheques
                  </label>
                  <input
                    type="number"
                    id="noOfCheques"
                    name="noOfCheques"
                    value={formData.noOfCheques}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="post"
                  >
                    Post
                  </label>
                  <input
                    type="text"
                    id="post"
                    name="post"
                    value={formData.post}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="reservedAddress"
                  >
                    The Reserved Address
                  </label>
                  <input
                    type="text"
                    id="reservedAddress"
                    name="reservedAddress"
                    value={formData.reservedAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="examinationName"
                  >
                    Examination Name
                  </label>
                  <input
                    type="text"
                    id="examinationName"
                    name="examinationName"
                    value={formData.examinationName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="examinationHall"
                  >
                    Examination Hall
                  </label>
                  <input
                    type="text"
                    id="examinationHall"
                    name="examinationHall"
                    value={formData.examinationHall}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="completedExamDuty"
                  >
                    Completed Exam Duty
                  </label>
                  <input
                    type="text"
                    id="completedExamDuty"
                    name="completedExamDuty"
                    value={formData.completedExamDuty}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Fill the table accordingly
                </h3>
                {formData.tableEntries.map((entry, index) => (
                  <div key={index} className="mb-4 border p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <label
                        className="block text-gray-600 font-semibold mb-2"
                        htmlFor={`date-${index}`}
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        id={`date-${index}`}
                        name="date"
                        value={entry.date}
                        onChange={(e) => handleTableChange(index, e)}
                        className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <label
                        className="block text-gray-600 font-semibold mb-2"
                        htmlFor={`startTime-${index}`}
                      >
                        Start Time
                      </label>
                      <input
                        type="time"
                        id={`startTime-${index}`}
                        name="startTime"
                        value={entry.startTime}
                        onChange={(e) => handleTableChange(index, e)}
                        className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <label
                        className="block text-gray-600 font-semibold mb-2"
                        htmlFor={`endTime-${index}`}
                      >
                        End Time
                      </label>
                      <input
                        type="time"
                        id={`endTime-${index}`}
                        name="endTime"
                        value={entry.endTime}
                        onChange={(e) => handleTableChange(index, e)}
                        className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <label
                        className="block text-gray-600 font-semibold mb-2"
                        htmlFor={`amountToBePaid-${index}`}
                      >
                        Amount to be Paid
                      </label>
                      <input
                        type="number"
                        id={`amountToBePaid-${index}`}
                        name="amountToBePaid"
                        value={entry.amountToBePaid}
                        onChange={(e) => handleTableChange(index, e)}
                        className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTableRow(index)}
                      className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTableRow}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray"
                >
                  New+
                </button>

                <div className="mt-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isDataTrue"
                      name="isDataTrue"
                      checked={formData.isDataTrue}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="isDataTrue" className="text-gray-600">
                      I hereby promise these amounts are true and the details I
                      entered are true.
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="totalAmount"
                  >
                    Total Amount
                  </label>
                  <input
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    value={formData.totalAmount}
                    readOnly
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-200"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamDutyById;
