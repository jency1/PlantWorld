import React from "react";

const FAQImage = ({ image, alt }) => {
  return (
    <div className="md:w-1/3 mb-8 md:mb-0">
      <img src={image} alt={alt} className="rounded-lg shadow-lg w-full" />
    </div>
  );
};

export default FAQImage;
