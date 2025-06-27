import React from "react";
import { FaShippingFast, FaLock, FaHeadset, FaUndoAlt } from "react-icons/fa";

// FeatureItem Component
const FeatureItem = ({ icon, title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="text-[#4d933e] text-4xl sm:text-5xl mb-2 sm:mb-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
        {icon}
      </div>
      <h5 className="text-xs md:text-base lg:text-xl font-bold text-[#333]">
        {title}
      </h5>
      <p className="text-xs md:text-sm text-[#666]">{subtitle}</p>
    </div>
  );
};

// FeatureSection Component
const FeatureSection = () => {
  return (
    <div className="py-8 mx-5 md:mt-4 md:mb-16">
      <div className="container px-4 py-3 bg-[#f5f7fa] rounded-lg shadow-lg">
        <div className="grid grid-cols-2 sm:grid-cols-4 text-center">
          <FeatureItem
            icon={<FaShippingFast />}
            title="Free delivery"
            subtitle="For all orders above Rs 1000"
          />
          <FeatureItem
            icon={<FaLock />}
            title="Secure payments"
            subtitle="Confidence on all your devices"
          />
          <FeatureItem
            icon={<FaHeadset />}
            title="Customer support"
            subtitle="Available 24/7"
          />
          <FeatureItem
            icon={<FaUndoAlt />}
            title="7 Days Return"
            subtitle="Hassle-free returns"
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;

// import React from "react";
// import { FaShippingFast, FaLock, FaHeadset, FaUndoAlt } from "react-icons/fa";
// import styles from "./FeatureSection.module.css";

// const FeatureSection = () => {
//   return (
//     <div className={`${styles.featureSection} py-4`}>
//       <div
//         className="container pt-4 pr-4 pl-4"
//         style={{ backgroundColor: "#f5f7fa", borderRadius: "10px" }}
//       >
//         <div className="row justify-content-center text-center">
//           <div className="col-6 col-md-3 mb-4">
//             <div className={styles.featureItem}>
//               <FaShippingFast className={`${styles.icon} mb-3`} />
//               <h5 className={styles.featureTitle}>Free delivery</h5>
//               <p className={styles.featureSubtitle}>
//                 For all orders above Rs 500
//               </p>
//             </div>
//           </div>
//           <div className="col-6 col-md-3 mb-4">
//             <div className={styles.featureItem}>
//               <FaLock className={`${styles.icon} mb-3`} />
//               <h5 className={styles.featureTitle}>Secure payments</h5>
//               <p className={styles.featureSubtitle}>
//                 Confidence on all your devices
//               </p>
//             </div>
//           </div>
//           <div className="col-6 col-md-3 mb-4">
//             <div className={styles.featureItem}>
//               <FaHeadset className={`${styles.icon} mb-3`} />
//               <h5 className={styles.featureTitle}>Secure payments</h5>
//               <p className={styles.featureSubtitle}>
//                 Confidence on all your devices
//               </p>
//             </div>
//           </div>
//           <div className="col-6 col-md-3 mb-4">
//             <div className={styles.featureItem}>
//               <FaUndoAlt className={`${styles.icon} mb-3`} />
//               <h5 className={styles.featureTitle}>7 Days Return</h5>
//               <p className={styles.featureSubtitle}>7 Days Return</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeatureSection;
