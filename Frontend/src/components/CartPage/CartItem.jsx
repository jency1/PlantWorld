import React, { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useNotification } from "../../context/NotificationContext";

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { showNotification } = useNotification();

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
    showNotification(`Item quantity increased!`, "info");
    console.log("Item quantity increased.");
  };

  const handleDecrease = () => {
    const newQuantity = quantity - 1;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
      showNotification(`Item quantity decreased!`, "info");
      console.log("Item quantity decreased.");
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
    showNotification(`Item removed from cart`, "error");
    console.log("Item removed from cart.");
  };

  return (
    <div className="flex flex-row items-center justify-between bg-[#f4f7f4] rounded-lg p-3 md:p-5 shadow-sm mb-6 w-full gap-3">
      {/* Image */}
      <div className="w-full md:w-[25%] lg:w-[15%] flex justify-center items-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-32 h-32 md:w-40 md:h-40 object-cover rounded"
        />
      </div>

      <div className="w-full md:w-[82%] flex flex-col md:flex-row items-center justify-between">
        {/* Name & Price */}
        <div className="w-full md:w-[25%] flex flex-col items-center md:items-start text-center md:text-left mb-2 md:mb-0 justify-center gap-2 md:gap-3">
          <h4 className="text-md lg:text-xl font-semibold text-gray-800">
            {item.name}
          </h4>
          <p className="text-gray-600 font-semibold text-sm lg:text-md">
            Price: ₹{item.price}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="w-full md:w-[20%] flex justify-center items-center space-x-2 mb-3 md:mb-0">
          <button
            className="bg-[#72a876] hover:bg-[#499a4e] text-white px-2 py-1 rounded"
            onClick={handleDecrease}
          >
            <FaMinus className="text-[6px] md:text-[8px] lg:text-[12px]" />
          </button>
          <span className="text-sm md:text-base lg:text-lg font-semibold">
            {quantity}
          </span>
          <button
            className="bg-[#72a876] hover:bg-[#499a4e] text-white px-2 py-1 rounded"
            onClick={handleIncrease}
          >
            <FaPlus className="text-[6px] md:text-[8px] lg:text-[12px]" />
          </button>
        </div>

        {/* Total Price */}
        <div className="w-full md:w-[20%] flex justify-center items-center text-gray-700 font-medium text-xs md:text-sm lg:text-lg mb-2 md:mb-0">
          Total: ₹{item.price * quantity}
        </div>

        {/* Remove Button */}
        <div className="w-full md:w-[10%] flex justify-center md:justify-end items-center">
          <button
            className="text-red-500 hover:text-red-700 text-xs lg:text-base flex items-center space-x-1"
            onClick={handleRemove}
          >
            <FaTrash />
            <span className="ml-1 inline">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

// import React, { useState } from "react";
// import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

// const CartItem = ({ item, onRemove, onQuantityChange }) => {
//   const [quantity, setQuantity] = useState(item.quantity);

//   const handleIncrease = () => {
//     const newQuantity = quantity + 1;
//     setQuantity(newQuantity);
//     onQuantityChange(item.id, newQuantity);
//   };

//   const handleDecrease = () => {
//     const newQuantity = quantity - 1;
//     if (newQuantity > 0) {
//       setQuantity(newQuantity);
//       onQuantityChange(item.id, newQuantity);
//     }
//   };

//   return (
//     <div className="flex flex-row items-center justify-between bg-[#f4f7f4] rounded-lg p-3 md:p-5 shadow-sm mb-6 w-full gap-3">
//       {/* Image */}
//       <div className="w-full md:w-[25%] lg:w-[15%] flex justify-center items-center">
//         <img
//           src={item.image}
//           alt={item.name}
//           className="w-32 h-32 md:w-40 md:h-40 object-cover rounded"
//         />
//       </div>

//       <div className="w-full md:w-[82%] flex flex-col md:flex-row items-center justify-between">
//         {/* Name & Price */}
//         <div className="w-full md:w-[25%] flex flex-col items-center md:items-start text-center md:text-left mb-2 md:mb-0 justify-center gap-2 md:gap-3">
//           <h4 className="text-md lg:text-xl font-semibold text-gray-800">
//             {item.name}
//           </h4>
//           <p className="text-gray-600 font-semibold text-sm lg:text-md">
//             Price: ₹{item.price}
//           </p>
//         </div>

//         {/* Quantity Controls */}
//         <div className="w-full md:w-[20%] flex justify-center items-center space-x-2 mb-3 md:mb-0">
//           <button
//             className="bg-[#72a876] hover:bg-[#499a4e] text-white px-2 py-1 rounded"
//             onClick={handleDecrease}
//           >
//             <FaMinus className="text-[6px] md:text-[8px] lg:text-[12px]" />
//           </button>
//           <span className="text-sm md:text-base lg:text-lg font-semibold">
//             {quantity}
//           </span>
//           <button
//             className="bg-[#72a876] hover:bg-[#499a4e] text-white px-2 py-1 rounded"
//             onClick={handleIncrease}
//           >
//             <FaPlus className="text-[6px] md:text-[8px] lg:text-[12px]" />
//           </button>
//         </div>

//         {/* Total Price */}
//         <div className="w-full md:w-[20%] flex justify-center items-center text-gray-700 font-medium text-xs md:text-sm lg:text-lg mb-2 md:mb-0">
//           Total: ₹{item.price * quantity}
//         </div>

//         {/* Remove Button */}
//         <div className="w-full md:w-[10%] flex justify-center md:justify-end items-center">
//           <button
//             className="text-red-500 hover:text-red-700 text-xs lg:text-base flex items-center space-x-1"
//             onClick={() => onRemove(item.id)}
//           >
//             <FaTrash />
//             <span className="ml-1 inline">Remove</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartItem;
