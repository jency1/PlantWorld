import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function FilterComponent({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  searchTerm,
  setSearchTerm,
  tag,
  setTag,
  categories,
  setCategories,
  availability,
  setAvailability,
}) {
  // HANDLE SEARCH
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // HANDLE TAG CHANGE - indoor, outdoor
  const handleTagChange = (e) => {
    const value = e.target.value;

    // If "All" is selected, clear all categories
    if (value === "All") {
      setTag([]);
    } else {
      if (e.target.checked) {
        setTag([...tag, value]);
      } else {
        setTag(tag.filter((type) => type !== value));
      }
    }
  };

  // HANDLE CATEGORY CHANGE
  const handleCategoryChange = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories.filter((cat) => cat !== value));
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

      {/* Type Filter */}
      <div className="bg-gray-100 rounded-lg p-4 mt-4 sm:p-3">
        <h5 className="sm:text-xs lg:text-lg">Type</h5>
        {[
          { label: "All", value: "All", isAllOption: true },
          { label: "Outdoor", value: "Outdoor" },
          { label: "Indoor", value: "Indoor" },
        ].map((type) => (
          <div className="form-check" key={type.value}>
            <input
              className="form-check-input"
              type="checkbox"
              value={type.value}
              id={type.value}
              onChange={handleTagChange}
              checked={
                type.isAllOption ? tag.length === 0 : tag.includes(type.value)
              }
            />
            <label className="form-check-label text-sm" htmlFor={type.value}>
              {type.label}
            </label>
          </div>
        ))}
      </div>

      {/* Categories Filter */}
      <div className="bg-gray-100 rounded-lg p-4 mt-4 sm:p-3">
        <h5 className="sm:text-xs lg:text-lg">Categories</h5>
        {[
          "Flowering Plants",
          "Foliage Plants",
          "Ferns",
          "Herbs",
          "Fruit Plants",
          "Succulent Plants",
          "Vegetables & Herbs",
          "Climbing Plants",
          "Creepers",
          "Succulents & Cacti",
          "Climbers",
          // "Indoor Plants",
        ].map((category) => (
          <div className="form-check" key={category}>
            <input
              className="form-check-input"
              type="checkbox"
              value={category}
              id={category}
              onChange={handleCategoryChange}
              checked={categories.includes(category)}
            />
            <label className="form-check-label text-sm" htmlFor={category}>
              {category}
            </label>
          </div>
        ))}
      </div>

      {/* Availability Filter */}
      <div className="bg-gray-100 rounded-lg p-4 mt-4 sm:p-3">
        <h5 className="sm:text-xs lg:text-lg">Availability</h5>
        {[
          { label: "In Stock", value: "In Stock" },
          { label: "Out Of Stock", value: "Out Of Stock" },
          { label: "Up Coming", value: "UpComing" },
        ].map((option) => (
          <div className="form-check" key={option.value}>
            <input
              className="form-check-input"
              type="checkbox"
              value={option.value}
              id={option.value}
              onChange={handleAvailabilityChange}
              checked={availability.includes(option.value)}
            />
            <label className="form-check-label text-sm" htmlFor={option.value}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterComponent;
