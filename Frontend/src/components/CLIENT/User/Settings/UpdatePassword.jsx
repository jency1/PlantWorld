import React, { useState, useContext } from "react";
import { Form } from "react-router-dom";

import { AuthContext } from "../../../../context/CLIENT/AuthContext";
import { useNotification } from "../../../../context/NotificationContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function UpdatePassword() {
  const { token } = useContext(AuthContext);
  const { showNotification } = useNotification();

  const [form, setForm] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.passwordConfirm) {
      showNotification("Passwords do not match.", "error");
      return;
    }

    if (form.password === form.passwordCurrent) {
      showNotification(
        "Current Password & New Password should be different.",
        "error"
      );
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/users/updateMyPassword`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          passwordCurrent: form.passwordCurrent,
          password: form.password,
          passwordConfirm: form.passwordConfirm,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update password.");
      }

      showNotification("Password updated successfully!", "success");
      setForm({
        passwordCurrent: "",
        password: "",
        passwordConfirm: "",
      });
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      method="post"
      className="mx-auto lg:w-[70%] border-t pt-4 lg:mt-6 flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <label className="text-sm md:text-base text-gray-600 ml-1">
          Current Password
        </label>
        <input
          type="password"
          name="passwordCurrent"
          value={form.passwordCurrent}
          onChange={handleChange}
          placeholder="Enter current password"
          required
          className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="text-sm md:text-base text-gray-600 ml-1">
          New Password
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter new password"
          required
          className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="text-sm md:text-base text-gray-600 ml-1">
          Confirm New Password
        </label>
        <input
          type="password"
          name="passwordConfirm"
          value={form.passwordConfirm}
          onChange={handleChange}
          placeholder="Confirm new password"
          required
          className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <div className="mt-1">
        <button
          type="submit"
          disabled={loading}
          className={`inline-block bg-green-700 hover:bg-green-800 text-white text-sm md:text-sm py-2 px-3 rounded transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </Form>
  );
}
