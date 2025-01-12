export default function Header() {
  return (
    <>
      <div className="relative w-full h-[30rem] lg:h-[39rem] bg-[#bdf6c5a8]">
        <img
          src="/Home Page/landingImage.webp"
          alt="Plant"
          className="absolute mx-auto inset-0 object-cover shadow-lg w-auto hidden md:block md:mt-[9.74rem] md:rounded-tl-[15%] md:rounded-tr-[15%] md:h-[25%] lg:mt-[9.74rem] lg:rounded-tl-[45%] lg:rounded-tr-[45%] lg:h-[75%] "
        />
      </div>

      <div className="absolute inset-0 flex justify-between px-6">
        {/* Left side - Quote */}
        <div className="max-w-[45%]">
          <div className="ml-[1px] mt-[6rem] lg:ml-[2.5rem] lg:mt-[8rem]">
            <div className="text-green-700 text-sm md:text-3xl font-serif italic md:mb-6">
              " Plants are not just decoration,
            </div>

            <div className="text-green-700 text-sm md:text-3xl font-serif italic md:mb-6">
              they are life-givers,
            </div>

            <div className="text-green-700 text-sm md:text-3xl font-serif italic">
              healers, and friends! "
            </div>
          </div>

          <button className="btn btn-success text-xs mt-4 p-2 lg:text-lg lg:ml-10 lg:mt-5">
            Shop Now
          </button>

          <div className="container">
            <div className="flex flex-col md:flex-row items-center lg:ml-[-8.5rem] lg:mt-[3rem]">
              <div className="flex flex-col p-3 mt-4 ml-[9.5rem] w-[17rem] lg:w-[60%] bg-stone-100 rounded-4">
                <p className="text-xs md:text-base lh-sm lh-md-1.5">
                  Plants are nature’s masterpieces, bringing beauty, serenity,
                  and fresh air into our homes. They do more than just decorate
                  — they heal, calm, and inspire. With every leaf and blossom,
                  plants remind us of the resilience and growth found in nature,
                  offering a peaceful escape and a deeper connection to the
                  earth.
                </p>
                <div className="flex flex-row gap-5 mt-4 lg:mt-5">
                  <div className="text-center text-xs md:text-base md:text-start">
                    <h5>
                      <b>200+</b>
                    </h5>
                    <p className="mb-0">Plant Species</p>
                  </div>
                  <div className="text-center text-xs md:text-base md:text-start">
                    <h5>
                      <b>1.2K+</b>
                    </h5>
                    <p className="mb-0">Members Joined</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Text */}
        <div className="text-white text-xl md:text-2xl font-serif text-center max-w-[45%]">
          <img
            src="/Home Page/header 2.jpg"
            alt="Plant"
            className="absolute inset-0 object-cover ml-[8.2rem] mt-[4.3rem] w-[55%] h-[50%] rounded-tl-[40%] rounded-tr-[40%] lg:mt-[6.33rem] lg:w-[30%] lg:h-[85%] lg:ml-[66%] lg:rounded-tl-[45%] lg:rounded-tr-[45%] shadow-lg"
          />
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------

// export default function Header() {
//   return (
//     <>
//       <div className="relative w-full h-screen bg-[#d8f3dca8]">
//         <img
//           src="/Home Page/header.webp"
//           alt="Plant"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-white">
//           <div className="text-xl md:text-3xl font-serif text-start italic text-black">
//             " Plants are not just decoration,
//           </div>
//           <div className="text-xl md:text-3xl font-serif text-center mt-2 italic text-black">
//             they are life-givers, healers, and friends! "
//           </div>
//           <button className="py-2 px-6 mt-4 mb-2 bg-success text-white rounded-lg">
//             Shop Now
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// ----------------------------------------------------

// Tailwind merged code -->

// export default function Header() {
//   return (
//     <>
//       <div className="container-fluid pb-4 bg-[#d8f3dca8]">
//         <div className="mb-2">
//           <div className="flex flex-col md:flex-row justify-evenly items-center">
//             <img
//               src="/Home Page/header image.jpg"
//               alt="Plant"
//               className="w-[15rem] z-[-1]"
//             />
//             <div className="flex flex-col justify-center items-center">
//               <div className="text-3xl md:text-4xl font-serif text-center">
//                 Plants are not just decoration,
//               </div>
//               <div className="text-3xl md:text-4xl font-serif text-center mt-2">
//                 they are life-givers, healers, and friends.
//               </div>
//               <button className="py-1 mt-4 mb-2 btn btn-success btn-block">
//                 Shop Now
//               </button>
//             </div>
//             <img
//               src="/Home Page/header leaf.jpg"
//               alt="Plant"
//               className="hidden md:block w-[15rem] z-[-1] mt-[-4.3rem]"
//             />
//           </div>
//         </div>
//         <div className="container">
//           <div className="flex flex-col md:flex-row justify-evenly items-center">
//             <div className="flex flex-col p-3 md:p-4 w-[90%] md:w-[35%] bg-stone-100 rounded-4">
//               <p className="fs-6 fs-md-5 fs-lg-4 lh-sm lh-md-1.5">
//                 Tree-planting is the process of transplanting tree seedlings,
//                 generally for forestry, land reclamation. It differs from the
//                 transplantation of larger trees in arboriculture.
//               </p>
//               <div className="mt-1 text-success cursor-pointer">Learn More</div>
//               <div className="flex flex-col md:flex-row gap-5 mt-5">
//                 <div className="text-center md:text-start">
//                   <h5>
//                     <b>200+</b>
//                   </h5>
//                   <p className="mb-0">Plant Species</p>
//                 </div>
//                 <div className="text-center md:text-start">
//                   <h5>
//                     <b>1.2K+</b>
//                   </h5>
//                   <p className="mb-0">Members Joined</p>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-4">
//               <img
//                 src="/Home Page/header image 3.jpg"
//                 alt="Plant"
//                 className="rounded-4 w-[80%] mx-auto block"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// ----------------------------------------------

// Old Code --->

// import styles from "./Header.module.css";

// function Header() {
//   return (
//     <>
//       <div className={`container-fluid pb-4 ${styles["containerr"]}`}>
//         <div className="mb-2">
//           <div
//             className={`d-flex flex-column flex-md-row justify-content-evenly align-items-center ${styles["heading"]}`}
//           >
//             <img
//               src="/Home Page/header image.jpg"
//               alt="Plant"
//               className={`${styles["image1"]}`}
//             />
//             <div className="d-flex flex-column justify-content-center align-items-center">
//               <div className="h2 text-center">
//                 Plants are not just decoration,
//               </div>
//               <div className="h2 text-center">
//                 they are life-givers, healers, and friends.
//               </div>
//               <button
//                 className={`py-1 mt-4 mb-2 btn btn-success btn-block ${styles["btn"]}`}
//               >
//                 Shop Now
//               </button>
//             </div>
//             <img
//               src="/Home Page/header leaf.jpg"
//               alt="Plant"
//               className={`${styles["image2"]} img-fluid d-none d-md-block`}
//             />
//           </div>
//         </div>
//         <div className={`container ${styles["bottom"]}`}>
//           <div
//             className={`d-flex flex-column flex-md-row justify-content-evenly align-items-center`}
//           >
//             <div
//               className={`d-flex flex-column p-3 p-md-4 w-sm-50 rounded-4 ${styles["text-box"]}`}
//             >
//               <p className={`fs-6 fs-md-5 fs-lg-4 lh-sm lh-md-1.5`}>
//                 Tree-planting is the process of transplanting tree seedlings,
//                 generally for forestry, land reclamation. It deffers from the
//                 transplantation of larger trees in arboriculture.
//               </p>
//               <div className="mt-1 text-success pointer-cursor">Learn More</div>
//               <div className="d-flex flex-column flex-md-row gap-5 mt-5">
//                 <div className="text-center text-md-start">
//                   <h5>
//                     <b>200+</b>
//                   </h5>
//                   <p className="mb-0">Plant Species</p>
//                 </div>
//                 <div className="text-center text-md-start">
//                   <h5>
//                     <b>1.2K+</b>
//                   </h5>
//                   <p className="mb-0">Members Joined</p>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-4 ">
//               <img
//                 src="/Home Page/header image 3.jpg"
//                 alt="Plant"
//                 className="rounded-4 img-fluid mx-auto d-block"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Header;
