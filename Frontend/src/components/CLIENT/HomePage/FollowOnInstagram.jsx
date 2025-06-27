import styles from "./FollowOnInstagram.module.css";

import { RxInstagramLogo } from "react-icons/rx";

function FollowOnInstagram() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-9 md:mt-16 mb-4 font-bold text-xl md:text-3xl lg:text-4xl text-center flex justify-center items-center gap-2">
        <div className="text-success font-serif">Follow us on Instagram</div>
        <div className="cursor-pointer">
          <RxInstagramLogo />
        </div>
      </div>
      <div
        className={`${styles["main-container"]} grid h-full w-full md:h-4/6 md:w-5/6 grid-cols-12 px-8 mx-8 mt-2 mb-5`}
      >
        <div className="col-span-8 grid grid-cols-12">
          <div className="col-span-6 text-center m-[0.1rem] md:m-1">
            <img
              src="/frontend/Shop By Category/image-1.jpg"
              alt=""
              className="w-full h-full object-cover rounded hover:shadow-lg"
            />
          </div>
          <div className="col-span-6 text-center m-[0.1rem] md:m-1">
            <img
              src="/frontend/Shop By Category/image-2.jpg"
              alt=""
              className="w-full h-full object-cover rounded hover:shadow-lg"
            />
          </div>
          <div className="col-span-8 text-center m-[0.1rem] md:m-1">
            <img
              src="/frontend/Shop By Category/image-3.jpg"
              alt=""
              className="w-full h-full object-cover rounded hover:shadow-lg"
            />
          </div>
          <div className="col-span-4 text-center m-[0.1rem] md:m-1">
            <img
              src="/frontend/Shop By Category/image-4.jpg"
              alt=""
              className="w-full h-full object-cover rounded hover:shadow-lg"
            />
          </div>
          <div className="col-span-6 text-center m-[0.1rem] md:m-1">
            <img
              src="/frontend/Shop By Category/image-5.jpg"
              alt=""
              className="w-full h-full object-cover rounded hover:shadow-lg"
            />
          </div>
          <div className="col-span-6 text-center m-[0.1rem] md:m-1">
            <img
              src="/frontend/Shop By Category/image-6.jpg"
              alt=""
              className="w-full h-full object-cover rounded hover:shadow-lg"
            />
          </div>
        </div>
        <div className={`${styles.longImage} m-[0.1rem] col-span-4 md:m-1`}>
          <img
            src="/frontend/Shop By Category/long-image.jpg"
            alt=""
            className="md-h-0 w-full h-full object-cover rounded hover:shadow-lg"
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
