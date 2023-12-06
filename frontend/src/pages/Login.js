import React from "react";
import Image3 from "../assets/image3.svg";
import Logo from "../Components/Logo/Logo";
import Button from "../Components/Button/button";

const Login = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center">
      <div className="flex flex-col justify-normal lg:items-center w-[1000px]">
        <div className="align-top items-center">
          <Logo />
        </div>
        <div className="text-center lg:ml-10 ">
          <div>
            <h1 className="text-[#4743E0] text-2xl lg:text-4xl font-extrabold mb-5 lg:mb-10 mt-10">
              Log Into Your Account
            </h1>
            <p className="mx-auto text-opacity-50 lg:w-1/2 opacity-40 text-center">
              To access your account, please enter your credentials below. By
              logging in, you agree to our terms and conditiOnS. Make sure to
              review our GDPR compliance for data protection.
            </p>
          </div>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center">
            <div className="flex flex-col mb-4 items-start">
              <label className="mb-2 ml-4">Work Email</label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-72 "
                type="text"
                placeholder="johnsmith@gmail.com"
              />
            </div>
            <div className="flex flex-col mb-4 items-start">
              <label className="mb-2 ml-4">Password</label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-72 "
                type="password"
                placeholder="********"
              />
            </div>
            <div className="flex flex-row mb-4 items-center">
              <input type="checkbox" className="mr-2" />
              <h1>Remember Me</h1>
            </div>
            <div className="mt-4 w-36">
              <Button text="Log In" />
            </div>
          </form>
        </div>
      </div>
      <div>
        <img src={Image3} alt="no internet" className="mt-5 lg:mt-10" />
      </div>
    </div>
  );
};

export default Login;
