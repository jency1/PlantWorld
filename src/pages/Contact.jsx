import React from "react";

const Logo = () => (
  <div className="flex items-center justify-center mb-[1rem] lg:mb-[1.5rem]">
    <h2 className="text-[20px] lg:text-[28px] font-bold text-[#72A876]">
      PlantWorld
    </h2>
  </div>
);

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
      className="lg:mt-2     mb-2 ml-1 text-[0.8rem] lg:text-[1.06rem]"
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

const LeftSection = () => (
  <div className="flex-1 flex flex-col justify-center items-center bg-[#72a876] p-[20px] text-white md:rounded-l-[10px]">
    <h2 className="text-center text-[16px] md:text-[22px] lg:text-[32px] font-semibold mb-[15px]">
      Get In Touch
    </h2>
    <p className="text-[10px] md:text-[13px] lg:text-[18px] mb-[10px] md:mb-[22px] lg:mb-[30px]">
      We are just a message away from helping you.
    </p>
    <div className="w-full max-w-[400px]">
      <img
        src="/Contact Us/contact2.jpg"
        alt="Plant"
        className="w-full rounded-[10px]"
      />
    </div>
  </div>
);

const RightSection = () => (
  <div className="flex-1 flex flex-col justify-center bg-[#f4f7f4] p-[20px] lg:p-[40px] md:rounded-r-[10px]">
    <Logo />
    <LoginForm />
  </div>
);

export default function Contact() {
  return (
    <div className="relative flex justify-center items-center bg-[#ecffed]">
      <div className="flex w-[90%] md:w-[80%] max-w-[1200px] bg-white/80 rounded-[10px] shadow-lg flex-col sm:flex-row mt-7 md:mt-10 mb-5">
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
}
