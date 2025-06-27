import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const products = [
    {
      imageUrl: "/frontend/Featured Products/image1.jpg",
      name: "Aloe Vera",
      price: "Rs.200",
    },
    {
      imageUrl: "/frontend/Featured Products/image2.jpg",
      name: "Bamboo Palm",
      price: "Rs.350",
    },
    {
      imageUrl: "/frontend/Featured Products/image3.jpg",
      name: "Cactus",
      price: "Rs.150",
    },
    {
      imageUrl: "/frontend/Featured Products/image4.jpg",
      name: "Snake Plant",
      price: "Rs.250",
    },
    {
      imageUrl: "/frontend/Featured Products/image5.jpg",
      name: "Ficus",
      price: "Rs.500",
    },
    {
      imageUrl: "/frontend/Featured Products/image6.jpg",
      name: "Spider Plant",
      price: "Rs.300",
    },
    {
      imageUrl: "/frontend/Featured Products/image7.jpg",
      name: "Money Plant",
      price: "Rs.400",
    },
    {
      imageUrl: "/frontend/Featured Products/image8.jpg",
      name: "Peace Lily",
      price: "Rs.600",
    },
  ];

  return (
    <div className="text-center px-4 lg:px-12">
      <h1 className="mt-8 md:mt-16 text-success font-bold text-2xl md:text-3xl lg:text-4xl font-serif">
        Featured Products
      </h1>
      <p className="w-full md:w-3/4 lg:w-2/3 mx-auto mt-8 text-sm md:text-base lg:text-lg">
        Discover our top trees, chosen for their beauty and resilience. Add
        color, fruit, or greenery to your garden with these customer favorites.
        Bring nature's charm home today.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8 mb-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ imageUrl, name, price }) {
  return (
    <div className="rounded-md hover:shadow-xl transition-shadow duration-300 p-2 md:p-4 lg:p-5">
      <Link to="/product/description">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 md:h-48 lg:h-72 object-cover rounded-md hover:cursor-pointer"
        />
      </Link>
      <h3 className="mt-3 text-sm md:text-base lg:text-lg font-medium text-green-700">
        {name}
      </h3>
      <div className="text-xs md:text-sm lg:text-base text-gray-700">
        {price}
      </div>
    </div>
  );
}
