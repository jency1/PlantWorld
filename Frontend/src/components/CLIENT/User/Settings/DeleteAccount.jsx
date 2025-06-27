import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../../context/CLIENT/AuthContext";
import { useNotification } from "../../../../context/NotificationContext";

export default function DeleteAccount() {
  const { token, logout } = useContext(AuthContext);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleDelete = async () => {
    if (!token) {
      return;
    }

    if (confirm !== "DELETE") {
      return showNotification("Please type DELETE to confirm.", "warning");
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/users/deleteMe`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Account deletion failed.");
      }

      showNotification("Account deleted successfully.", "success");
      logout();
      navigate("/");
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto lg:w-[70%]">
      <div className="border-t pt-4 lg:mt-6">
        <p className="text-sm md:text-base text-gray-600 mb-2 ml-1">
          Type <span className="font-bold text-red-600">DELETE</span> below to
          confirm account deletion.
        </p>

        <input
          type="text"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Type DELETE"
          className="p-2 border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring-1 focus:ring-red-500"
        />

        <button
          onClick={handleDelete}
          disabled={loading}
          className={`btn btn-danger text-white text-xs md:text-sm py-2 px-3 rounded transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
}
