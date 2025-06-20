import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotification } from "../context/NotificationContext";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/api/users/resetPassword/${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, passwordConfirm: confirmPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showNotification(
          "Password reset successfully! Please login.",
          "success"
        );
        navigate("/login");
      } else {
        showNotification(data.message || "Reset failed. Try again.", "error");
      }
    } catch (err) {
      console.error("Reset error:", err);
      showNotification("Something went wrong. Try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-5 py-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold text-center mb-4 text-[#4ead54]">
          Reset Your Password
        </h2>

        <label htmlFor="password" className="text-sm font-medium">
          New Password
        </label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-md"
        />

        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#4ead54] text-white font-semibold py-2 w-full rounded-md hover:bg-[#499a4e] transition"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
