import React from "react";
import { Link } from "react-router-dom";

const BackToHomeButton = () => (
  <Link
    to="/"
    className="absolute top-[10px] text-xs md:text-base left-[10px] md:top-[20px] md:left-[20px] text-[#72a876] font-bold px-[6px] py-[4px] md:px-[8px] md:py-[7px] lg:px-[12px] lg:py-[8px] rounded border border-[#72a876] hover:bg-[#4ead54] hover:text-white transition-colors duration-300"
  >
    Back to Home
  </Link>
);

const Logo = () => (
  <div className="flex items-center justify-center mb-[1rem] lg:mb-[1.5rem]">
    <h2 className="text-[20px] lg:text-[28px] font-bold text-[#72A876]">
      PlantWorld
    </h2>
  </div>
);

const LoginForm = () => (
  <form className="flex flex-col w-full">
    <label htmlFor="username" className="mb-2 text-[0.8rem] lg:text-[1.1rem]">
      User Name:
    </label>
    <input
      type="text"
      id="username"
      placeholder="username"
      className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
    />

    <label htmlFor="password" className="mb-2 text-[0.8rem] lg:text-[1.1rem]">
      Password:
    </label>
    <input
      type="password"
      id="password"
      placeholder="*****"
      className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
    />

    <label
      htmlFor="confirmPassword"
      className="mb-2 text-[0.8rem] lg:text-[1.1rem]"
    >
      Confirm Password:
    </label>
    <input
      type="password"
      id="confirmPassword"
      placeholder="*****"
      className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
    />

    <div className="text-right text-xs md:text-md lg:text-lg mb-[8px] lg:mb-[15px]">
      <a
        href="#"
        className="text-[#72a876] font-semibold hover:text-[#499a4e] no-underline"
      >
        Forgot Password?
      </a>
    </div>

    <button
      type="submit"
      className="w-full bg-[#4ead54] text-white font-bold px-[2px] py-[3px] lg:px-[12px] lg:py-[10px] rounded border-none text-[0.8rem] lg:text-[1.1rem] cursor-pointer transition-colors duration-300 hover:bg-[#499a4e]"
    >
      Login
    </button>

    <div className="text-center text-xs mt-2 md:mt-auto md:text-md lg:text-lg mb-[8px] lg:mb-[15px]">
      Don't have an account?{" "}
      <a
        href="#"
        className="text-[#72a876] font-semibold hover:text-[#499a4e] no-underline"
      >
        Signup
      </a>
    </div>
  </form>
);

const LeftSection = () => (
  <div className="flex-1 flex flex-col justify-center items-center bg-[#72a876] p-[20px] text-white md:rounded-l-[10px]">
    <h2 className="text-center text-[16px] md:text-[22px] lg:text-[32px] font-semibold mb-[10px]">
      Welcome to PlantWorld
    </h2>
    <p className="text-[10px] md:text-[13px] lg:text-[18px] mb-[10px] md:mb-[22px] lg:mb-[30px]">
      One stop for all the variety of plants
    </p>
    <div className="w-full max-w-[400px]">
      <img
        src="/Shop By Category/image-3.jpg"
        alt="Plant"
        className="w-full rounded-[10px]"
      />
    </div>
  </div>
);

const RightSection = () => (
  <div className="flex-1 flex flex-col justify-center bg-[#f4f7f4] p-[20px] lg:p-[40px] md:rounded-r-[10px]">
    <Logo />
    <h3 className="text-[0.7rem] lg:text-[1.3rem] text-center mb-[0.7rem] lg:mb-[1.2rem]">
      Login in to your PlantWorld Account
    </h3>
    <LoginForm />
  </div>
);

const LoginPage = () => {
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#ecffed] p-2 md:p-4">
      <BackToHomeButton />
      <div className="flex w-[90%] md:w-[80%] max-w-[1200px] bg-white/80 rounded-[10px] shadow-lg flex-col sm:flex-row mt-10">
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
};

export default LoginPage;

// ------------------------------------------------

// import React from "react";
// import { Link } from "react-router-dom";

