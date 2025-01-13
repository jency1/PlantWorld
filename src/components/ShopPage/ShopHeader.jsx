function ShopHeader() {
  return (
    <div className="relative w-full h-[15rem] sm:h-[20rem] md:h-[29rem] bg-[#d4f8d8a8]">
      {/* Single Image with object-cover and object-center */}
      <div className="w-full h-full flex justify-center items-center">
        <img
          src="/Shop Page/image6.png"
          alt="Plant Image"
          className="w-full h-full object-fit object-center"
        />
      </div>

      {/* Quote Positioned in the Center */}
      <div className="absolute inset-5 md:inset-10 flex items-start justify-center text-center">
        <span className="bg-white text-black bg-opacity-50 p-2 rounded-md text-xs md:text-base lg:text-lg font-bold font-serif leading-tight sm:leading-snug">
          "Every plant you nurture is a step closer to a greener tomorrow.
          <br />
          Start your journey today."
        </span>
      </div>
    </div>
  );
}

export default ShopHeader;

// -----------------------------------

// function ShopHeader() {
//   return (
//     <div className="relative w-full h-[11rem] md:h-[25rem] bg-[#d4f8d8a8]">
//       <div className="flex w-full h-full justify-between">
//         <img
//           src="/Shop Page/image6.png"
//           alt="Plant Image"
//           className="w-1/3 h-full object-cover"
//         />
//         <img
//           src="/Shop Page/image5.png"
//           alt="Plant Image"
//           className="hidden md:block w-1/2 md:w-1/3 h-full object-cover"
//         />
//       </div>
//       <div className="absolute inset-0 flex items-center justify-center text-center text-xs md:text-3xl font-bold font-serif w-[40%] h-[20%] md:w-[20%] md:h-[22%] my-auto md:mx-auto">
//         <span className="bg-white text-green-700 bg-opacity-50 p-2 md:p-4 rounded-md leading-[1.2rem] lg:leading-[2.7rem]">
//           "Every plant you nurture is a step closer to a greener tomorrow.{" "}
//           <br />
//           Start your journey today."
//         </span>
//       </div>
//     </div>
//   );
// }

// export default ShopHeader;

// ---------------------------------------------------

// import styles from "./ShopHeader.module.css";

// function ShopHeader() {
//   return (
//     <>
//       <div
//         className={`container-fluid d-flex flex-column flex-md-row justify-content-around pb-4 ${styles["containerr"]}`}
//       >
//         <img
//           src="/Home Page/header.webp"
//           alt="Plant"
//           className={`${styles["image1"]} img-fluid`}
//         />
//         <div className="d-flex flex-column justify-content-center align-items-center">
//           <div className="h1 text-center">
//             <strong>Shop</strong>
//           </div>
//         </div>
//         <img
//           src="/Home Page/header image.jpg"
//           alt="Plant"
//           className={`${styles["image1"]} img-fluid`}
//         />
//       </div>
//     </>
//   );
// }

// export default ShopHeader;
