import React from "react";

const FAQImage = ({ image, alt }) => {
  return (
    <div className="w-2/3 md:w-1/3 mb-6 md:mb-0 mx-auto">
      <img
        src={image}
        alt={alt}
        className="rounded-lg shadow-md w-full h-auto object-cover"
      />
    </div>
  );
};

export default FAQImage;
