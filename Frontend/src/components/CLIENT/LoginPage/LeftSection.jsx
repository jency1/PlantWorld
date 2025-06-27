import React from "react";

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
        src="/frontend/Shop By Category/image-3.jpg"
        alt="Plant"
        className="w-full rounded-[10px]"
      />
    </div>
  </div>
);

export default LeftSection;
