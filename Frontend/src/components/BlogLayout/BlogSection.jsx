import React from 'react';

// Reusable BlogSection Box Component
const BlogSectionBox = ({ imageUrl, title, description, buttonText }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 md:h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <button className="bg-green-500 text-white px-4 py-2 rounded-full text-xs">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

// BlogSection Component with 9 Boxes in 3 Rows
const BlogSection = () => {
  const blogItems = [
    {
      imageUrl: '/BlogPage/Box1.jpg',
      title: 'Greenery on Display',
      description: 'A curated selection of indoor plants adds a touch of nature to a minimalist space, arranged along a clean, wooden shelf.',
      buttonText: 'Read More',
    },
    {
      imageUrl: '/BlogPage/Box2.jpg',
      title: 'Potted Plant Parade',
      description: 'A vibrant collection of lush indoor plants, carefully arranged in decorative pots, graces a light-colored dresser, bringing a touch of nature indoors.',
      buttonText: 'Read More',
    },
    {
      imageUrl: '/BlogPage/Box3.jpg',
      title: 'Herb Haven Kitchen',
      description: 'A modern kitchen with wooden accents features potted herbs and plants, blending culinary functionality with natural decor.',
      buttonText: 'Read More',
    },
    {
      imageUrl: '/BlogPage/Box4.jpg',
      title: 'Tiny Plants, Big Dreams',
      description: ' Three small plants in biodegradable pots stand ready to grow, embodying the potential of every seed and the joy of gardening.',
      buttonText: 'Read More',
    },
    {
      imageUrl: '/BlogPage/Box5.jpg',
      title: 'Miniature Green Futures',
      description: 'Small saplings in individual growing bags, ready for transplant, are nurtured in a protected environment, emphasizing reforestation.',
      buttonText: 'Read More',
    },
    {
      imageUrl: '/BlogPage/Box6.jpg',
      title: ' Succulent Driftwood Garden',
      description: 'A weathered driftwood planter houses a variety of succulents, creating a charming and natural display with a touch of rustic charm.',
      buttonText: 'Read More',
    },
    {
      imageUrl: '/BlogPage/Box7.jpg',
      title: 'Curated Plant Sanctuary',
      description: 'A well-organized display of diverse plants, decorative pots, and stylish home goods creates a visually appealing and inviting space.',
      buttonText: 'Read More',
    },
    {
      imageUrl: '/BlogPage/Box8.jpg',
      title: 'Minimalist Plant Corner',
      description: 'A clean, modern space with a ladder shelf holding various potted plants, alongside a Saigon map and a bright balcony, exemplifies simple elegance.',
      buttonText: 'Read More',
    },
    {
      imageUrl: '/BlogPage/Box9.jpg',
      title: ' Rustic Table, Modern Greens',
      description: 'The Herbstation system, with its modern grow lights, contrasts beautifully with the rustic table, showcasing fresh herbs in a contemporary space.',
      buttonText: 'Read More',
    },
  ];

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {blogItems.map((item, index) => (
            <BlogSectionBox key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;