import styles from "./ShopHeader.module.css";

function ShopHeader() {
  return (
    <>
      <div
        className={`container-fluid d-flex flex-column flex-md-row justify-content-around pb-4 ${styles["containerr"]}`}
      >
        <img
          src="/Home Page/header image.jpg"
          alt="Plant"
          className={`${styles["image1"]} img-fluid`}
        />
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="h1 text-center">
            <strong>Shop</strong>
          </div>
        </div>
        <img
          src="/Home Page/header image.jpg"
          alt="Plant"
          className={`${styles["image1"]} img-fluid`}
        />
      </div>
    </>
  );
}

export default ShopHeader;
