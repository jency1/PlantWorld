function SimilarProducts() {
  return (
    <div className="container mb-5">
      <div className="h1 text-center" style={{ color: "#4d933e" }}>
        Similar Products
      </div>
      <div className="row">
        <div className="col-6 col-md-3 text-center mt-5">
          <img
            src="/public/Featured Products/image1.jpg"
            alt=""
            className="img-fluid custom-img"
          />
          <div className="h3 mt-1">Plant</div>
          <div>Rs.500</div>
        </div>

        <div className="col-6 col-md-3 text-center mt-5">
          <img
            src="/public/Featured Products/image2.jpg"
            alt=""
            className="img-fluid custom-img"
          />
          <div className="h3 mt-1">Plant</div>
          <div>Rs.500</div>
        </div>

        <div className="col-6 col-md-3 text-center mt-5">
          <img
            src="/public/Featured Products/image3.jpg"
            alt=""
            className="img-fluid custom-img"
          />
          <div className="h3 mt-1">Plant</div>
          <div>Rs.500</div>
        </div>

        <div className="col-6 col-md-3 text-center mt-5">
          <img
            src="/public/Featured Products/image4.jpg"
            alt=""
            className="img-fluid custom-img"
          />
          <div className="h3 mt-1">Plant</div>
          <div>Rs.500</div>
        </div>
      </div>
    </div>
  );
}

export default SimilarProducts;
