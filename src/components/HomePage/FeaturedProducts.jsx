export default function FeaturedProducts() {
  const products = [
    {
      imageUrl: "/Featured Products/image1.jpg",
      name: "Aloe Vera",
      price: "Rs.200",
    },
    {
      imageUrl: "/Featured Products/image2.jpg",
      name: "Bamboo Palm",
      price: "Rs.350",
    },
    {
      imageUrl: "/Featured Products/image3.jpg",
      name: "Cactus",
      price: "Rs.150",
    },
    {
      imageUrl: "/Featured Products/image4.jpg",
      name: "Snake Plant",
      price: "Rs.250",
    },
    {
      imageUrl: "/Featured Products/image5.jpg",
      name: "Ficus",
      price: "Rs.500",
    },
    {
      imageUrl: "/Featured Products/image6.jpg",
      name: "Spider Plant",
      price: "Rs.300",
    },
    {
      imageUrl: "/Featured Products/image7.jpg",
      name: "Money Plant",
      price: "Rs.400",
    },
    {
      imageUrl: "/Featured Products/image8.jpg",
      name: "Peace Lily",
      price: "Rs.600",
    },
  ];

  return (
    <div className="text-center">
      <h1 className="mt-5 text-success font-bold text-3xl">
        Featured Products
      </h1>
      <p className="w-full md:w-1/2 mx-auto mt-8 text-lg">
        Discover our top trees, chosen for their beauty and resilience. Add
        color, fruit, or greenery to your garden with these customer favorites.
        Bring nature's charm home today.
      </p>

      <div className="flex flex-wrap justify-center gap-8 mt-12 mb-16 mx-4 lg:mx-16">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ imageUrl, name, price }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 w-80">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-52 object-cover mx-auto rounded-lg"
      />
      <h3 className="mt-4 text-xl font-semibold text-green-700">{name}</h3>
      <div className="text-lg text-gray-700">{price}</div>
      <button className="mt-4 w-full py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300">
        Add to Cart
      </button>
    </div>
  );
}

// import styles from "./FeaturedProducts.module.css";

// function FeaturedProducts() {
//   return (
//     <>
//       <div className={`text-center`}>
//         <div className={`h1 mt-5 text-success`}>Featured Products</div>
//         <div className={`w-50 mx-auto mt-4 ${styles["text"]}`}>
//           Discover our top trees, chosen for their beauty and resilience. Add
//           color, fruit or greenery to your garden with these customer
//           favourites. Bring nature's charm home today.
//         </div>
//       </div>

//       <div className="container mb-5">
//         <div className="row">
//           <div className="col-6 col-md-3 text-center mt-5">
//             <img
//               src="/Featured Products/image1.jpg"
//               alt=""
//               className="img-fluid custom-img"
//             />
//             <div className="h3 mt-1">Plant</div>
//             <div>Rs.500</div>
//           </div>

//           <div className="col-6 col-md-3 text-center mt-5">
//             <img
//               src="/Featured Products/image2.jpg"
//               alt=""
//               className="img-fluid custom-img"
//             />
//             <div className="h3 mt-1">Plant</div>
//             <div>Rs.500</div>
//           </div>

//           <div className="col-6 col-md-3 text-center mt-5">
//             <img
//               src="/Featured Products/image3.jpg"
//               alt=""
//               className="img-fluid custom-img"
//             />
//             <div className="h3 mt-1">Plant</div>
//             <div>Rs.500</div>
//           </div>

//           <div className="col-6 col-md-3 text-center mt-5">
//             <img
//               src="/Featured Products/image4.jpg"
//               alt=""
//               className="img-fluid custom-img"
//             />
//             <div className="h3 mt-1">Plant</div>
//             <div>Rs.500</div>
//           </div>

//           <div className="col-6 col-md-3 text-center mt-5">
//             <img
//               src="/Featured Products/image5.jpg"
//               alt=""
//               className="img-fluid custom-img"
//             />
//             <div className="h3 mt-1">Plant</div>
//             <div>Rs.500</div>
//           </div>

//           <div className="col-6 col-md-3 text-center mt-5">
//             <img
//               src="/Featured Products/image6.jpg"
//               alt=""
//               className="img-fluid custom-img"
//             />
//             <div className="h3 mt-1">Plant</div>
//             <div>Rs.500</div>
//           </div>

//           <div className="col-6 col-md-3 text-center mt-5">
//             <img
//               src="/Featured Products/image7.jpg"
//               alt=""
//               className="img-fluid custom-img"
//             />
//             <div className="h3 mt-1">Plant</div>
//             <div>Rs.500</div>
//           </div>

//           <div className="col-6 col-md-3 text-center mt-5">
//             <img
//               src="/Featured Products/image8.jpg"
//               alt=""
//               className="img-fluid custom-img"
//             />
//             <div className="h3 mt-1">Plant</div>
//             <div>Rs.500</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default FeaturedProducts;
