import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ id, imageUrl, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 md:h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <Link
          to={`/blog/${id}`}
          className="bg-green-600 text-white px-4 py-2 rounded-full text-xs hover:bg-green-700 transition"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
