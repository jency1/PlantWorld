function SimilarProducts() {
  return (
    <div className="container mb-3 md:mb-4 lg:mb-5">
      <div
        className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-3"
        style={{ color: "#4d933e" }}
      >
        Similar Products
      </div>
      <div className="row mx-8 px-8">
        <div className="col-6 col-md-3 text-center mt-3 md:mt-4 lg:mt-5">
          <img
            src="/frontend/Featured Products/image1.jpg"
            alt=""
            className="img-fluid custom-img"
          />
          <div className="text-base md:text-lg lg:text-2xl font-semibold mt-2">
            Plant
          </div>
          <div className="text-xs md:text-sm lg:text-lg">Rs.500</div>
        </div>

        <div className="col-6 col-md-3 text-center mt-3 md:mt-4 lg:mt-5">
          <img
            src="/frontend//Featured Products/image2.jpg"
            alt=""
            className="img-fluid custom-img"
          />
          <div className="text-base md:text-lg lg:text-2xl font-semibold mt-2">
            Plant
          </div>
          <div className="text-xs md:text-sm lg:text-lg">Rs.500</div>
        </div>

        <div className="col-6 col-md-3 text-center mt-3 md:mt-4 lg:mt-5">
          <img
            src="/frontend//Featured Products/image3.jpg"
            alt=""
            className="img-fluid custom-img"
          />
          <div className="text-base md:text-lg lg:text-2xl font-semibold mt-2">
            Plant
          </div>
          <div className="text-xs md:text-sm lg:text-lg">Rs.500</div>
        </div>

        <div className="col-6 col-md-3 text-center mt-3 md:mt-4 lg:mt-5">
          <img
            src="/frontend//Featured Products/image4.jpg"
            alt=""
            className="img-fluid custom-img"
          />
          <div className="text-base md:text-lg lg:text-2xl font-semibold mt-2">
            Plant
          </div>
          <div className="text-xs md:text-sm lg:text-lg">Rs.500</div>
        </div>
      </div>
    </div>
  );
}

export default SimilarProducts;
