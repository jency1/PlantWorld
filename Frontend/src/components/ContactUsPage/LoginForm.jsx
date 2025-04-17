import React from "react";

const LoginForm = () => (
  <form className="flex flex-col w-full">
    <label
      htmlFor="username"
      className="mb-2 ml-1 text-[0.8rem] lg:text-[1.08rem]"
    >
      Name:
    </label>
    <input
      required
      type="text"
      id="username"
      placeholder="Enter your name here"
      className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
    />

    <label
      htmlFor="contactNumber"
      className="lg:mt-2 mb-2 ml-1 text-[0.8rem] lg:text-[1.06rem]"
    >
      Contact Number:
    </label>
    <input
      required
      type="tel"
      id="contactNumber"
      placeholder="123-456-7890"
      className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      title="Enter a valid phone number in the format: 123-456-7890"
    />

    <label
      htmlFor="message"
      className="lg:mt-2 mb-2 ml-1 text-[0.8rem] lg:text-[1.08rem]"
    >
      Your Message:
    </label>
    <textarea
      required
      id="message"
      placeholder="Enter your message here..."
      className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
      rows="4"
    ></textarea>

    <div className="w-fit px-3 py-1 rounded-lg mt-1 text-xs md:text-md lg:text-lg mb-[8px] lg:mb-[15px] bg-[#659e69] hover:bg-[#499a4e] ml-auto">
      <button
        type="submit"
        className="text-white no-underline bg-transparent border-none cursor-pointer"
      >
        Send Message
      </button>
    </div>
  </form>
);

export default LoginForm;
