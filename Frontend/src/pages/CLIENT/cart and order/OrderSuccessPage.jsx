import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-10 md:p-16 flex items-center justify-center bg-green-50">
      <div className="bg-white max-w-[18rem] md:max-w-lg lg:max-w-xl rounded-2xl shadow-xl px-3 py-8 md:py-12 text-center animate-fade-in transition-all duration-500">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <AiOutlineCheckCircle className="text-green-500 w-12 h-12 md:w-20 md:h-20" />
        </div>

        {/* Heading */}
        <h2 className="text-md md:text-xl lg:text-3xl font-bold text-gray-800 mb-3">
          Order Placed Successfully 🎉
        </h2>

        {/* Subtext */}
        <p className="text-gray-600 text-xs sm:text-base mb-4 px-2 sm:px-4">
          Thank you for shopping with{" "}
          <span className="font-semibold">PlantWorld</span>! Your order is being
          processed and a confirmation email will be sent shortly.
        </p>

        {/* Estimated Delivery */}
        <p className="text-gray-500 text-xs sm:text-base mb-6">
          Estimated Delivery:{" "}
          <span className="font-semibold">within 5–7 business days!</span>
        </p>

        {/* Actions */}
        <div className="flex flex-row justify-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="btn btn-success text-white text-xs md:text-base lg:text-md rounded-md transform transition duration-300 hover:scale-105 cursor-pointer"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="btn btn-success text-white text-xs md:text-base lg:text-md rounded-md transform transition duration-300 hover:scale-105 cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
