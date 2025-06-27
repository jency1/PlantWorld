import { useState, useEffect, useContext } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";

import LoadingSpinner from "../../../ui/LoadingSpinner";
import { useNotification } from "../../../context/NotificationContext";
import { CartContext } from "../../../context/CLIENT/CartContext";

export default function ProductDescription({ plantId }) {
  const { showNotification } = useNotification();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const { cart, addToCart, getPlantQuantity, addToCartLoading } =
    useContext(CartContext);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Function for Fetching Plant Data
  useEffect(() => {
    const fetchPlantData = async () => {
      if (!plantId) {
        showNotification(
          "Sorry! Unable to load the plant data. Please try again later!",
          "error"
        );
        setError("Plant ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const apiUrl = `${BASE_URL}/api/plants/${plantId}`;

        const response = await fetch(apiUrl);

        const responseText = await response.text();

        if (!response.ok) {
          showNotification(
            "Sorry! Unable to load the plant data. Please try again later!",
            "error"
          );
          throw new Error(
            `Failed to fetch: ${response.status} - ${responseText}`
          );
        }

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (err) {
          showNotification(
            "Sorry! Unable to load the plant data. Please try again later!",
            "error"
          );
          throw new Error("Failed to parse response as JSON");
        }

        let plantData = null;
        if (data.data?.plants?.length > 0) {
          plantData = data.data.plants[0];
        } else if (data.data?.plant) {
          plantData = data.data.plant;
        } else if (data.data) {
          plantData = data.data;
        }

        if (!plantData) {
          showNotification(
            "Sorry! Unable to load the plant data. Please try again later!",
            "error"
          );
          throw new Error("Plant data not found in response.");
        }

        setPlant(plantData);
        setLoading(false);
      } catch (err) {
        console.error("Error in fetchProductData:", err);
        setError(err.message);
        setLoading(false);
        showNotification(`Error loading plant data: ${err.message}`, "error");
      }
    };

    if (plantId) {
      fetchPlantData();
    }
  }, [plantId]);

  // Fetch quantity from CartContext
  useEffect(() => {
    if (plant) {
      const currentQty = getPlantQuantity(plant._id);
      setQuantity(currentQty || 0);
    }
  }, [plant, getPlantQuantity]);

  // Handle increase/decrease quantity
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // Handle adding plant to cart
  const handleAddToCart = () => {
    if (quantity === 0) {
      showNotification("Quantity must be at least 1.", "warning");
      return;
    }
    addToCart(plant, quantity);
  };

  // Loading Data - Animate Spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show Error Message
  if (error) {
    return (
      <div className="container mx-auto py-5 px-6 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <p className="mt-2">
            Sorry! Unable to load the plant data. Please try again later!
          </p>
        </div>
      </div>
    );
  }

  // If plant data is not available
  if (!plant) {
    return (
      <div className="container mx-auto py-5 px-6 text-center">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Notice</strong>
          <span className="block sm:inline">Oops! Plant Data not found!</span>
        </div>
      </div>
    );
  }

  // Image URL
  const imageUrl = plant.imageCover?.startsWith("/backend")
    ? `${BASE_URL}${plant.imageCover}`
    : plant.imageCover;

  return (
    <div className="container mx-auto py-5 px-6">
      <div className="flex flex-wrap justify-center">
        {/* Image */}
        <div className="w-full md:w-1/2 lg:w-2/5 text-center">
          {imageUrl ? (
            <img
              src={plant.imageCover}
              alt={plant.name}
              className="w-full md:max-w-xs lg:max-w-sm h-80 lg:h-96 rounded-md shadow-md"
              onError={(e) => {
                e.target.src = "/placeholder-plant.jpg";
              }}
            />
          ) : (
            <div className="w-full md:max-w-xs lg:max-w-md h-72 md:h-80 lg:h-96 bg-gray-200 flex items-center justify-center rounded-md shadow-md">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>

        {/* Plant Detail Section */}
        <div className="w-full md:w-1/2 lg:w-2/5 mt-6 md:mt-0">
          <h1 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-5 text-green-700">
            {plant.name}
          </h1>
          <p className="text-sm md:text-base lg:text-lg mb-3 text-gray-600">
            {plant.shortDescription}
          </p>
          <h2 className="text-lg md:text-xl lg:text-2xl text-green-700 mb-3 lg:mb-4">
            Rs. {plant.price}
          </h2>

          {/* Plant Quantity */}
          <div className="flex items-center space-x-6">
            {/* Quantity Controls */}
            <div className="flex items-center space-x-3">
              <button
                className="px-1 py-1 border-1 border-black hover:bg-gray-200 rounded"
                onClick={() => handleDecrease()}
              >
                <FaMinus className="text-[6px] md:text-[8px] lg:text-[12px]" />
              </button>
              <span className="text-sm md:text-base lg:text-lg font-semibold bg-gray-200 text-center px-3 py-1 rounded-md">
                {quantity}
              </span>
              <button
                className="px-1 py-1 border-1 border-black hover:bg-gray-200 rounded"
                onClick={() => handleIncrease()}
              >
                <FaPlus className="text-[6px] md:text-[8px] lg:text-[12px]" />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={addToCartLoading}
              className="py-1 px-2 text-xs md:text-sm lg:text-base bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors flex items-center justify-center"
            >
              {addToCartLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>

          {/* Delivery Text */}
          <p className="mb-2 lg:mb-4 mt-4 text-sm md:text-base">
            <span className="flex items-center gap-2">
              <FcInfo />
              Free shipping on all orders over Rs 1000!
            </span>
          </p>
          {/* <p className="mb-2 text-sm md:text-base">
            <span className="lg:font-medium font-semibold">Delivers In:</span>{" "}
            3-7 Working Days
          </p> */}

          {/* Tag, category, Color */}
          <ul className="list-none mt-3 lg:mt-5 lg:space-y-3">
            <li className="text-sm md:text-base">
              <span className="lg:font-medium font-semibold">Tag:</span>{" "}
              {plant.tag || "N/A"}
            </li>
            <li className="text-sm md:text-base">
              <span className="lg:font-medium font-semibold">Category:</span>{" "}
              {plant.category || "N/A"}
            </li>
            <li className="text-sm md:text-base">
              <span className="lg:font-medium font-semibold">Color:</span>{" "}
              {plant.color?.join(", ") || "N/A"}
            </li>
          </ul>
        </div>
      </div>

      {/* Description */}
      <div className="mt-[2rem] lg:mt-[3rem] md:mx-[2rem] lg:mx-[9rem]">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700 mb-3 md:mb-4 lg:mb-5">
          Description
        </h2>
        <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-600">
          {plant.description}
        </p>

        {/* Plant Care Tips */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700 mt-4 lg:mt-10 mb-4">
          Care Tips for {plant.name}
        </h2>

        {plant.plantCareTips?.length > 0 ? (
          <ul className="list-none mt-3 md:mt-5 space-y-2 md:space-y-3 lg:space-y-4">
            {plant?.plantCareTips?.map((tip, index) => (
              <li
                key={index}
                className="text-sm md:text-base lg:text-lg text-gray-600"
              >
                <i className="bi bi-check-circle-fill text-green-700 mr-3"></i>
                {tip}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm md:text-base lg:text-lg text-gray-500">
            <span className="flex items-center gap-2">
              <FcInfo />
              No care tips available.
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
