import React from "react";
import { useParams, Link } from "react-router-dom";
import blogData from "./blogData";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-600">Blog Not Found</h1>
        <p className="text-gray-600 mt-2">Sorry, we couldn't find this blog.</p>
        <Link
          to="/blog"
          className="mt-4 inline-block text-green-600 underline hover:text-green-800"
        >
          ← Go back to Blog Page
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Back link */}
      <div className="mt-8 ">
        <Link
          to="/blog"
          className="text-green-600 underline hover:text-green-800 ml-5 flex justify-start"
        >
          ← Back to all blogs
        </Link>
        <div className="px-4 md:px-12 py-10 max-w-4xl mx-auto">
          {/* Image */}
          <div className="mb-6">
            <div className="max-w-md mx-auto rounded-md overflow-hidden">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-auto object-cover rounded-lg shadow"
              />
            </div>
          </div>

          {/* Title and Content */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700 mb-4 text-center">
            {blog.title}
          </h1>
          <div className="text-gray-800 leading-relaxed">
            {/* Iterate over the fullContent array to render each block */}
            {blog.fullContent.map((block, index) => {
              if (block.type === "paragraph") {
                // Render a paragraph, using dangerouslySetInnerHTML for potential HTML like strong tags
                return (
                  <p
                    key={index}
                    className="mb-4"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                );
              } else if (block.type === "heading") {
                // Dynamically render h2, h3, etc., for headings
                const HeadingTag = `h${block.level || 3}`; // Default to h3 if level is not specified
                return (
                  <HeadingTag
                    key={index}
                    className="text-lg md:text-xl font-bold text-green-600 mt-6 mb-3"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                );
              } else if (block.type === "list") {
                // Render an unordered list
                return (
                  <ul key={index} className="list-disc pl-5 mb-4">
                    {block.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="mb-2"
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    ))}
                  </ul>
                );
              } else if (block.type === "separator") {
                // Render a horizontal rule for separators
                return <hr key={index} className="my-8 border-gray-300" />;
              }
              return null; // Return null for any unhandled block types
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
