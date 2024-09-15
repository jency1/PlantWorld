import styles from "./Header.module.css";

function Header() {
  return (
    <>
      <div className={`container-fluid pb-4 ${styles["containerr"]}`}>
        <div className="mb-2">
          <div
            className={`d-flex flex-column flex-md-row justify-content-evenly align-items-center ${styles["heading"]}`}
          >
            <img
              src="/public/Home Page/header image.jpg"
              alt="Plant"
              className={`${styles["image1"]}`}
            />
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="h1">Trees Plants to Grow in</div>
              <div className="h1">Your Living Room</div>
              <button
                className={`py-1 mt-4 mb-2 btn btn-success btn-block ${styles["btn"]}`}
              >
                Shop Now
              </button>
            </div>
            <img
              src="/public/Home Page/header leaf.jpg"
              alt="Plant"
              className={`${styles["image2"]} img-fluid d-none d-md-block`}
            />
          </div>
        </div>
        <div className={`container ${styles["bottom"]}`}>
          <div
            className={`d-flex flex-column flex-md-row justify-content-evenly align-items-center`}
          >
            <div
              className={`d-flex flex-column p-3 p-md-4 w-sm-50 rounded-4 ${styles["text-box"]}`}
            >
              <p className={`fs-6 fs-md-5 fs-lg-4 lh-sm lh-md-1.5`}>
                Tree-planting is the process of transplanting tree seedlings,
                generally for forestry, land reclamation. It deffers from the
                transplantation of larger trees in arboriculture.
              </p>
              <div className="mt-3 text-success pointer-cursor">Learn More</div>
              <div className="d-flex flex-column flex-md-row gap-5 mt-5">
                <div className="text-center text-md-start">
                  <h5>
                    <b>200+</b>
                  </h5>
                  <p className="mb-0">Plant Species</p>
                </div>
                <div className="text-center text-md-start">
                  <h5>
                    <b>1.2K+</b>
                  </h5>
                  <p className="mb-0">Members Joined</p>
                </div>
              </div>
            </div>
            <div className="mt-4 ">
              <img
                src="/public/Home Page/header image 3.jpg"
                alt="Plant"
                className="rounded-4 img-fluid mx-auto d-block"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
