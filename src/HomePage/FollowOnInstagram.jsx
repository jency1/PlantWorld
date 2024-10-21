import styles from "./FollowOnInstagram.module.css";

function FollowOnInstagram() {
  return (
    <div className="d-flex flex-column align-items-center ">
      <div className="h1 mt-5 text-success text-center">
        Follow us on Instagram
      </div>
      <div className={`${styles["main-container"]} container mt-2 mb-5`}>
        <div className="row">
          <div className="col-12 col-md-8 container p-8">
            <div className="row">
              <div className="col-6 text-center mt-3">
                <img
                  src="/Shop By Category/image-1.jpg"
                  alt=""
                  className="w-100 h-100 img-fluid rounded"
                />
              </div>
              <div className="col-6 text-center mt-3">
                <img
                  src="/Shop By Category/image-2.jpg"
                  alt=""
                  className="w-100  h-100 img-fluid rounded"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-8 text-center mt-3">
                <img
                  src="/Shop By Category/image-3.jpg"
                  alt=""
                  className="w-100  h-100 img-fluid rounded"
                />
              </div>
              <div className="col-4 text-center mt-3">
                <img
                  src="/Shop By Category/image-4.jpg"
                  alt=""
                  className="w-100 h-100 img-fluid rounded"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 text-center mt-3">
                <img
                  src="/Shop By Category/image-5.jpg"
                  alt=""
                  className="w-100 h-100 img-fluid rounded"
                />
              </div>
              <div className="col-6 text-center mt-3">
                <img
                  src="/Shop By Category/image-6.jpg"
                  alt=""
                  className="w-100 h-100 img-fluid rounded"
                />
              </div>
            </div>
          </div>
          <div className={`${styles.longImage} col-4 text-center mt-2`}>
            <img
              src="/Shop By Category/long-image.jpg"
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
