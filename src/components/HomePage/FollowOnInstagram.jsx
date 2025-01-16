// // ImageGrid Component
// const ImageGrid = ({ images }) => {
//   return (
//     <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-3">
//       {images.map((image, index) => (
//         <div key={index} className="col-span-1">
//           <img
//             src={image}
//             alt={`plant image ${index + 1}`}
//             className="w-full h-full object-cover rounded transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// // LongImage Component
// const LongImage = ({ image, height }) => {
//   return (
//     <div className="mt-3 text-center" style={{ height }}>
//       <img
//         src={image}
//         alt="plant image"
//         className="w-full h-full object-cover rounded transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
//       />
//     </div>
//   );
// };

// // FollowOnInstagram Component
// const FollowOnInstagram = () => {
//   const images = [
//     "/Shop By Category/image-1.jpg",
//     "/Shop By Category/image-2.jpg",
//     "/Shop By Category/image-3.jpg",
//     "/Shop By Category/image-4.jpg",
//     "/Shop By Category/image-5.jpg",
//     "/Shop By Category/image-6.jpg",
//   ];

//   // Define the height of the long image to match two rows of small images
//   const gridHeight = "480px"; // Adjust to match the height of two rows of images

//   return (
//     <div className="flex flex-col items-center">
//       <h1 className="mt-6 md:mt-16 md:mb-3 lg:mb-5 text-success font-bold text-xl md:text-3xl lg:text-4xl">
//         Follow us on Instagram
//       </h1>
//       <div className="container mt-2 mb-5 px-16 sm:px-8 lg:px-24">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {/* Image Grid Component */}
//           <div className="col-span-2 sm:col-span-1 md:col-span-2">
//             <ImageGrid images={images.slice(0, 6)} />
//           </div>

//           {/* Long Image Component */}
//           <div className="col-span-2 sm:col-span-1 lg:col-span-1 h-full flex justify-center items-center hidden sm:block">
//             <LongImage
//               image="/Shop By Category/long-image.jpg"
//               height={gridHeight}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FollowOnInstagram;

import styles from "./FollowOnInstagram.module.css";

function FollowOnInstagram() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-6 md:mt-16 md:mb-3 lg:mb-5 text-success font-bold text-xl md:text-3xl lg:text-4xl">
        Follow us on Instagram
      </div>
      <div
        className={`${styles["main-container"]} grid h-4/6 w-5/6 grid-cols-12 px-8 mx-8 mt-2 mb-5`}
      >
        <div className="col-span-12 md:col-span-8 grid grid-cols-12">
          <div className="col-span-6 text-center m-1">
            <img
              src="/Shop By Category/image-1.jpg"
              alt=""
              className="w-full h-full object-cover rounded hover:shadow-lg"
            />
          </div>
          <div className="col-span-6 text-center m-1 ">
            <img
              src="/Shop By Category/image-2.jpg"
              alt=""
              className="w-full h-full object-cover rounded hover:shadow-lg"
            />
          </div>
          <div className="col-span-8 text-center m-1">
            <img
              src="/Shop By Category/image-3.jpg"
              alt=""
              className="w-full h-full object-cover rounded hover:shadow-lg"
            />
          </div>
          <div className="col-span-4 text-center m-1 ">
            <img
              src="/Shop By Category/image-4.jpg"
              alt=""
              className="w-full h-full object-cover rounded hover:shadow-lg"
            />
          </div>
          <div className="col-span-6 text-center m-1">
            <img
              src="/Shop By Category/image-5.jpg"
              alt=""
              className="w-full h-full object-cover rounded hover:shadow-lg"
            />
          </div>
          <div className="col-span-6 text-center m-1">
            <img
              src="/Shop By Category/image-6.jpg"
              alt=""
              className="w-full h-full object-cover rounded hover:shadow-lg"
            />
          </div>
        </div>
        <div className={`${styles.longImage} m-1 col-span-4`}>
          <img
            src="/Shop By Category/long-image.jpg"
            alt=""
            className="w-full h-full object-cover rounded hover:shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default FollowOnInstagram;

// Images - css file

// .main-container {
//   padding: 0 9rem 0 9rem;
// }

// @media only screen and (max-width: 48em) {
//   .longImage {
//     height: 0;
//   }

//   .main-container {
//     padding: 0 4rem 0 4rem;
//   }
// }
