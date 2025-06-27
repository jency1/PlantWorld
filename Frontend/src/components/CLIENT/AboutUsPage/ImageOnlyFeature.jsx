import React from "react";

export default function ImageOnlyFeature({ imageSrc, altText }) {
  return (
    <div className="bg-gray-50 rounded-lg p-0.3 border-r border-b last:border-r-0 last:md:border-b-0 md:last:border-r-0">
      <div className="bg-cover bg-center">
        <img src={imageSrc} alt={altText} />
      </div>
    </div>
  );
}
