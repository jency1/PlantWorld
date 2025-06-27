import React from "react";

function BlogHeader() {
  return (
    <div className="relative h-64 bg-gray-200 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center blur-md"
        style={{ backgroundImage: `url("/frontend/BlogPage/BlogHeader.jpg")` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 font-serif">
          About PlantWorld
        </h2>
        <h4 className="text-base md:text-xl px-4 md:px-16 lg:px-40">
          PlantWorld is where the love for gardening blooms. We provide
          inspiration and tips to help you grow a garden full of life, beauty,
          and happiness.
        </h4>
      </div>
    </div>
  );
}

export default BlogHeader;
