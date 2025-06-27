import React, { useState } from "react";
import { useNotification } from "../../../context/NotificationContext";

const ForgotPasswordModal = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { showNotification } = useNotification();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch(`${BASE_URL}/api/users/forgetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("A reset link has been sent to your email.");
        showNotification("Reset link sent successfully.", "success");

        // Auto-close modal after 5 seconds
        setTimeout(() => {
          handleClose();
        }, 5000);
      } else {
        setIsSuccess(false);
        setMessage(data.message || "Failed to send reset link.");
        showNotification(data.message || "Failed to send reset link.", "error");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      setIsSuccess(false);
      setMessage("An error occurred. Please try again later.");
      showNotification("An error occurred. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-[20px] rounded-lg w-[90%] max-w-[400px]">
        <h2 className="font-semibold mb-4 text-[17px] lg:text-[22px] text-center text-[#72A876]">
          Forgot Password?
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="mb-2 text-[0.8rem] lg:text-[1.1rem]"
          >
            Enter your email to reset your password:
          </label>
          <input
            type="email"
            id="email"
            placeholder="xyz@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
          />

          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="bg-[#4ead54] text-white font-bold py-[6px] md:py-[8px] lg:py-[7px] rounded border-none text-[0.8rem] lg:text-[1.1rem] cursor-pointer transition-colors duration-300 hover:bg-[#499a4e] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-xs md:text-base lg:text-lg">
            <span className={isSuccess ? "text-success" : "text-red-500"}>
              {message}
            </span>
          </div>
        )}

        <button
          onClick={handleClose}
          className="text-red-500 font-semibold text-sm md:text-base lg:text-lg mt-4 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
