import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image3 from "../../assets/image3.svg";
import Logo from "../../Components/Logo/Logo";
import Button from "../../Components/Button/button";
import { auth } from "../../config/firebase_configure";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error.message);
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center">
      <div className="bg-white flex flex-col justify-normal rounded px-4 lg:px-8 py-4 lg:pt-6 lg:pb-8 ml-2 lg:ml-4 mr-2 lg:mr-4 mt-2 lg:mt-4 mb-2 lg:mb-4 lg:items-center lg:w-[900px]">
        <div className="align-top items-center">
          <Logo />
        </div>
        <div className="text-center lg:ml-4 lg:mr-10 ">
          <div>
            <h1 className="text-[#4743E0] text-xl lg:text-6xl font-extrabold mb-3 lg:mb-8 mt-5 lg:mt-10">
              Log Into Your Account
            </h1>
            <p className="mx-auto my-auto text-opacity-50 lg:w-1/2 opacity-40 text-center">
              To access your account, please enter your credentials below. By
              logging in, you agree to our terms and conditions. Make sure to
              review our GDPR compliance for data protection.
            </p>
          </div>
          <form
            onSubmit={handleLogin}
            className="bg-white mt-4 flex flex-col items-center"
          >
            <div className="flex flex-col mb-3 lg:mb-4 items-start">
              <label className="mb-2 ml-2 lg:ml-4">Work Email</label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-full lg:w-72 "
                type="text"
                placeholder="johnsmith@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-3 lg:mb-4 items-start">
              <label className="mb-2 ml-2 lg:ml-4">Password</label>
              <input
                className="border rounded-full py-2 px-3 text-grey-darker w-full lg:w-72 "
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-row mb-3 lg:mb-4 items-center">
              <input type="checkbox" className="mr-2" />
              <h1>Remember Me</h1>
            </div>
            <div className="mt-3 lg:mt-4 w-full lg:w-36">
              <Button text="Log In" onClick={handleLogin} />
            </div>
            <div className="mt-3 lg:mt-4 flex items-center">
              <h1>Don't have an account?</h1>
              <button className="text-[#4743E0] ml-2">Register</button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-black bg-opacity-5">
        <img src={Image3} alt="no internet" className="mt-2 lg:mt-5 w-full" />
      </div>
    </div>
  );
};

export default Login;
