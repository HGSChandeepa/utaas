import React from "react";
import Logo from "../Components/Logo/Logo";
import Button from "../Components/Button/button";
import Image3 from "../assets/image3.svg";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center">
      <div className="bg-white flex flex-col justify-normal items-center rounded px-8 pt-6 pb-8 ml-4 mr-4 mt-4 mb-4 lg:items-center w-[900px] ">
        <div className="align-top items-center">
          <Logo />
        </div>
        <div className="text-center lg:ml-10 ">
          <div>
            <h1 className="text-[#4743E0] text-2xl lg:text-4xl font-extrabold mb-5 lg:mb-10 mt-10">
              Input Your Information
            </h1>
            <p className="mx-auto my-auto text-opacity-50 lg:w-1/2 opacity-40 text-center">
              We need you to help us with some basic information for your
              account creation. Here are our terms and conditiOnS. Please read
              them carefully. We are GDRP compliant.
            </p>
          </div>

          <div className="flex flex-col  lg:flex-row justify-around ">
            <form className="flex flex-col lg:flex-col mx-auto items-start justify-around">
              <label className="mb-2 ml-2 lg:ml-4">First Name</label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-72 "
                type="text"
                placeholder="john"
              />

              <label className="mb-2 ml-2 lg:ml-4">Department</label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-72 "
                type="text"
                placeholder="smith"
              />

              <label className="mb-2 ml-2 lg:ml-4">Telephone Number</label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-72 "
                type="Integer"
                placeholder="+94 000 000 000"
              />

              <label className="mb-2 ml-2 lg:ml-4">Password</label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-72 "
                type="password"
                placeholder="********"
              />
            </form>

            <form className="flex flex-col lg:flex-col mx-auto px-2 items-start justify-around">
              <label className="mb-2 ml-2 lg:ml-4">Last Name</label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-72 "
                type="text"
                placeholder="smith"
              />

              <label className="mb-2 ml-2 lg:ml-4">Worl Email</label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-72 "
                type="text"
                placeholder="johnsmith@gmail.com"
              />

              <label className="mb-2 ml-2 lg:ml-4">Role</label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-72 "
                type="text"
                placeholder="johnsmith@gmail.com"
              />

              <label className="mb-2 ml-2 lg:ml-4">Confirm Password</label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-72 "
                type="password"
                placeholder="********"
              />
            </form>
          </div>
        </div>
        <div className="mt-4 w-36 flex flex-col lg:flex-row items-center">
          <Button text="Register" />
        </div>
        <div className="mt-4 flex flex-row">
          <h1>Already a member?</h1>
          <button
            className="text-[#4743E0] ml-2"
            onClick={() => navigate(props.Register ? "/register" : "/login")}
          >
            Login
          </button>
        </div>
      </div>
      <div className="  bg-black/5">
        <img src={Image3} alt="no internet" className="mt-5 lg:mt-10" />
      </div>
    </div>
  );
};

export default Register;
