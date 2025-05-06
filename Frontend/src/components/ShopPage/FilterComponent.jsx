import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function FilterComponent({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  tag,
  setTag,
  availability,
  setAvailability,
  categories,
  setCategories,
  searchTerm,
  setSearchTerm,
  plantData,
  setPlantData,
}) {
  // HANDLE SEARCH
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // // Filter plants based on the search term and current filters
    // const filteredPlantsData = plantData.filter(
    //   (plant) =>
    //     plant.name.toLowerCase().includes(value.toLowerCase()) &&
    //     plant.price >= minPrice &&
    //     plant.price <= maxPrice &&
    //     (tag.length === 0 || tag.includes(plant.category)) &&
    //     (categories.length === 0 || categories.includes(plant.category)) &&
    //     (availability.length === 0 || availability.includes(plant.availability))
    // );

    // setPlantData(filteredPlantsData);
  };

  // HANDLE CATEGORY CHANGE
  const handleCategoryChange = (e) => {
    const value = e.target.value;

    // If "All" is selected, clear all categories
    if (value === "All") {
      setCategories([]);
    } else {
      if (e.target.checked) {
        setCategories([...categories, value]);
      } else {
        setCategories(categories.filter((cat) => cat !== value));
      }
    }
  };

  // HANDLE AVAILABILITY CHANGE
  const handleAvailabilityChange = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setAvailability([...availability, value]);
    } else {
      setAvailability(availability.filter((status) => status !== value));
    }
  };

  return (
    <div className="filter-section p-4 bg-white rounded-lg ml-5 border border-gray-300">
      <h4 className="text-success font-semibold text-lg lg:text-xl sm:text-sm">
        Filters
      </h4>

      {/* Search Box */}
      <div className="my-3">
        <input
          type="text"
          className="form-control text-sm sm:text-xs lg:text-base"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Price Range Filter */}
      <div className="bg-gray-100 rounded-lg p-4 sm:p-3">
        <h5 className="sm:text-xs lg:text-lg mb-2">Price Range</h5>

        {/* <input type="range" className="form-range" min="50" max="5000" /> */}
        <Slider
          range
          min={0}
          max={5000}
          value={[minPrice, maxPrice]}
          onChange={([min, max]) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
        />

        <div className="flex sm:flex-row justify-between mt-1 text-xs sm:text-xs">
          <span className="text-sm">Rs.{minPrice}</span>
          <span className="text-sm">Rs.{maxPrice}</span>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="bg-gray-100 rounded-lg p-4 mt-4 sm:p-3">
        <h5 className="sm:text-xs lg:text-lg">Categories</h5>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="All"
            id="all"
            onChange={handleCategoryChange}
            checked={categories.length === 0}
          />
          <label className="form-check-label text-sm" htmlFor="all">
            All
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="Outdoor"
            id="outdoor"
            onChange={handleCategoryChange}
            checked={categories.includes("Outdoor")}
          />
          <label className="form-check-label text-sm" htmlFor="outdoor">
            Outdoor
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="Indoor"
            id="indoor"
            onChange={handleCategoryChange}
            checked={categories.includes("Indoor")}
          />
          <label className="form-check-label text-sm" htmlFor="indoor">
            Indoor
          </label>
        </div>

        {/* <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="terrace & balcony"
            id="terrace & balcony"
            onChange={handleCategoryChange}
          />
          <label
            className="form-check-label text-sm"
            htmlFor="terrace & balcony"
          >
            Terrace and Balcony
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="Office"
            id="office"
            onChange={handleCategoryChange}
          />
          <label className="form-check-label text-sm" htmlFor="office">
            Office Desk
          </label>
        </div> */}

        {/* <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="flowering plants"
            id="flowering plants"
            onChange={handleCategoryChange}
          />
          <label
            className="form-check-label text-sm"
            htmlFor="flowering plants"
          >
            Flowering Plants
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="herbs"
            id="herbs"
            onChange={handleCategoryChange}
          />
          <label className="form-check-label text-sm" htmlFor="herbs">
            Herbs
          </label>
        </div> */}
      </div>

      {/* Availability Filter */}
      <div className="bg-gray-100 rounded-lg p-4 mt-4 sm:p-3">
        <h5 className="sm:text-xs lg:text-lg">Availability</h5>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="In Stock"
            id="inStock"
            onChange={handleAvailabilityChange}
            checked={availability.includes("In Stock")}
          />
          <label className="form-check-label text-sm" htmlFor="inStock">
            In Stock
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="Out Of Stock"
            id="outOfStock"
            onChange={handleAvailabilityChange}
            checked={availability.includes("Out Of Stock")}
          />
          <label className="form-check-label text-sm" htmlFor="outOfStock">
            Out Of Stock
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="UpComing"
            id="upComing"
            onChange={handleAvailabilityChange}
            checked={availability.includes("UpComing")}
          />
          <label className="form-check-label text-sm" htmlFor="upComing">
            UpComing
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;
