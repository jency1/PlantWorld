import React from "react";
import AdminLoginForm from "./AdminLoginForm";
import Logo from "./Logo";

const RightSection = ({ handleForgotPassword }) => (
  <div className="flex-1 flex flex-col justify-center bg-[#f4f7f4] p-[20px] lg:p-[40px] md:rounded-r-[10px]">
    <Logo />
    <h3 className="text-[0.7rem] lg:text-[1.3rem] text-center mb-[0.7rem] lg:mb-[1.2rem]">
      Login to your PlantWorld Account
    </h3>
    <AdminLoginForm handleForgotPassword={handleForgotPassword} />
  </div>
);

export default RightSection;
