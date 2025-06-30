import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import blogData from "./blogData";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(blogData);
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              imageUrl={blog.imageUrl}
              title={blog.title}
              description={blog.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
