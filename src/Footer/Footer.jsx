import React from "react";
import styles from "./Footer.module.css"; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Garden Care</h3>
          <p>123 Bang Street, CA 8034, Ahmedabad</p>
          <p>+911776438935</p>
          <p>info@plantworld.com</p>
        </div>

        <div className={styles.footerSection}>
          <h2>PlantWorld</h2>
          <br />
          <p>
            The seed of gardening is a love that never dies, but it never grows
            to the enduring happiness that the love of gardening provides to
            nature.
          </p>
          {/* <div className={styles.socialIcons}>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-x-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
          </div> */}
        </div>

        <div className={styles.footerSection}>
          <div>
            <h3>Pages</h3>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
            </ul>
          </div>

          {/* <div className={styles.footerSection}> */}
          {/* <div>
          <h3>Utility Pages</h3>
          <ul>
            <li><a href="#">Style Guide</a></li>
            <li><a href="#">Not Found</a></li>
            <li><a href="#">Protected</a></li>
            <li><a href="#">Licenses</a></li>
            <li><a href="#">Changelog</a></li>
          </ul>
        </div> */}
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>Copyright © 2024 PlantWorld. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
