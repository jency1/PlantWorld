import React from "react";

export default function TextCardFeature({
  imageSrc,
  altText,
  title,
  description,
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border-b md:last:border-b-0 flex justify-center flex-col">
      <div className="flex justify-center mb-4">
        <img
          src={imageSrc}
          alt={altText}
          className="w-40 h-40 object-contain"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}
