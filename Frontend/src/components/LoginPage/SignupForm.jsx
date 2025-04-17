import React from "react";

const SignupForm = () => (
  <form className="flex flex-col w-full">
    <label htmlFor="email" className="mb-2 text-[0.8rem] lg:text-[1.1rem]">
      Email:
    </label>
    <input
      type="email"
      id="email"
      placeholder="xyz@example.com"
      required
      className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
    />

    <label htmlFor="mobile" className="mb-2 text-[0.8rem] lg:text-[1.1rem]">
      Mobile Number:
    </label>
    <input
      type="tel"
      id="mobile"
      placeholder="123-456-7890"
      required
      className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
    />

    <label htmlFor="password" className="mb-2 text-[0.8rem] lg:text-[1.1rem]">
      Password:
    </label>
    <input
      type="password"
      id="password"
      placeholder="*****"
      required
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
      required
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

export default SignupForm;
