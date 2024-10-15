import React from 'react';
import styles from './LoginPage.module.css'; // Importing CSS module

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.left}>
          <h1>Welcome to PlantWorld</h1>
          <p>One stop for all the variety of plants</p>
          <div className={styles.plantImage}>
            <img
              src="https://www.thespruce.com/thmb/kZaATDHMKsRqLOK8WXVb1uXSueA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1306072284-59622f95871f42a895ad583d471d407a.jpg" // Replace with the actual plant image URL
              alt="Plant"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.logo}>
            <img
              src="https://img.favpng.com/17/3/25/green-logo-leaf-world-earth-png-favpng-eiAyJTAZY7GivLj4theV84zcw.jpg" // Replace with the actual logo image URL
              alt="PlantWorld Logo"
              className={styles.logoImage}
            />
            <h1>PlantWorld</h1>
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

            <button type="submit" className={styles.loginButton}>Login</button>
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