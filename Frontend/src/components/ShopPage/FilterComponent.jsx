import React from "react";

function FilterComponent() {
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
        />
      </div>

      {/* Price Range Filter */}
      <div className="bg-gray-100 rounded-lg p-4 sm:p-3">
        <h5 className="sm:text-xs lg:text-lg">Price Range</h5>
        <input type="range" className="form-range" min="100" max="5000" />
        <div className="flex sm:flex-row justify-between text-xs sm:text-xs">
          <span className="text-sm">Rs.100</span>
          <span className="text-sm">Rs.5000</span>
        </div>
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
          />
          <label className="form-check-label text-sm" htmlFor="inStock">
            In Stock
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="Per Order"
            id="perOrder"
          />
          <label className="form-check-label text-sm" htmlFor="perOrder">
            Per Order
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="Up Coming"
            id="upComing"
          />
          <label className="form-check-label text-sm" htmlFor="upComing">
            Up Coming
          </label>
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
          />
          <label className="form-check-label text-sm" htmlFor="indoor">
            Indoor
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="terrace & balcony"
            id="terrace & balcony"
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
          />
          <label className="form-check-label text-sm" htmlFor="office">
            Office Desk
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;
