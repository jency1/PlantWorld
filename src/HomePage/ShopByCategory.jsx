import "../index.css";

import { FaLongArrowAltRight } from "react-icons/fa";

function ShopByCategory() {
  return (
    <div className="d-flex flex-column align-items-center ">
      <div className="h1 mt-3 text-success">Shop by Category</div>
      <div className="p-2 mt-2 w-50 mx-auto text-center">
        Discover our top trees, chosen for their beauty and resilience. Add
        color, fruit, or greenaery to your garden with these customer favorites.
        Bring {`nature's`} charm home today.
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6 col-md-3 text-center mt-5">
            <img
              src="/public/Shop By Category/outdoor.png"
              alt=""
              className="img-fluid rounded"
            />
            <div className="h5 mt-3">Outdoor</div>
          </div>
          <div className="col-6 col-md-3 text-center mt-5">
            <img
              src="/public/Shop By Category/indoor.png"
              alt=""
              className="img-fluid rounded"
            />
            <div className="h5 mt-3">Indoor</div>
          </div>
          <div className="col-6 col-md-3 text-center mt-5">
            <img
              src="/public/Shop By Category/terracebalcony.png"
              alt=""
              className="img-fluid rounded"
            />
            <div className="h5 mt-3">Terrace & Balcony</div>
          </div>
          <div className="col-6 col-md-3 text-center mt-5">
            <img
              src="/public/Shop By Category/officedesk.png"
              alt=""
              className="img-fluid rounded"
            />
            <div className="h5 mt-3">Office Desk</div>
          </div>
        </div>
      </div>

      <button className="d-flex align-items-center w-30 mt-4 mb-2 btn btn-success btn-block">
        <span> View All</span>
        <span className="ms-2 mb-1">
          <FaLongArrowAltRight />
        </span>
      </button>
    </div>
  );
}

export default ShopByCategory;
