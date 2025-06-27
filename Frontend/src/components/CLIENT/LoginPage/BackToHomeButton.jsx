import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const BackToHomeButton = () => (
  <Link
    to="/"
    className="absolute top-[18px] left-[18px] md:top-[25px] md:left-[30px] text-[#72a876] font-bold p-[6px] md:p-[8px] lg:p-[12px] rounded border border-[#72a876] hover:bg-[#4ead54] hover:text-white transition-colors duration-300"
  >
    <FaHome className="text-base md:text-lg lg:text-2xl" />
  </Link>
);

export default BackToHomeButton;
