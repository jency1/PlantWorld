import "../../../index.css";
import { FaLongArrowAltRight } from "react-icons/fa";

import { Link } from "react-router-dom";

function ShopByCategory() {
  const categories = [
    { image: "/frontend/Shop By Category/outdoor.png", name: "Outdoor" },
    { image: "/frontend/Shop By Category/indoor.png", name: "Indoor" },
    { image: "/frontend/Shop By Category/terracebalcony.png", name: "Terrace" },
    { image: "/frontend/Shop By Category/officedesk.png", name: "Office Desk" },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Heading Section */}
      <div className="mt-6 md:mt-16 text-success font-bold text-2xl md:text-3xl lg:text-4xl font-serif">
        Shop by Category
      </div>
      <div className="w-3/4 lg:w-2/3 mx-auto text-center mt-8 text-sm md:text-base lg:text-lg">
        Discover our top trees, chosen for their beauty and resilience. Add
        color, fruit, or greenery to your garden with these customer favorites.
        Bring {`nature's`} charm home today.
      </div>

      {/* Categories Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 lg:gap-16 mt-10 mx-4 lg:mx-16">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-3"
          >
            <Link to="/shop">
              <img
                src={category.image}
                alt={category.name}
                className="rounded-full w-28 h-28 md:w-36 md:h-36 lg:w-60 lg:h-60 object-cover hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer"
              />
            </Link>
            <div className="text-base md:text-xl lg:text-xl font-semibold">
              {category.name}
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <Link to="/shop">
        <button className="flex items-center mt-8 mb-4 px-3 py-2 bg-green-700 hover:bg-green-600 text-white font-medium rounded-lg text-xs md:text-sm lg:text-base">
          <span>View All</span>
          <span className="ml-2">
            <FaLongArrowAltRight />
          </span>
        </button>
      </Link>
    </div>
  );
}

export default ShopByCategory;

// ---------------------------------------------

// import "../../index.css";

// import { FaLongArrowAltRight } from "react-icons/fa";

// function ShopByCategory() {
//   return (
//     <div className="d-flex flex-column align-items-center ">
//       <div className="mt-16 text-success font-bold text-2xl md:text-3xl lg:text-4xl">
//         Shop by Category
//       </div>
//       <div className="w-3/4 lg:w-2/3 mx-auto text-center mt-8 text-sm md:text-base lg:text-lg">
//         Discover our top trees, chosen for their beauty and resilience. Add
//         color, fruit, or greenaery to your garden with these customer favorites.
//         Bring {`nature's`} charm home today.
//       </div>
//       <div className="container">
//         <div className="row mx-auto flex items-center pl-6">
//           <div className="col-6 col-md-3 text-center mt-5">
//             <img
//               src="/Shop By Category/outdoor.png"
//               alt=""
//               className="img-fluid rounded"
//             />
//             <div className="h5 mt-3">Outdoor</div>
//           </div>
//           <div className="col-6 col-md-3 text-center mt-5">
//             <img
//               src="/Shop By Category/indoor.png"
//               alt=""
//               className="img-fluid rounded"
//             />
//             <div className="h5 mt-3">Indoor</div>
//           </div>
//           <div className="col-6 col-md-3 text-center mt-5">
//             <img
//               src="/Shop By Category/terracebalcony.png"
//               alt=""
//               className="img-fluid rounded"
//             />
//             <div className="h5 mt-3">Terrace</div>
//           </div>
//           <div className="col-6 col-md-3 text-center mt-5">
//             <img
//               src="/Shop By Category/officedesk.png"
//               alt=""
//               className="img-fluid rounded"
//             />
//             <div className="h5 mt-3">Office Desk</div>
//           </div>
//         </div>
//       </div>

//       <button className="d-flex align-items-center w-30 mt-4 mb-2 btn btn-success btn-block">
//         <span> View All</span>
//         <span className="ms-2 mb-1">
//           <FaLongArrowAltRight />
//         </span>
//       </button>
//     </div>
//   );
// }

// export default ShopByCategory;
