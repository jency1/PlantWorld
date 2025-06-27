function BlogCard({ imageUrl, title, description }) {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-3 flex sm:flex-row lg:flex-col items-center lg:w-[500px]">
      <img
        src={imageUrl}
        alt={title}
        className="w-24 h-40 md:w-32 md:h-32 lg:w-full lg:h-72 object-cover rounded-lg"
      />
      <div className="ml-3">
        <h3 className="text-sm md:text-base lg:text-lg lg:mt-3 font-bold text-gray-800">
          {title}
        </h3>
        <p className="text-xs md:text-sm lg:text-base text-gray-600 mt-2">
          {description}
        </p>
        <button className="mt-2 md:mt-3 bg-green-600 text-white text-xs md:text-sm lg:text-base px-2 py-1 md:py-1 md:px-2 rounded hover:bg-green-700">
          Read More
        </button>
      </div>
    </div>
  );
}

export default function Blog() {
  const blogPosts = [
    {
      imageUrl: "/frontend/Home Page/Blog1.jpg",
      title: "Plant Care Tips & Guides",
      description:
        "Welcome to our Plant Care section, where we share expert advice and practical tips to help you keep your trees and plants healthy and thriving...",
    },
    {
      imageUrl: "/frontend/Home Page/Blog2.jpg",
      title: "Autumn Plant Care",
      description:
        "Discover the best practices to take care of your plants during the autumn season. Keep them blooming and vibrant!",
    },
    {
      imageUrl: "/frontend/Home Page/Blog3.jpg",
      title: "Decorative Plants for Indoors",
      description:
        "Find out which decorative plants suit your indoor spaces best and how to keep them thriving in different conditions.",
    },
  ];

  return (
    <div>
      <header className="text-center">
        <h1 className="font-serif mt-[30px] md:mt-[50px] lg:mt-[60px] lg:mb-4 text-success font-bold text-2xl md:text-3xl lg:text-4xl">
          From Our Blog
        </h1>
      </header>

      <div className="container mx-auto mb-5 px-4 py-6 flex flex-col lg:flex-row gap-6">
        {blogPosts.map((post, index) => (
          <BlogCard
            key={index}
            imageUrl={post.imageUrl}
            title={post.title}
            description={post.description}
          />
        ))}
      </div>
    </div>
  );
}
