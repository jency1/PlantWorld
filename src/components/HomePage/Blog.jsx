// BlogCard Component: Reusable card component for displaying blog informations
function BlogCard({ imageUrl, title, description }) {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md mb-5 p-4">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-52 object-cover rounded-lg"
      />
      <div className="blog-content mt-3">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
          Read More
        </button>
      </div>
    </div>
  );
}

export default function Blog() {
  // Blog data array
  const blogPosts = [
    {
      imageUrl:
        "https://hips.hearstapps.com/hmg-prod/images/a-set-of-colorful-potted-plants-on-a-patterned-area-royalty-free-image-1716493110.jpg?crop=0.668xw:1.00xh;0.210xw,0&resize=1200:*",
      title: "Plant Care Tips & Guides",
      description:
        "Welcome to our Plant Care section, where we share expert advice and practical tips to help you keep your trees and plants healthy and thriving...",
    },
    {
      imageUrl:
        "https://merchantandgreen.com.au/product_images/uploaded_images/autumn-plant-care-07.png",
      title: "Autumn Plant Care",
      description:
        "Discover the best practices to take care of your plants during the autumn season. Keep them blooming and vibrant!",
    },
    {
      imageUrl:
        "https://thelittlecountrystore.com.au/cdn/shop/collections/download_6d6b0382-bf64-4d93-910a-ae93aa530910_300x300.jpg?v=1696991699",
      title: "Decorative Plants for Indoors",
      description:
        "Find out which decorative plants suit your indoor spaces best and how to keep them thriving in different conditions.",
    },
  ];

  return (
    <div className="blog-section">
      {/* Header Section */}
      <header className="text-center py-8">
        <h1 className="text-3xl font-bold text-success">From Our Blog</h1>
      </header>

      {/* Blog Cards Container */}
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
