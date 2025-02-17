import React from "react";

export default function AboutUs() {
  return (
    <div className="bg-white pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-success font-bold text-2xl md:text-3xl lg:text-4xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {/* Feature 1 */}
          <div className="bg-gray-50 rounded-lg p-0.3 border-r border-b last:border-r-0 last:md:border-b-0 md:last:border-r-0">
            <div className="bg-cover bg-center">
              <img src="/AboutUS/image1.jpg" alt="Friendly and fast support" />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-50 rounded-lg p-6 border-b md:last:border-b-0 flex justify-center flex-col">
            <div className="flex justify-center mb-4">
              <img
                src="/AboutUS/image2.png"
                alt="Organic and seed grown plants"
                className="w-40 h-40 object-contain"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Organic and seed grown plants
              </h3>
              <p className="text-gray-500">
                we offer organic and seed-grown plants, ensuring eco-friendly,
                chemical-free options for sustainable, healthy gardening.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-50 rounded-lg p-0.3 border-b last:border-b-0 md:last:border-r-0">
            <div className="bg-cover bg-center">
              <img src="/AboutUS/image3.jpg" alt="Friendly and fast support" />
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-50 rounded-lg p-6 border-r border-b last:border-r-0 md:border-b-0 md:last:border-r-0 flex justify-center flex-col">
            <div className="flex justify-center mb-4">
              <img
                src="/AboutUS/image4.png"
                alt="Friendly and fast support"
                className="w-40 h-40 object-contain"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Friendly and fast support
              </h3>
              <p className="text-gray-500">
                we provide friendly and fast support, ensuring your questions
                are answered quickly with helpful, knowledgeable assistance
                every time.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="bg-gray-50 rounded-lg p-0.3 border-b md:last:border-b-0">
            <div className="bg-cover bg-center">
              <img
                src="/AboutUS/image5.jpg"
                alt="Five plants you need in your life"
              />
            </div>
          </div>

          {/* Feature 6 */}
          <div className="bg-gray-50 rounded-lg p-6 border-b last:border-b-0 md:last:border-r-0 flex justify-center flex-col">
            <div className="flex justify-center mb-4">
              <img
                src="/AboutUS/image6.png"
                alt="Expert Guidance"
                className="w-40 h-40 object-contain"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Expert Guidance & Resources
              </h3>
              <p className="text-gray-500">
                we offer expert guidance to help you choose, care for, and grow
                your plants successfully, every step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
