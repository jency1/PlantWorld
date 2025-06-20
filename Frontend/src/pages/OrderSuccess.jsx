import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-md w-full animate-fade-in">
        <div className="flex justify-center mb-6">
          <svg
            className="w-20 h-20 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a10 10 0 11-20 0 10 10 0 0120 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your Order Was Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with{" "}
          <span className="font-medium">PlantWorld</span>. You’ll receive a
          confirmation email shortly.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
