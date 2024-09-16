function FollowOnInstagram() {
  return (
    <div className="d-flex flex-column align-items-center ">
      <div className="h1 mt-5 text-success text-center">
        Follow us on Instagram
      </div>
      <div
        className="container mt-2 mb-5 "
        style={{ padding: "0 9rem 0 9rem" }}
      >
        <div className="row">
          <div className="col-8 container p-8">
            <div className="row ">
              <div className="col-5 text-center mt-3">
                <img
                  src="/public/Shop By Category/image-1.png"
                  alt=""
                  className="w-100 h-100 img-fluid rounded"
                />
              </div>
              <div className="col-7 text-center mt-3">
                <img
                  src="/public/Shop By Category/image-2.png"
                  alt=""
                  className="w-100  h-100 img-fluid rounded"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-7 text-center mt-3">
                <img
                  src="/public/Shop By Category/image-3.png"
                  alt=""
                  className="w-100  h-100 img-fluid rounded"
                />
              </div>
              <div className="col-5 text-center mt-3">
                <img
                  src="/public/Shop By Category/image-4.png"
                  alt=""
                  className="w-100 h-100 img-fluid rounded"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center mt-3">
                <img
                  src="/public/Shop By Category/image-5.png"
                  alt=""
                  className="w-100 h-100 img-fluid rounded"
                />
              </div>
            </div>
          </div>
          <div className="col-4 text-center mt-2 ">
            <img
              src="/public/Shop By Category/long-image.png"
              alt=""
              className="h-100 w-100 img-fluid rounded "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowOnInstagram;
