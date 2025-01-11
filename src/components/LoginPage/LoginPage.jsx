import React from "react";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.left}>
          <h2>Welcome to PlantWorld</h2>
          <p>One stop for all the variety of plants</p>
          <div className={styles.plantImage}>
            <img
              src="/Shop By Category/image-3.jpg"
              alt="Plant"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.logo}>
            {/* <img
              src="https://cdn.vectorstock.com/i/1000v/54/44/planet-earth-with-plant-logo-design-vector-29145444.jpg"
              alt="PlantWorld Logo"
              className={styles.logoImage}
            /> */}
            <h2 style={{ color: "#5c865a" }}>PlantWorld</h2>
          </div>
          <h3>Login in to your PlantWorld Account</h3>

          <form className={styles.form}>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              placeholder="username"
              className={styles.input}
            />

            {/* <label htmlFor="contact">Contact Number</label>
            <input
              type="tel"
              id="contact"
              placeholder="(123) 456-7890"
              className={styles.input}
            /> */}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="****"
              className={styles.input}
            />

            <div className={styles.forgotPassword}>
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>

          <div className={styles.signup}>
            Don't have an account? <a href="#">Signup</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
