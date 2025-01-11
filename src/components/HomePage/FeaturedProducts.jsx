import styles from "./FeaturedProducts.module.css";

function FeaturedProducts() {
  return (
    <>
      <div className={`text-center`}>
        <div className={`h1 mt-5 text-success`}>Featured Products</div>
        <div className={`w-50 mx-auto mt-4 ${styles["text"]}`}>
          Discover our top trees, chosen for their beauty and resilience. Add
          color, fruit or greenery to your garden with these customer
          favourites. Bring nature's charm home today.
        </div>
      </div>

      <div className="container mb-5">
        <div className="row">
          <div className="col-6 col-md-3 text-center mt-5">
            <img
              src="/Featured Products/image1.jpg"
              alt=""
              className="img-fluid custom-img"
            />
            <div className="h3 mt-1">Plant</div>
            <div>Rs.500</div>
          </div>

          <div className="col-6 col-md-3 text-center mt-5">
            <img
              src="/Featured Products/image2.jpg"
              alt=""
              className="img-fluid custom-img"
            />
            <div className="h3 mt-1">Plant</div>
            <div>Rs.500</div>
          </div>

          <div className="col-6 col-md-3 text-center mt-5">
            <img
              src="/Featured Products/image3.jpg"
              alt=""
              className="img-fluid custom-img"
            />
            <div className="h3 mt-1">Plant</div>
            <div>Rs.500</div>
          </div>

          <div className="col-6 col-md-3 text-center mt-5">
            <img
              src="/Featured Products/image4.jpg"
              alt=""
              className="img-fluid custom-img"
            />
            <div className="h3 mt-1">Plant</div>
            <div>Rs.500</div>
          </div>

          <div className="col-6 col-md-3 text-center mt-5">
            <img
              src="/Featured Products/image5.jpg"
              alt=""
              className="img-fluid custom-img"
            />
            <div className="h3 mt-1">Plant</div>
            <div>Rs.500</div>
          </div>

          <div className="col-6 col-md-3 text-center mt-5">
            <img
              src="/Featured Products/image6.jpg"
              alt=""
              className="img-fluid custom-img"
            />
            <div className="h3 mt-1">Plant</div>
            <div>Rs.500</div>
          </div>

          <div className="col-6 col-md-3 text-center mt-5">
            <img
              src="/Featured Products/image7.jpg"
              alt=""
              className="img-fluid custom-img"
            />
            <div className="h3 mt-1">Plant</div>
            <div>Rs.500</div>
          </div>

          <div className="col-6 col-md-3 text-center mt-5">
            <img
              src="/Featured Products/image8.jpg"
              alt=""
              className="img-fluid custom-img"
            />
            <div className="h3 mt-1">Plant</div>
            <div>Rs.500</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedProducts;
