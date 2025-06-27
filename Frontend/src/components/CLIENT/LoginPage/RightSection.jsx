import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Logo from "./Logo";

const RightSection = ({ isSignup, setIsSignup, handleForgotPassword }) => (
  <div className="flex-1 flex flex-col justify-center bg-[#f4f7f4] p-[20px] lg:p-[40px] md:rounded-r-[10px]">
    <Logo />
    <h3 className="text-[0.7rem] lg:text-[1.3rem] text-center mb-[0.7rem] lg:mb-[1.2rem]">
      {isSignup
        ? "Create your PlantWorld Account"
        : "Login to your PlantWorld Account"}
    </h3>
    {isSignup ? (
      <SignupForm />
    ) : (
      <LoginForm handleForgotPassword={handleForgotPassword} />
    )}
    <div className="text-center text-xs mt-3 md:mt-auto md:text-md lg:text-lg mb-[8px] lg:mb-0">
      {isSignup ? (
        <>
          Already have an account?{" "}
          <button
            onClick={() => setIsSignup(false)}
            className="text-[#72a876] font-semibold hover:text-[#499a4e] no-underline"
          >
            Login
          </button>
        </>
      ) : (
        <>
          Don't have an account?{" "}
          <button
            onClick={() => setIsSignup(true)}
            className="text-[#72a876] font-semibold hover:text-[#499a4e] no-underline"
          >
            Signup
          </button>
        </>
      )}
    </div>
  </div>
);

export default RightSection;
