import React, { useState } from "react";
import Logo from "../../Components/Logo/Logo";
import Image3 from "../../assets/image3.svg";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { firestore } from "../../config/firebase_configure";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = (props) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, department, role, contactNumber, email);

    if (
      !firstName ||
      !lastName ||
      !department ||
      !role ||
      !contactNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      console.error("Please fill in all fields");

      //show a toast message
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      //show a toast message
      toast.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //save the user in firestore users collection under the user id
      const user = userCredential.user;
      const userRef = doc(firestore, "users", user.uid); // Set document ID to user's UID
      await setDoc(userRef, {
        // Pass the data to be added to the Firestore document as an object
        uid: user.uid,
        userEmail: email,
        userName: `${firstName} ${lastName}`,
        department: department,
        role: role,
        contactNumber: contactNumber,
      });

      //show a toast message
      toast.success("User registered successfully");

      navigate("/dashboard");
    } catch (error) {
      console.error("Error registering user:", error.message);
      //show a toast message
      toast.error("Error registering user: " + error.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center">
      <div className="bg-white flex flex-col justify-normal items-center rounded px-4 lg:px-8 py-4 lg:pt-6 lg:pb-8 mx-auto lg:items-center lg:w-[900px]">
        <div className="align-top items-top">
          <Logo />
        </div>
        <form onSubmit={handleRegister}>
          <div className="text-center lg:mx-auto">
            <div>
              <h1 className="text-[#4743E0] text-2xl lg:text-6xl font-extrabold mb-2">
                Input Your Information
              </h1>
              <p className="mx-auto my-auto text-opacity-50 lg:w-3/4 opacity-40 text-center mb-2">
                We need you to help us with some basic information for your
                account creation. Here are our terms and conditions. Please read
                them carefully. We are GDPR compliant.
              </p>
            </div>

            <hr className="mx-auto border-dashed rounded-md w-[80%] lg:w-[800px]" />
            <div className="flex flex-col lg:flex-row justify-around py-2 my-5">
              <div
                className="flex flex-col lg:flex-col mx-auto items-start justify-around mb-4 lg:mb-0"
                onSubmit={handleRegister}
              >
                <input
                  label={"First Name"}
                  type={"text"}
                  placeholder={"john"}
                  name={"firstName"}
                  className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <input
                  label={"Work Email"}
                  type={"text"}
                  placeholder={"johnsmith@gmail.com"}
                  onChange={(e) => setEmail(e.target.value)}
                  name={"email"}
                  value={email}
                  className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                />

                <label className="mb-2 ml-2 lg:ml-4">Department</label>
                <select
                  className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                  defaultValue=""
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="Civil">CEE</option>
                  <option value="Electrical">EIE</option>
                  <option value="Mechanical">MME</option>
                  <option value="IS">IS</option>
                </select>

                <input
                  label={"Password"}
                  type={"password"}
                  placeholder={"********"}
                  name={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                />
              </div>

              <div className="flex flex-col lg:flex-col mx-auto items-start justify-around py-">
                <input
                  label={"Last Name"}
                  type={"text"}
                  placeholder={"smith"}
                  name={"lastName"}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                />
                <input
                  label={"Telephone Number"}
                  type={"tel"}
                  placeholder={"+94 000 000 000"}
                  name={"contactNumber"}
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                />

                <label className="mb-2 ml-2 lg:ml-4">Role</label>
                <select
                  className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                  defaultValue=""
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  <option value="HOD">HOD</option>
                  <option value="Admin">Admin</option>
                  <option value="Lecturer">Lecturer</option>
                  <option value="Instructor">Instructor</option>
                </select>
                <input
                  label={"Confirm Password"}
                  type={"password"}
                  placeholder={"********"}
                  name={"confirmPassword"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 lg:justify-between flex flex-col gap-5 items-center w-full lg:w-[80%]">
            <hr className="mx-auto border-dashed rounded-md w-[80%] lg:w-[800px]" />
            <div className="flex flex-col lg:flex-row justify-between items-center mt-4 ">
              <div className="flex flex-row px-6 ">
                <h1 className="mr-2">Already a member?</h1>
                <button
                  className="text-[#4743E0]"
                  onClick={() =>
                    navigate(props.Register ? "/register" : "/login")
                  }
                >
                  Login
                </button>
              </div>

              <div className="w-36 mt-4 lg:mt-0">
                <button className=" px-5 py-2 bg-[#4743E0] text-white rounded-md">
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-black/5 w-full lg:w-[40vw]">
        <img src={Image3} alt="no internet" className="mt-5 lg:mt-10 w-full" />
      </div>
    </div>
  );
};

export default Register;
