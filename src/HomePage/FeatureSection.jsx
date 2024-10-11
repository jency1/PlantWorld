import React from "react";
import { FaShippingFast, FaLock, FaHeadset, FaUndoAlt } from "react-icons/fa";
import styles from "./FeatureSection.module.css";

const FeatureSection = () => {
  return (
    <div className={`${styles.featureSection} py-4`}>
      <div
        className="container pt-4 pr-4 pl-4"
        style={{ backgroundColor: "#f5f7fa", borderRadius: "10px" }}
      >
        <div className="row justify-content-center text-center">
          <div className="col-6 col-md-3 mb-4">
            <div className={styles.featureItem}>
              <FaShippingFast className={`${styles.icon} mb-3`} />
              <h5 className={styles.featureTitle}>Free delivery</h5>
              <p className={styles.featureSubtitle}>
                For all orders above Rs 1000
              </p>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <div className={styles.featureItem}>
              <FaLock className={`${styles.icon} mb-3`} />
              <h5 className={styles.featureTitle}>Secure payments</h5>
              <p className={styles.featureSubtitle}>
                Confidence on all your devices
              </p>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <div className={styles.featureItem}>
              <FaHeadset className={`${styles.icon} mb-3`} />
              <h5 className={styles.featureTitle}>Secure payments</h5>
              <p className={styles.featureSubtitle}>
                Confidence on all your devices
              </p>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <div className={styles.featureItem}>
              <FaUndoAlt className={`${styles.icon} mb-3`} />
              <h5 className={styles.featureTitle}>180 Days Return</h5>
              <p className={styles.featureSubtitle}>180 Days Return</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