// const BackToHomeButton = () => (
//   <Link
//     to="/"
//     className="absolute top-[20px] left-[20px] text-[#72a876] font-bold px-[12px] py-[8px] rounded border border-[#72a876] hover:bg-[#4ead54] hover:text-white transition-colors duration-300"
//   >
//     Back to Home
//   </Link>
// );

// const Logo = () => (
//   <div className="flex items-center justify-center mb-[1.5rem]">
//     <h2 className="text-[28px] font-bold text-[#72A876]">PlantWorld</h2>
//   </div>
// );

// const LoginForm = () => (
//   <form className="flex flex-col w-full">
//     <label htmlFor="username" className="mb-2 text-[1.1rem]">
//       User Name:
//     </label>
//     <input
//       type="text"
//       id="username"
//       placeholder="username"
//       className="w-full py-[8px] px-[12px] mb-3 rounded border border-gray-300 text-[16px]"
//     />

//     <label htmlFor="password" className="mb-2 text-[1.1rem]">
//       Password:
//     </label>
//     <input
//       type="password"
//       id="password"
//       placeholder="*****"
//       className="w-full py-[8px] px-[12px] mb-3 rounded border border-gray-300 text-[16px]"
//     />

//     <label htmlFor="confirmPassword" className="mb-2 text-[1.1rem]">
//       Confirm Password:
//     </label>
//     <input
//       type="password"
//       id="confirmPassword"
//       placeholder="*****"
//       className="w-full py-[8px] px-[12px] mb-3 rounded border border-gray-300 text-[16px]"
//     />

//     <div className="text-right mb-[15px]">
//       <a
//         href="#"
//         className="text-[#72a876] font-semibold hover:text-[#499a4e] no-underline"
//       >
//         Forgot Password?
//       </a>
//     </div>

//     <button
//       type="submit"
//       className="w-full bg-[#4ead54] text-white font-bold py-[10px] px-[12px] rounded border-none text-[1.1rem] cursor-pointer transition-colors duration-300 hover:bg-[#499a4e]"
//     >
//       Login
//     </button>

//     <div className="text-center mt-[15px]">
//       Don't have an account?{" "}
//       <a
//         href="#"
//         className="text-[#72a876] font-semibold hover:text-[#499a4e] no-underline"
//       >
//         Signup
//       </a>
//     </div>
//   </form>
// );

// const LeftSection = () => (
//   <div className="flex-1 flex flex-col justify-center items-center bg-[#72a876] p-[20px] text-white rounded-l-[10px]">
//     <h2 className="text-[32px] font-semibold mb-[10px]">
//       Welcome to PlantWorld
//     </h2>
//     <p className="text-[18px] mb-[30px]">
//       One stop for all the variety of plants
//     </p>
//     <div className="w-full max-w-[400px]">
//       <img
//         src="/Shop By Category/image-3.jpg"
//         alt="Plant"
//         className="w-full rounded-[10px]"
//       />
//     </div>
//   </div>
// );

// const RightSection = () => (
//   <div className="flex-1 flex flex-col justify-center bg-[#f4f7f4] p-[40px] rounded-r-[10px]">
//     <Logo />
//     <h3 className="text-[1.3rem] text-center mb-[1.2rem]">
//       Login in to your PlantWorld Account
//     </h3>
//     <LoginForm />
//   </div>
// );

// const LoginPage = () => {
//   return (
//     <div className="relative flex justify-center items-center min-h-screen bg-[#ecffed] p-4">
//       <BackToHomeButton />
//       <div className="flex w-[80%] max-w-[1200px] bg-white/80 rounded-[10px] shadow-lg">
//         <LeftSection />
//         <RightSection />
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// ------------------------------------

// import React from "react";

// // Left Section Component
// const LeftSection = () => {
//   return (
//     <div className="flex-1 flex flex-col justify-center items-center bg-[#72a876] p-5 text-white rounded-l-lg">
//       <h2 className="text-4xl font-semibold mb-2">Welcome to PlantWorld</h2>
//       <p className="text-lg mb-8">One stop for all the variety of plants</p>
//       <div className="w-full max-w-[400px]">
//         <img
//           src="/Shop By Category/image-3.jpg"
//           alt="Plant"
//           className="w-full rounded-lg"
//         />
//       </div>
//     </div>
//   );
// };

