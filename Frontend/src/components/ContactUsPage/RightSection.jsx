import React from "react";
import Logo from "./Logo";
import LoginForm from "./LoginForm";

const RightSection = () => (
  <div className="flex-1 flex flex-col justify-center bg-[#f4f7f4] p-[20px] lg:p-[40px] md:rounded-r-[10px]">
    <Logo />
    <LoginForm />
  </div>
);

export default RightSection;
