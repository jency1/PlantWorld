import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

const LoginForm = ({ handleForgotPassword }) => {
  const { login } = useContext(AuthContext);
  const { showNotification } = useNotification();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("email", email);
      const response = await fetch(`${BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        const { token, data: userData } = data;
        const user = userData?.user;

        if (token && user) {
          showNotification("Login successful!", "success");
          login(token, user);
        } else {
          showNotification("Login failed: Invalid server response.", "error");
        }
      } else {
        showNotification(
          data.message || "Login failed. Please check your credentials.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      showNotification("An error occurred. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      {/* Email Input */}
      <label htmlFor="email" className="mb-2 text-[0.8rem] lg:text-[1.1rem]">
        Email:
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

      {/* Password Input */}
      <label htmlFor="password" className="mb-2 text-[0.8rem] lg:text-[1.1rem]">
        Password:
      </label>
      <input
        type="password"
        id="password"
        placeholder="*****"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
      />

      {/* Forgot Password Link */}
      <div className="text-right text-xs md:text-md lg:text-lg mb-[8px] lg:mb-[15px]">
        <a
          href="#"
          onClick={handleForgotPassword}
          className="text-[#72a876] font-semibold hover:text-[#499a4e] no-underline"
        >
          Forgot Password?
        </a>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-[#4ead54] text-white font-bold px-[2px] py-[3px] lg:px-[12px] lg:py-[10px] rounded border-none text-[0.8rem] lg:text-[1.1rem] cursor-pointer transition-colors duration-300 ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#499a4e]"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Logging in...
          </div>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
