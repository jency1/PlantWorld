import React from "react";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);

      let scrollTop;

      const screenWidth = window.innerWidth;

      if (screenWidth < 640) {
        // small devices
        scrollTop = window.innerHeight * 0.4;
      } else if (screenWidth < 1024) {
        // medium devices (tablet)
        scrollTop = window.innerHeight * 0.5;
      } else {
        // large devices (laptop/desktop)
        scrollTop = window.innerHeight * 0.8;
      }

      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center flex-wrap gap-2 mt-12 px-4">
      {/* First Page */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`btn btn-success text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaAngleDoubleLeft />
      </button>

      {/* Prev */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`btn btn-success text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaAngleLeft />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`btn text-xs sm:text-sm md:text-sm lg:text-base sm:px-2 sm:py-2 md:px-3 md:py-1 rounded-lg transition ${
            currentPage === number
              ? "btn-success text-white"
              : "btn-outline-success"
          }`}
        >
          {number}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`btn btn-success text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaAngleRight />
      </button>

      {/* Last Page */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`btn btn-success text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
