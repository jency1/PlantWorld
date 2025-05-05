import React from "react";
import CartItem from "../components/CartPage/CartItem";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

// const BASE_URL = import.meta.env.VITE_BASE_URL;

const CartPage = () => {
  const { cart } = React.useContext(CartContext);

  console.log("Cart Item data : ", cart);

  const totalAmount = cart.reduce(
    (amt, item) => amt + item.price * item.quantity,
    0
  );

  return (
    <div className="relative flex justify-center items-center bg-[#ecffed]">
      <div className="flex flex-col w-[90%] md:w-[80%] max-w-[1200px] bg-white/80 rounded-[10px] shadow-lg mt-10 md:mt-12 mb-5 p-6 lg:p-10">
        <h2 className="text-success font-bold text-2xl md:text-3xl text-center mb-8 font-serif">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 text-md md:text-xl font-semibold mb-4">
              Oops! Your cart is empty! 😔
            </p>
            <p className="text-gray-500 text-xs md:text-base lg:text-lg mb-6">
              It looks like you haven’t added anything to your cart yet. Don’t
              worry, there are plenty of plants waiting for you!
            </p>
            <Link to="/shop">
              <button className="btn btn-success text-xs md:text-base lg:text-lg mx-[10%] mt-[10%] md:mt-[3%] transform transition duration-300 hover:scale-105">
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <CartItem
                  key={item?._id}
                  item={{
                    id: item?._id,
                    plantId: item?.plantId?._id,
                    name: item?.plantId?.name,
                    image:
                      item?.plantId?.imageCover || `/${item?.name}-image.jpg`,
                    price: item?.price,
                    quantity: item?.quantity,
                  }}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center border-t pt-4">
              <h3 className="text-sm md:text-md lg:text-xl font-serif font-semibold">
                Total Cost: ₹{totalAmount}
              </h3>
              <button className="btn btn-success text-white text-xs md:text-base lg:text-md px-3 py-2 rounded-md transform transition duration-300 hover:scale-105">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;

// --------------------------------------------------------

// import React, { useState } from "react";
// import CartItem from "../components/CartPage/CartItem";
// import { Link } from "react-router-dom";
// import { CartContext } from "../context/CartContext";

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const CartPage = () => {
//   const initialCartItems = [
//     {
//       id: 1,
//       name: "Money Plant",
//       price: 300,
//       image: "/backend/plants/moneyplant.jpg",
//       quantity: 2,
//     },
//     {
//       id: 2,
//       name: "Aloe Vera",
//       price: 200,
//       image: "/backend/plants/AloeVera.jpg",
//       quantity: 1,
//     },
//   ];

//   const [cartItems, setCartItems] = useState(initialCartItems);

//   const handleRemoveItem = (id) => {
//     setCartItems(cartItems.filter((item) => item.id !== id));
//   };

//   const handleQuantityChange = (id, newQuantity) => {
//     if (newQuantity <= 0) return;
//     setCartItems(
//       cartItems.map((item) =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const totalAmount = cartItems.reduce(
//     (amt, item) => amt + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="relative flex justify-center items-center bg-[#ecffed]">
//       <div className="flex flex-col w-[90%] md:w-[80%] max-w-[1200px] bg-white/80 rounded-[10px] shadow-lg mt-10 md:mt-12 mb-5 p-6 lg:p-10">
//         <h2 className="text-success font-bold text-2xl md:text-3xl text-center mb-8 font-serif">
//           Your Cart
//         </h2>

//         {cartItems.length === 0 ? (
//           <>
//             <div className="text-center">
//               <p className="text-gray-600 text-md md:text-xl font-semibold mb-4">
//                 Oops! Your cart is empty! 😔
//               </p>
//               <p className="text-gray-500 text-xs md:text-base lg:text-lg mb-6">
//                 It looks like you haven’t added anything to your cart yet. Don’t
//                 worry, there are plenty of plants waiting for you!
//               </p>
//               <Link to="/shop">
//                 <button className="btn btn-success text-xs md:text-base lg:text-lg mx-[10%] mt-[10%] md:mt-[3%] transform transition duration-300 hover:scale-105">
//                   Shop Now
//                 </button>
//               </Link>
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="space-y-6">
//               {cartItems.map((item) => (
//                 <CartItem
//                   key={item.id}
//                   item={item}
//                   onRemove={handleRemoveItem}
//                   onQuantityChange={handleQuantityChange}
//                 />
//               ))}
//             </div>

//             <div className="mt-8 flex justify-between items-center border-t pt-4">
//               <h3 className="text-sm md:text-md lg:text-xl font-serif font-semibold">
//                 Total Cost: ₹{totalAmount}
//               </h3>
//               <button className="btn btn-success text-white text-xs md:text-base lg:text-md px-3 py-2 rounded-md transform transition duration-300 hover:scale-105">
//                 Proceed to Checkout
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;
