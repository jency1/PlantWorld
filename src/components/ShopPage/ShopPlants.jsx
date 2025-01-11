import React from "react";
import FilterComponent from "./FilterComponent"; // Import the filter component

function ShopPlants() {
  const products = [
    {
      id: 1,
      imageSrc: "/public/Featured Products/image1.jpg",
      title: "Plant",
      price: "Rs.500",
    },
    {
      id: 2,
      imageSrc: "/public/Featured Products/image2.jpg",
      title: "Plant",
      price: "Rs.500",
    },
    {
      id: 3,
      imageSrc: "/public/Featured Products/image3.jpg",
      title: "Plant",
      price: "Rs.500",
    },
    {
      id: 4,
      imageSrc: "/public/Featured Products/image4.jpg",
      title: "Plant",
      price: "Rs.500",
    },
    {
      id: 5,
      imageSrc: "/public/Featured Products/image5.jpg",
      title: "Plant",
      price: "Rs.500",
    },
    {
      id: 6,
      imageSrc: "/public/Featured Products/image6.jpg",
      title: "Plant",
      price: "Rs.500",
    },
    {
      id: 7,
      imageSrc: "/public/Featured Products/image7.jpg",
      title: "Plant",
      price: "Rs.500",
    },
    {
      id: 8,
      imageSrc: "/public/Featured Products/image8.jpg",
      title: "Plant",
      price: "Rs.500",
    },
    {
      id: 9,
      imageSrc: "/public/Featured Products/image1.jpg",
      title: "Plant",
      price: "Rs.500",
    },
    {
      id: 10,
      imageSrc: "/public/Featured Products/image2.jpg",
      title: "Plant",
      price: "Rs.500",
    },
    {
      id: 11,
      imageSrc: "/public/Featured Products/image3.jpg",
      title: "Plant",
      price: "Rs.500",
    },
    {
      id: 12,
      imageSrc: "/public/Featured Products/image4.jpg",
      title: "Plant",
      price: "Rs.500",
    },
  ];

  const ProductCard = ({ imageSrc, title, price }) => {
    return (
      <div className="col-12 col-md-4 text-center mt-4">
        <div className="card p-3" style={{ backgroundColor: "#f9f9f9" }}>
          <img src={imageSrc} alt={title} className="img-fluid custom-img" />
          <div className="h5 mt-2">{title}</div>
          <div className="text-success">{price}</div>
          <button className="btn btn-outline-success mt-3">Add To Cart</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Left-side Filters */}
          <div className="col-md-3 mt-4">
            <FilterComponent />
          </div>

          {/* Right-side Product Cards */}
          <div className="col-md-9">
            <div className="row">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  imageSrc={product.imageSrc}
                  title={product.title}
                  price={product.price}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="my-5"></div>
    </>
  );
}

export default ShopPlants;
