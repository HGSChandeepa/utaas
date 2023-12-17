import React from "react";
import Logo from "../Components/Logo/Logo";
import Button from "../Components/Button/button";
import Image3 from "../assets/image3.svg";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center">
      <div className="bg-white flex flex-col justify-normal items-center rounded px-auto mx-auto lg:items-center w-[900px] ">
        <div className="align-top items-top">
          <Logo />
        </div>
        <div className="text-center lg:mx-auto ">
          <div>
            <h1 className="text-[#4743E0] text-2xl lg:text-6xl font-extrabold mb-2 ">
              Input Your Information
            </h1>
            <p className="mx-auto my-auto text-opacity-50 lg:w-1/2 opacity-40 text-center mb-2">
              We need you to help us with some basic information for your
              account creation. Here are our terms and conditiOnS. Please read
              them carefully. We are GDRP compliant.
            </p>
          </div>
          <hr className="mx-auto  border-dashed rounded-md w-[800px]" />
          <div className="flex flex-col  lg:flex-row justify-around py-2 my-5">
            <form className="flex flex-col lg:flex-col mx-auto items-start justify-around ">
              <label className="mb-2 ml-2 lg:ml-4 ">First Name</label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-72 "
                type="text"
                placeholder="john"
              />

              <label className="mb-2 ml-2 lg:ml-4 pt-2 mt-10">Work Email</label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-72 "
                type="text"
                placeholder="johnsmith@gmail.com"
              />

              <label className="mb-2 ml-2 lg:ml-4 pt-2 mt-10">Department</label>
              <select className="border rounded-full py-2 px-3 text-grey-darker w-72">
                <option value="" disabled>
                  Select Deparment
                </option>
                <option value="">CEE</option>
                <option value="">EIE</option>
                <option value="">MME</option>
                <option value="">IS</option>
              </select>
              <label className="mb-2 ml-2 lg:ml-4 pt-2 mt-10">Password</label>
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

              <label className="mb-2 ml-2 lg:ml-4 pt-2 mt-10">
                Telephone Number
              </label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-72 "
                type="tel"
                pattern="[+]{1}[0-9\s]{1,}"
                placeholder="+94 000 000 000"
              />

              <label className="mb-2 ml-2 lg:ml-4 pt-2 mt-10">Role</label>
              <select
                className="border rounded-full py-2 px-3 text-grey-darker w-72"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="Head of Deparment">HoD</option>
                <option value="user">Lecturer</option>
              </select>
              
              <label className="mb-2 ml-2 lg:ml-4 pt-2 mt-10">
                Conform Password
              </label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-72 "
                type="password"
                placeholder="********"
              />
            </form>
          </div>
        </div>
        <div className="mt-4 lg:justify-between items-center">
          <hr className="mx-auto  border-dashed rounded-md w-[800px]" />
          <div className="flex flex-row lg:justify-between items-center mt-4">
            <div className="flex flex-row ">
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
              <Button text="Register" />
            </div>
          </div>
        </div>
      </div>

      <div className="  bg-black/5">
        <img src={Image3} alt="no internet" className="mt-5 lg:mt-10" />
      </div>
    </div>
  );
};

export default Register;
