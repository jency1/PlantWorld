function ShopHeader() {
  return (
    <div className="relative w-full">
      {/* Single Image with object-cover and object-center */}
      <div className="w-full h-[16rem] sm:h-[25rem] md:h-[24rem] lg:h-[36rem] flex justify-center items-center">
        <img
          src="/frontend/Shop Page/image8.png"
          alt="Plant Image"
          className="w-full h-full object-object-cover object-center"
        />
      </div>

      {/* Quote Positioned in the Center */}
      <div className="absolute inset-5 md:inset-10 flex items-start justify-center text-center">
        <span className="bg-white text-black bg-opacity-50 p-2 rounded-md text-xs md:text-base lg:text-lg font-bold font-serif leading-tight sm:leading-snug">
          "Every plant you nurture is a step closer to a greener tomorrow.
          <br />
          Start your journey today."
        </span>
      </div>
    </div>
  );
}

export default ShopHeader;
