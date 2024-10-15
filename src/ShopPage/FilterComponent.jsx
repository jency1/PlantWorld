import React from "react";

function FilterComponent() {
  return (
    <div
      className="filter-section p-4"
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        marginLeft: "20px",
        border: "0.5px solid lightgray",
      }}
    >
      <h4 className="text-success">Filters</h4>

      {/* Search Box */}
      <div className="my-3">
        <input type="text" className="form-control" placeholder="Search" />
      </div>

      {/* Price Range Filter */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: "0.5rem",
          padding: "1rem",
        }}
      >
        <h5>Price Range</h5>
        <input type="range" className="form-range" min="100" max="5000" />
        <div className="d-flex flex-column flex-sm-row justify-content-between">
          <span>Rs.100</span>
          <span>Rs.5000</span>
        </div>
      </div>

      {/* Availability Filter */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: "0.5rem",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        <h5>Availability</h5>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="In Stock"
            id="inStock"
          />
          <label className="form-check-label" htmlFor="inStock">
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
          <label className="form-check-label" htmlFor="perOrder">
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
          <label className="form-check-label" htmlFor="upComing">
            Up Coming
          </label>
        </div>
      </div>

      {/* Categories Filter */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: "0.5rem",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        <h5>Categories</h5>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="All"
            id="all"
          />
          <label className="form-check-label" htmlFor="all">
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
          <label className="form-check-label" htmlFor="outdoor">
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
          <label className="form-check-label" htmlFor="indoor">
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
          <label className="form-check-label" htmlFor="terrace & balcony">
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
          <label className="form-check-label" htmlFor="office">
            Office Desk
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;
