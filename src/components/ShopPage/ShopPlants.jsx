import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import FilterComponent from "./FilterComponent"; // Import the filter component
import { PlantContext } from "../../context/PlantsContext.jsx";

function ShopPlants() {
  const { plants, fetchPlants, isLoading, error } = useContext(PlantContext);
  const [showFilter, setShowFilter] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update screenWidth when window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ProductCard = ({ imageSrc, title, price }) => {
    return (
      <div className="col-6 col-sm-4 col-md-3 col-lg-3 text-center mt-4">
        <div className="card p-3 bg-gray-100 rounded-lg shadow-md">
          <Link to="/product/description">
            <img
              src={imageSrc}
              alt={title}
              className="img-fluid object-cover rounded-lg w-full md:h-36 lg:h-48 mb-1 md:mb-3"
            />
          </Link>
          <div className="h6 mt-2 text-sm md:text-base lg:text-lg">{title}</div>
          <div className="text-success text-xs md:text-sm lg:text-base">
            {price}
          </div>
          <Link to="/product/description">
            <button className="btn btn-outline-success mt-2 lg:mt-3 lg:px-4 lg:py-2 text-xs sm:text-sm">
              Add To Cart
            </button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Left-side Filters */}
          <div className="col-12 col-md-3 mt-4">
            {/* Filter Button visible on mobile and tablet */}
            {screenWidth <= 768 && (
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="block btn btn-success w-full mb-3"
              >
                {showFilter ? "Hide Filters" : "Show Filters"}
              </button>
            )}

            {/* Display Filter Component only on Mobile/Tablet Devices if Button Clicked */}
            {showFilter && screenWidth <= 768 && <FilterComponent />}

            {/* Always display filter for Medium and Larger Devices (768px and above) */}
            {screenWidth > 768 && <FilterComponent />}
          </div>

          {/* Right-side Product Cards */}
          <div className="col-12 col-md-9">
            <div className="row">
              {isLoading && (
                <p className="text-center text-lg">Loading plants...</p>
              )}
              {error && <p className="text-center text-red-500">{error}</p>}
              {!isLoading &&
                !error &&
                plants?.plants?.map((plant) => (
                  <ProductCard
                    key={plant.id || plant.title}
                    imageSrc={plant.imageCover}
                    title={plant.name}
                    price={plant.price}
                  />
                ))}
              {/* {products.map((product) => (
                <ProductCard
                  key={product.id}
                  imageSrc={product.imageSrc}
                  title={product.title}
                  price={product.price}
                />
              ))} */}
            </div>
          </div>
        </div>
      </div>
      <div className="my-5"></div>
    </>
  );
}

const products = [
  {
    id: 1,
    imageSrc: "/Featured Products/image1.jpg",
    title: "Plant",
    price: "Rs.500",
  },
  {
    id: 2,
    imageSrc: "/Featured Products/image2.jpg",
    title: "Plant",
    price: "Rs.500",
  },
  {
    id: 3,
    imageSrc: "/Featured Products/image3.jpg",
    title: "Plant",
    price: "Rs.500",
  },
  {
    id: 4,
    imageSrc: "/Featured Products/image4.jpg",
    title: "Plant",
    price: "Rs.500",
  },
  {
    id: 5,
    imageSrc: "/Featured Products/image5.jpg",
    title: "Plant",
    price: "Rs.500",
  },
  {
    id: 6,
    imageSrc: "/Featured Products/image6.jpg",
    title: "Plant",
    price: "Rs.500",
  },
  {
    id: 7,
    imageSrc: "/Featured Products/image7.jpg",
    title: "Plant",
    price: "Rs.500",
  },
  {
    id: 8,
    imageSrc: "/Featured Products/image8.jpg",
    title: "Plant",
    price: "Rs.500",
  },
  {
    id: 9,
    imageSrc: "/Featured Products/image1.jpg",
    title: "Plant",
    price: "Rs.500",
  },
  {
    id: 10,
    imageSrc: "/Featured Products/image2.jpg",
    title: "Plant",
    price: "Rs.500",
  },
  {
    id: 11,
    imageSrc: "/Featured Products/image3.jpg",
    title: "Plant",
    price: "Rs.500",
  },
  {
    id: 12,
    imageSrc: "/Featured Products/image4.jpg",
    title: "Plant",
    price: "Rs.500",
  },
];

export default ShopPlants;
