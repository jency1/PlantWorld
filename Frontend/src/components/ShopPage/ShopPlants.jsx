import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import FilterComponent from "./FilterComponent.jsx";
import Pagination from "../../ui/pagination.jsx";
import { PlantContext } from "../../context/PlantsContext.jsx";
import { CartContext } from "../../context/CartContext.jsx";

function ShopPlants() {
  const { plants, fetchPlants, isLoading, error, totalPages } =
    useContext(PlantContext);
  const { addToCart } = useContext(CartContext);

  const [showFilter, setShowFilter] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantity, setQuantity] = useState(1);

  // Filters State
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [availability, setAvailability] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const tag = categories.length > 0 ? categories[0] : "";

  const limit = 12;

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

  // Fetch paginated plants with filters
  useEffect(() => {
    fetchPlants(
      currentPage,
      limit,
      minPrice,
      maxPrice,
      categories,
      availability,
      searchTerm
    );
  }, [currentPage, minPrice, maxPrice, categories, availability, searchTerm]);

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Product Card
  const ProductCard = ({ plantId, imageSrc, title, price }) => {
    const handleAddToCart = () => {
      const plant = {
        _id: plantId,
        name: title,
        price,
        imageCover: imageSrc,
      };
      addToCart(plant, quantity);
    };

    return (
      <div className="col-6 col-sm-4 col-md-3 col-lg-3 text-center mt-4">
        <div className="card p-3 bg-gray-100 rounded-lg shadow-md">
          <Link to={`/plant/description/${plantId}`}>
            <img
              src={imageSrc}
              alt={title}
              className="img-fluid object-cover rounded-lg w-full h-32 md:h-44 lg:h-56 mb-1 md:mb-3"
            />
          </Link>
          <div className="h6 mt-2 text-sm md:text-base lg:text-lg">{title}</div>
          <div className="text-success text-xs md:text-sm lg:text-base">
            Rs.{price}
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-2">
            <Link to={`/plant/description/${plantId}`}>
              <button className="btn border border-success text-success mt-2 lg:mt-3 lg:px-4 lg:py-2 text-xs md:text-sm">
                View Details
              </button>
            </Link>
            <button
              onClick={handleAddToCart}
              className="btn btn-success mt-2 lg:mt-3 lg:px-4 lg:py-2 text-xs md:text-sm"
            >
              Add To Cart
            </button>
          </div>
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
            {showFilter && screenWidth <= 768 && (
              <FilterComponent
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                availability={availability}
                setAvailability={setAvailability}
                categories={categories}
                setCategories={setCategories}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            )}

            {/* Always display filter for Medium and Larger Devices (768px and above) */}
            {screenWidth > 768 && (
              <FilterComponent
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                availability={availability}
                setAvailability={setAvailability}
                categories={categories}
                setCategories={setCategories}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            )}
          </div>

          {/* Right-side Product Cards */}
          <div className="col-12 col-md-9">
            <div className="row">
              {/* Fetching data from backend */}
              {isLoading && (
                <p className="text-center text-lg">Loading plants...</p>
              )}
              {error && <p className="text-center text-red-500">{error}</p>}
              {!isLoading &&
                !error &&
                plants?.map((plant) => (
                  <ProductCard
                    key={plant._id || plant.title}
                    plantId={plant._id}
                    imageSrc={plant.imageCover}
                    title={plant.name}
                    price={plant.price}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Component */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <div className="my-5"></div>
    </>
  );
}

export default ShopPlants;
