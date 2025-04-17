import React from "react";

const ForgotPasswordModal = ({ handleClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-[20px] rounded-lg w-[90%] max-w-[400px]">
      <h2 className="font-semibold mb-4 text-[17px] lg:text-[22px] text-center text-[#72A876]">
        Forgot Password?
      </h2>
      <form className="flex flex-col">
        <label htmlFor="email" className="mb-2 text-[0.8rem] lg:text-[1.1rem]">
          Enter your email to reset your password:
        </label>
        <input
          type="email"
          id="email"
          placeholder="xyz@example.com"
          required
          className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
        />

        <button
          type="submit"
          className=" bg-[#4ead54] text-white font-bold py-[6px] md:py-[8px] lg:py-[7px] rounded border-none text-[0.8rem] lg:text-[1.1rem] cursor-pointer transition-colors duration-300 hover:bg-[#499a4e]"
        >
          Reset Password
        </button>
      </form>
      <button
        onClick={handleClose}
        className="text-red-500 font-semibold text-sm md:text-base lg:text-lg mt-4 w-full"
      >
        Close
      </button>
    </div>
  </div>
);

export default ForgotPasswordModal;
