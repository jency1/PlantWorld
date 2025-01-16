import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; 

const BackToHomeButton = () => (
  <Link
    to="/"
    className="absolute top-[10px] left-[10px] text-[#72a876] font-bold p-[6px] md:p-[8px] lg:p-[12px] rounded border border-[#72a876] hover:bg-[#4ead54] hover:text-white transition-colors duration-300"
  >
    <FaHome size={24} />
  </Link>
);

const Logo = () => (
  <div className="flex items-center justify-center mb-[1rem] lg:mb-[1.5rem]">
    <h2 className="text-[20px] lg:text-[28px] font-bold text-[#72A876]">
      PlantWorld
    </h2>
  </div>
);

const LoginForm = ({ handleForgotPassword }) => (
  <form className="flex flex-col w-full">
    <label htmlFor="username" className="mb-2 text-[0.8rem] lg:text-[1.1rem]">
      User Name:
    </label>
    <input
      type="text"
      id="username"
      placeholder="username"
      className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
    />

    <label htmlFor="password" className="mb-2 text-[0.8rem] lg:text-[1.1rem]">
      Password:
    </label>
    <input
      type="password"
      id="password"
      placeholder="*****"
      className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
    />

    <div className="text-right text-xs md:text-md lg:text-lg mb-[8px] lg:mb-[15px]">
      <a
        href="#"
        onClick={handleForgotPassword}
        className="text-[#72a876] font-semibold hover:text-[#499a4e] no-underline"
      >
        Forgot Password?
      </a>
    </div>

    <button
      type="submit"
      className="w-full bg-[#4ead54] text-white font-bold px-[2px] py-[3px] lg:px-[12px] lg:py-[10px] rounded border-none text-[0.8rem] lg:text-[1.1rem] cursor-pointer transition-colors duration-300 hover:bg-[#499a4e]"
    >
      Login
    </button>
  </form>
);

const SignupForm = () => (
  <form className="flex flex-col w-full">
    <label htmlFor="username" className="mb-2 text-[0.8rem] lg:text-[1.1rem]">
      User Name:
    </label>
    <input
      type="text"
      id="username"
      placeholder="username"
      className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
    />

    <label htmlFor="password" className="mb-2 text-[0.8rem] lg:text-[1.1rem]">
      Password:
    </label>
    <input
      type="password"
      id="password"
      placeholder="*****"
      className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
    />

    <label
      htmlFor="confirmPassword"
      className="mb-2 text-[0.8rem] lg:text-[1.1rem]"
    >
      Confirm Password:
    </label>
    <input
      type="password"
      id="confirmPassword"
      placeholder="*****"
      className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
    />

    <button
      type="submit"
      className="w-full bg-[#4ead54] text-white font-bold px-[2px] py-[3px] lg:px-[12px] lg:py-[10px] rounded border-none text-[0.8rem] lg:text-[1.1rem] cursor-pointer transition-colors duration-300 hover:bg-[#499a4e]"
    >
      Signup
    </button>
  </form>
);

const ForgotPasswordModal = ({ handleClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-[20px] rounded-lg w-[90%] max-w-[400px]">
      <h2 className="text-[1.2rem] font-semibold mb-4">Forgot Password?</h2>
      <form className="flex flex-col">
        <label
          htmlFor="email"
          className="mb-2 text-[0.8rem] lg:text-[1.1rem]"
        >
          Enter your email to reset your password:
        </label>
        <input
          type="email"
          id="email"
          placeholder="youremail@example.com"
          className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
        />

        <button
          type="submit"
          className="w-full bg-[#4ead54] text-white font-bold px-[2px] py-[3px] lg:px-[12px] lg:py-[10px] rounded border-none text-[0.8rem] lg:text-[1.1rem] cursor-pointer transition-colors duration-300 hover:bg-[#499a4e]"
        >
          Reset Password
        </button>
      </form>
      <button
        onClick={handleClose}
        className="text-red-500 font-semibold mt-4 w-full"
      >
        Close
      </button>
    </div>
  </div>
);

const LeftSection = () => (
  <div className="flex-1 flex flex-col justify-center items-center bg-[#72a876] p-[20px] text-white md:rounded-l-[10px]">
    <h2 className="text-center text-[16px] md:text-[22px] lg:text-[32px] font-semibold mb-[10px]">
      Welcome to PlantWorld
    </h2>
    <p className="text-[10px] md:text-[13px] lg:text-[18px] mb-[10px] md:mb-[22px] lg:mb-[30px]">
      One stop for all the variety of plants
    </p>
    <div className="w-full max-w-[400px]">
      <img
        src="/Shop By Category/image-3.jpg"
        alt="Plant"
        className="w-full rounded-[10px]"
      />
    </div>
  </div>
);

const RightSection = ({ isSignup, setIsSignup, handleForgotPassword }) => (
  <div className="flex-1 flex flex-col justify-center bg-[#f4f7f4] p-[20px] lg:p-[40px] md:rounded-r-[10px]">
    <Logo />
    <h3 className="text-[0.7rem] lg:text-[1.3rem] text-center mb-[0.7rem] lg:mb-[1.2rem]">
      {isSignup ? "Create a PlantWorld Account" : "Login to your PlantWorld Account"}
    </h3>
    {isSignup ? <SignupForm /> : <LoginForm handleForgotPassword={handleForgotPassword} />}
    <div className="text-center text-[1rem] mt-[20px]">
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

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false); 
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPasswordModal(true);
  };

  const handleCloseModal = () => {
    setShowForgotPasswordModal(false);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#ecffed] p-2 md:p-4">
      <BackToHomeButton />
      <div className="flex w-[90%] md:w-[80%] max-w-[1200px] bg-white/80 rounded-[10px] shadow-lg flex-col sm:flex-row mt-10">
        <LeftSection />
        <RightSection
          isSignup={isSignup}
          setIsSignup={setIsSignup}
          handleForgotPassword={handleForgotPassword}
        />
      </div>

      {showForgotPasswordModal && (
        <ForgotPasswordModal handleClose={handleCloseModal} />
      )}
    </div>
  );
};

export default LoginPage;