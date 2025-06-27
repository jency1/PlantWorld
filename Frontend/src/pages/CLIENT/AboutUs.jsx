import React from "react";
import AboutFeatureGrid from "../../components/CLIENT/AboutUsPage/AboutFeatureGrid";

export default function AboutUs() {
  return (
    <div className="bg-white pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-success font-bold text-2xl md:text-3xl lg:text-4xl font-serif">
            About Us
          </h2>
          <p className="mt-4 max-w-5xl sm:text-base md:text-lg lg:text-xl text-gray-500 lg:mx-auto">
            At PlantWorld, we believe in the power of plants to inspire, purify,
            and transform any space. Whether you're a seasoned gardener or a
            curious beginner, we offer a curated collection of healthy,
            high-quality plants, pots, and gardening essentials to fit your
            unique style and needs.
          </p>
        </div>

        <AboutFeatureGrid />
      </div>
    </div>
  );
}
