import React from "react";
import { Link } from "react-router-dom";

export default function EmptyOrdersMessage() {
  return (
    <div className="m-5 text-center">
      <p className="text-gray-500 text-lg md:text-xl font-medium mb-4">
        🛒 Looks like you haven't placed any orders yet!
      </p>
      <p className="text-gray-500 text-lg md:text-xl font-medium mb-4">
        Check out our latest picks!
      </p>
      <Link
        to="/shop"
        className="m-4 inline-block btn btn-success text-white px-4 py-2 rounded-md text-xs md:text-base font-semibold transition duration-300"
      >
        Shop Now
      </Link>
    </div>
  );
}
