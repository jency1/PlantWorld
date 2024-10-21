import styles from "./ProductPage.module.css"; // Import the CSS module

const ProductDescription = () => {
  return (
    <div className={`container-fluid ${styles.container} py-5`}>
      {" "}
      {/* Added custom padding class */}
      <div className="row justify-content-center">
        {/* Product Image */}
        <div className="col-md-6 col-lg-5 text-center">
          <img
            src="../public/Shop By Category/image-1.jpg" // Update this with actual image path
            alt="Houseplant Philippine"
            className={`${styles.productImage} img-fluid h-75 w-100`}
          />
          <div className={`${styles.thumbnailWrapper}`}>
            <img
              src="../public/Shop By Category/image-1.jpg"
              alt="thumbnail"
              className={`${styles.thumbnail} img-fluid w-25 h-25`}
            />
            <img
              src="../public/Shop By Category/image-1.jpg"
              alt="thumbnail"
              className={`${styles.thumbnail} img-fluid w-25 h-25`}
            />
            <img
              src="../public/Shop By Category/image-1.jpg"
              alt="thumbnail"
              className={`${styles.thumbnail} img-fluid w-25 h-25`}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6 col-lg-5">
          <h1 className={`${styles.productTitle} mt-3`}>
            Houseplant Philippine
          </h1>
          <p className={styles.productDescription}>
            Each of our products is hand-selected for its unique aesthetic
            appeal, resilience, and ability to enhance your home or office
            environment.
          </p>
          <h2 className={styles.productPrice}>Rs 800</h2>
          <div className="d-flex flex align-items-center mb-3">
            <input
              type="number"
              className={`${styles.quantityInput} form-control `}
              defaultValue={1}
              min={1}
            />
            <button
              className="py-1 btn btn-success btn-block"
              style={{
                backgroundColor: "#4d933e",
                color: "white",
                marginLeft: "6px",
              }}
            >
              Add to Cart
            </button>
          </div>
          <p>Free worldwide shipping on all orders over Rs 500</p>
          <p>Delivers In: 3-7 Working Days</p>

          <ul className={styles.productDetails}>
            {/* <li>
              <span>SKU:</span> D75482
            </li> */}
            <li>
              <span className={`${styles.info}`}>Tag:</span> Indoor
            </li>
            <li>
              <span className={`${styles.info}`}>Category:</span> Indoor Plants
            </li>
            <li>
              <span className={`${styles.info}`}>Color:</span> Black, White,
              Yellow, Orange
            </li>
            {/* <li>
              <strong>Size:</strong> L, M, S, XL
            </li> */}
          </ul>
        </div>
      </div>
      <br />
      <br />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            {/* Description Header */}
            <h2 className={`${styles.sectionTitle} mb-4 mt-4`}>Description</h2>

            {/* Description Paragraph */}
            <p className={`${styles.descriptionText} mb-4`}>
              We offer a diverse range of botanical wonders carefully to bring
              natural and vitality into your living spaces. Each of our products
              is hand-selected for its unique aesthetic appeal, resilience, and
              ability to enhance your home or office environment. From striking
              foliage to delicate blooms, our collection encompasses a wide
              variety of greenery options to suit every taste and style. Whether
              you're looking to create a lush indoor jungle, add a touch of
              green to a sunny corner, or infuse a dash of green into a
              minimalist setting, our diverse range of treasures awaits your
              exploration. Immerse yourself in the transformative power of
              nature and embark on a journey of enchantment with exquisite
              products.
            </p>

            {/* List of Topics */}
            <ul className="list-unstyled">
              <li className={`${styles.topicItem} mb-2`}>
                <i
                  className="bi bi-check-circle-fill "
                  style={{ color: "#4d933e" }}
                ></i>{" "}
                {/* Bootstrap icon */}
                Unraveling the Mysteries of Mycorrhizal Fungi: How Symbiotic
                Relationships Shape Plant Health and Ecosystem Dynamics
              </li>
              <li className={`${styles.topicItem} mb-2`}>
                <i
                  className="bi bi-check-circle-fill "
                  style={{ color: "#4d933e" }}
                ></i>
                The art of bonsai: mastering the ancient Japanese practice of
                cultivating miniature trees
              </li>
              <li className={`${styles.topicItem} mb-2`}>
                <i
                  className="bi bi-check-circle-fill "
                  style={{ color: "#4d933e" }}
                ></i>
                Harnessing the power of plant-based remedies: exploring herbal
                medicine and traditional healing practices
              </li>
              <li className={`${styles.topicItem} mb-2`}>
                <i
                  className="bi bi-check-circle-fill "
                  style={{ color: "#4d933e" }}
                ></i>
                Bridging the gap: integrating biophilic design principles into
                modern architecture and interior spaces
              </li>
            </ul>

            {/* Second Description Header */}
            <h2 className={`${styles.sectionTitle} mb-4 mt-5`}>Description</h2>

            {/* Second Description Paragraph */}
            <p className={`${styles.descriptionText}`}>
              Explore our curated selection of botanical wonders, each carefully
              chosen to enhance your living space and bring the beauty of nature
              indoors. Our products are sourced from trusted growers and
              nurseries, ensuring the quality and health of every plant for our
              customers. From vibrant to delicate blooms, each plant is
              accompanied by detailed care instructions to help you nurture and
              maintain its natural beauty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;

// ../public/Shop By Category/image-1.jpg
