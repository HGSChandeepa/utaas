import React from "react";
import Image1 from "../../assets/image1.svg";
import Image2 from "../../assets/image2.svg";
import Botton from "../../Components/Button/button";
import { useNavigate } from "react-router-dom";

const LandingPage=(props)=>  {
const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row items-center">

      <div>
        <img src={Image1} alt="no internet" width={700} className="mt-5 lg:mt-10" />
      </div>

      <div className="text-center lg:ml-10">
        <h1 className="text-[#4743E0] text-2xl lg:text-6xl font-extrabold mb-5 lg:mb-10 mt-10">
          University Teachers’ Administrative Automation System
        </h1>
        <p className="mx-auto opacity-40 lg:w-1/2">
          We have successfully created your new account. But before you start, you
          will have to activate it. We have sent an activation mail to the email
          you provided during registration. It should arrive in a couple of
          minutes
        </p>
        <div className="mx-auto mt-5 lg:mt-10" onClick={()=>navigate(props.LandingPage ? '/' : '/login')}>
          <Botton text="Get Started"/>
        </div>
      </div>

      <div>
        <img src={Image2} alt="no internet"  width={700} className="mt-5 lg:mt-10" />
      </div>

    </div>
  );
}
export default LandingPage