// // Logo Component
// const Logo = () => {
//   return (
//     <div className="flex items-center justify-center mb-8">
//       <h2 className="text-[#5c865a] text-2xl font-semibold">PlantWorld</h2>
//     </div>
//   );
// };

// // Login Form Component
// const LoginForm = () => {
//   return (
//     <form className="flex flex-col">
//       <label htmlFor="username" className="mb-1">
//         User Name
//       </label>
//       <input
//         type="text"
//         id="username"
//         placeholder="username"
//         className="w-full p-3 mb-5 rounded border border-gray-300 text-base"
//       />

//       <label htmlFor="password" className="mb-1">
//         Password
//       </label>
//       <input
//         type="password"
//         id="password"
//         placeholder="*****"
//         className="w-full p-3 mb-5 rounded border border-gray-300 text-base"
//       />

//       <div className="text-right mb-5">
//         <a href="#" className="text-[#72a876]">
//           Forgot Password?
//         </a>
//       </div>

//       <button
//         type="submit"
//         className="bg-[#72a876] text-white p-3 rounded hover:bg-[#5c865a] transition-colors"
//       >
//         Login
//       </button>
//     </form>
//   );
// };

// // Right Section Component
// const RightSection = () => {
//   return (
//     <div className="flex-1 flex flex-col justify-center bg-[#f4f7f4] p-10 rounded-r-lg">
//       <Logo />
//       <h3 className="text-xl mb-5">Login in to your PlantWorld Account</h3>
//       <LoginForm />
//       <div className="text-center mt-5">
//         Don't have an account?{" "}
//         <a href="#" className="text-[#72a876]">
//           Signup
//         </a>
//       </div>
//     </div>
//   );
// };

// // Main LoginPage Component
// const LoginPage = () => {
//   return (
//     <div className="relative flex justify-center items-center h-screen bg-[#ecffed]">
//       <div
//         className="flex bg-white/80 rounded-lg shadow-md"
//         style={{
//           width: "80%",
//           maxWidth: "1200px",
//           borderRadius: "10px",
//         }}
//       >
//         <LeftSection />
//         <RightSection />
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// ----------------------------------------

// import React from "react";
// import styles from "./LoginPage.module.css";

// const LoginPage = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.overlay}>
//         <div className={styles.left}>
//           <h2>Welcome to PlantWorld</h2>
//           <p>One stop for all the variety of plants</p>
//           <div className={styles.plantImage}>
//             <img
//               src="/Shop By Category/image-3.jpg"
//               alt="Plant"
//               className={styles.image}
//             />
//           </div>
//         </div>

//         <div className={styles.right}>
//           <div className={styles.logo}>
//             {/* <img
//               src="https://cdn.vectorstock.com/i/1000v/54/44/planet-earth-with-plant-logo-design-vector-29145444.jpg"
//               alt="PlantWorld Logo"
//               className={styles.logoImage}
//             /> */}
//             <h2 style={{ color: "#5c865a" }}>PlantWorld</h2>
//           </div>
//           <h3>Login in to your PlantWorld Account</h3>

//           <form className={styles.form}>
//             <label htmlFor="username">User Name</label>
//             <input
//               type="text"
//               id="username"
//               placeholder="username"
//               className={styles.input}
//             />

//             {/* <label htmlFor="contact">Contact Number</label>
//             <input
//               type="tel"
//               id="contact"
//               placeholder="(123) 456-7890"
//               className={styles.input}
//             /> */}

//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="*****"
//               className={styles.input}
//             />

//             <div className={styles.forgotPassword}>
//               <a href="#">Forgot Password?</a>
//             </div>

//             <button type="submit" className={styles.loginButton}>
//               Login
//             </button>
//           </form>

//           <div className={styles.signup}>
//             Don't have an account? <a href="#">Signup</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
