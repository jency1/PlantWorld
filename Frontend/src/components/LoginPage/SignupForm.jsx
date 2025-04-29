import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

const SignupForm = () => {
  const { login } = useContext(AuthContext);
  const { showNotification } = useNotification();

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phoneNumber: phoneNumber,
          password,
          passwordConfirm: confirmPassword,
        }),
      });

      const data = await response.json();
      console.log("Sign up Data: ", data);

      if (response.ok) {
        showNotification("Signup successful!", "success");

        const token = data.token;
        const user = data.data?.user;

        if (token && user) {
          login(token, user); // Sets token and user in context and localStorage
        } else {
          showNotification("Signup succeeded, but login failed.", "warning");
        }
      } else {
        showNotification(data.message || "Signup failed", "error");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      showNotification("An error occurred. Please try again later.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
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

      <label
        htmlFor="phoneNumber"
        className="mb-2 text-[0.8rem] lg:text-[1.1rem]"
      >
        Mobile Number:
      </label>
      <input
        type="tel"
        id="phoneNumber"
        placeholder="123-456-7890"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
      />

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

      <label
        htmlFor="confirmPassword"
        className="mb-2 text-[0.8rem] lg:text-[1.1rem]"
      >
        Confirm Password:
      </label>
      <input
        type="password"
        id="confirmPassword"
        placeholder="*****"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-[#4ead54] text-white font-bold px-[2px] py-[3px] lg:px-[12px] lg:py-[10px] rounded border-none text-[0.8rem] lg:text-[1.1rem] cursor-pointer transition-colors duration-300 hover:bg-[#499a4e] ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Signing Up..." : "Signup"}
      </button>
    </form>
  );
};

export default SignupForm;
