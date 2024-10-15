import React from "react";
import styles from "./Blog.module.css";
import Footer from "../Footer/Footer.jsx";
import "../Footer/Footer.module.css";

function Blog() {
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <div className="h1 mt-5 text-success text-center">
          <b>From our Blog</b>
        </div>
      </header>

      <div className={`${styles.blogContainer} container`}>
        <div className="row">
          <div className="container col-12 col-lg-4">
            <BlogCard
              imageUrl="https://hips.hearstapps.com/hmg-prod/images/a-set-of-colorful-potted-plants-on-a-patterned-area-royalty-free-image-1716493110.jpg?crop=0.668xw:1.00xh;0.210xw,0&resize=1200:*"
              title="Plant Care Tips & Guides"
              description="Welcome to our Plant Care section, where we share expert advice and practical tips to help you keep your trees and plants healthy and thriving..."
            />
          </div>
          <div className="container col-12 col-lg-4">
            <BlogCard
              imageUrl="https://merchantandgreen.com.au/product_images/uploaded_images/autumn-plant-care-07.png"
              title="Plant Care Tips & Guides"
              description="Welcome to our Plant Care section, where we share expert advice and practical tips to help you keep your trees and plants healthy and thriving..."
            />
          </div>
          <div className="container col-12 col-lg-4">
            <BlogCard
              imageUrl="https://thelittlecountrystore.com.au/cdn/shop/collections/download_6d6b0382-bf64-4d93-910a-ae93aa530910_300x300.jpg?v=1696991699"
              title="Plant Care Tips & Guides"
              description="Welcome to our Plant Care section, where we share expert advice and practical tips to help you keep your trees and plants healthy and thriving..."
            />
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}

const BlogCard = ({ imageUrl, date, title, description }) => (
  <div className={`${styles.blogCard}`}>
    <div className="row">
      <div className="col-4 col-lg-12">
        <img src={imageUrl} alt={title} />
      </div>
      <div className={`${styles.blogContent} col-8 col-lg-12`}>
        <p>{date}</p>
        <h3>{title}</h3>
        <p>{description}</p>
        <br />
        <button className={`py-1 btn btn-success btn-block`}>Read More</button>
      </div>
    </div>
  </div>
);

export default Blog;
