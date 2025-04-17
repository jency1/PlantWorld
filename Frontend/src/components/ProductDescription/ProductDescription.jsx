export default function ProductDescription() {
  return (
    <div className="container mx-auto py-5 px-6">
      <div className="flex flex-wrap justify-center">
        {/* Product Image */}
        <div className="w-full md:w-1/2 lg:w-2/5 text-center">
          <img
            src="../Shop By Category/image-1.jpg"
            alt="Houseplant Philippine"
            className="w-full md:max-w-xs lg:max-w-lg mb-5 rounded-md shadow-md"
          />
          <div className="flex justify-start space-x-4 lg:space-x-9">
            <img
              src="../Shop By Category/image-1.jpg"
              alt="thumbnail"
              className="w-20 h-14 md:w-24 md:h-16 lg:w-36 lg:h-24 border border-gray-300 rounded-md image"
            />
            <img
              src="../Shop By Category/image-1.jpg"
              alt="thumbnail"
              className="w-20 h-14 md:w-24 md:h-16 lg:w-36 lg:h-24 border border-gray-300 rounded-md"
            />
            <img
              src="../Shop By Category/image-1.jpg"
              alt="thumbnail"
              className="w-20 h-14 md:w-24 md:h-16 lg:w-36 lg:h-24 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 lg:w-2/5 mt-6 md:mt-0">
          <h1 className="text-xl md:text-2xl md:0 mt-4 lg:text-3xl font-bold mb-3 lg:mb-5 text-green-700">
            Houseplant
          </h1>
          <p className="text-sm md:text-base lg:text-lg mb-2 lg:mb-3 text-gray-600">
            Houseplants bring nature indoors, improve air quality, and thrive in
            various light conditions. Perfect for stress relief and decor.
          </p>
          <h2 className="text-lg md:text-xl lg:text-2xl text-green-700 mb-3 lg:mb-4">
            Rs 500
          </h2>
          <div className="flex items-center mb-4 md:mb-5">
            <input
              type="number"
              className="w-16 md:w-20 border border-gray-300 rounded-md px-1 py-1 text-xs md:text-sm lg:text-base text-center"
              defaultValue={1}
              min={1}
            />
            <button className="ml-3 py-1 px-2 text-xs md:text-sm lg:text-base bg-green-700 text-white rounded-md">
              Add to Cart
            </button>
          </div>
          <p className="sm:mb-2 lg:mb-4 mt-5 text-sm md:text-base">
            Free worldwide shipping on all orders over Rs 500!
          </p>
          <p className="mb-2 text-sm md:text-base">
            Delivers In: 3-7 Working Days
          </p>

          <ul className="list-none mt-3 lg:mt-5 lg:space-y-3">
            <li>
              <span className="lg:font-medium font-semibold">Tag:</span> Indoor
            </li>
            <li>
              <span className="lg:font-medium font-semibold">Category:</span>{" "}
              Indoor Plants
            </li>
            <li>
              <span className="lg:font-medium font-semibold">Color:</span>{" "}
              Green, White, Red
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-[2rem] lg:mt-[4rem] md:mx-[2rem] lg:mx-[9rem]">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700 mb-3 md:mb-4 lg:mb-5">
          Description
        </h2>
        <p className="text-xs md:text-base lg:text-lg leading-relaxed text-gray-600">
          Houseplants are versatile and low-maintenance greenery that can
          transform any indoor space into a lush oasis. They improve air
          quality, reduce stress, and add aesthetic appeal to homes and offices.
          With a wide variety of options available, from trailing vines to
          upright ferns, houseplants cater to different preferences and skill
          levels. They thrive in varying light conditions, from bright indirect
          sunlight to low-light environments. By adding houseplants, you can
          bring a touch of nature indoors, creating a calming and inviting
          atmosphere that promotes well-being and enhances your decor.
        </p>

        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700 mt-4 md:mt-7 lg:mt-10 mb-3 md:mb-4 lg:mb-5">
          Care Tips for Houseplant
        </h2>

        <ul className="list-none mt-3 md:mt-5 space-y-2 md:space-y-3 lg:space-y-4">
          <li className="flex items-center text-xs md:text-base lg:text-lg">
            <i className="bi bi-check-circle-fill text-green-700 mr-3"></i>
            Place in indirect sunlight or low light, depending on type.
          </li>
          <li className="flex items-center text-xs md:text-base lg:text-lg">
            <i className="bi bi-check-circle-fill text-green-700 mr-3"></i>
            Water when the topsoil feels dry to touch.
          </li>
          <li className="flex items-center text-xs md:text-base lg:text-lg">
            <i className="bi bi-check-circle-fill text-green-700 mr-3"></i>
            Dust leaves regularly to ensure proper photosynthesis.
          </li>
          <li className="flex items-center text-xs md:text-base lg:text-lg">
            <i className="bi bi-check-circle-fill text-green-700 mr-3"></i>
            Fertilize every month during the growing season.
          </li>
        </ul>
      </div>
    </div>
  );
}
