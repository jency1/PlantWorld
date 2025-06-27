import React, { useState, useContext } from "react";
import { Form } from "react-router-dom";

import { AuthContext } from "../../../context/CLIENT/AuthContext";
import { useNotification } from "../../../context/NotificationContext";

const SignupForm = () => {
  const { login } = useContext(AuthContext);
  const { showNotification } = useNotification();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const labelClass = "mb-1 text-[0.8rem] lg:text-[1.1rem]";
  const inputClass =
    "w-full px-[8px] py-[4px] lg:px-[12px] lg:py-[5px] mb-3 rounded border border-gray-300 text-[0.8rem] lg:text-[1rem]";

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phoneNumber, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          password,
          passwordConfirm: confirmPassword,
        }),
      });

      const data = await response.json();
      // console.log("Sign up Data: ", data);

      if (response.ok) {
        showNotification("Signup successful!", "success");

        const { token, data: userData } = data;

        if (token && userData?.user) {
          login(token, userData.user);
        } else {
          showNotification("Signup succeeded, but login failed.", "warning");
        }
      } else {
        showNotification(data.message || "Signup failed", "error");
      }
    } catch (error) {
      console.error("Signup error:", error);
      showNotification("Something went wrong. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      method="post"
      onSubmit={handleSubmit}
      className="flex flex-col w-full"
    >
      {[
        {
          label: "Name",
          name: "name",
          type: "text",
          placeholder: "Enter Your Full Name",
        },
        {
          label: "Email",
          name: "email",
          type: "email",
          placeholder: "xyz@example.com",
        },
        {
          label: "Mobile Number",
          name: "phoneNumber",
          type: "tel",
          placeholder: "1234567890",
        },
        {
          label: "Password",
          name: "password",
          type: "password",
          placeholder: "*****",
        },
        {
          label: "Confirm Password",
          name: "confirmPassword",
          type: "password",
          placeholder: "*****",
        },
      ].map(({ label, name, type, placeholder }) => (
        <div key={name}>
          <label htmlFor={name} className={labelClass}>
            {label}:
          </label>
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-[#4ead54] text-white font-bold px-[2px] py-[3px] lg:px-[12px] lg:py-[10px] rounded border-none text-[0.8rem] lg:text-[1.1rem] mt-1 cursor-pointer transition-colors duration-300 hover:bg-[#499a4e] ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Signing Up..." : "Signup"}
      </button>
    </Form>
  );
};

export default SignupForm;
