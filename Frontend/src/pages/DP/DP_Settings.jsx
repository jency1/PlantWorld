import React, { useContext, useState, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import { NotificationContext } from "../../context/NotificationContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function DP_Settings() {
  const actionData = useActionData();
  const { showNotification } = useContext(NotificationContext);
  const [showForm, setShowForm] = useState(true);

  const [showPasswordCurrent, setShowPasswordCurrent] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(true);

  // Show notification when action returns
  useEffect(() => {
    if (actionData) {
      showNotification(
        actionData.success || actionData.error,
        actionData.success ? "success" : "error"
      );
    }
  }, [actionData]);

  return (
    <div className="p-6">
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        {showForm ? "Close Update Password" : "Update Password"}
      </button>

      {showForm && (
        <Form method="post" className="space-y-4">
          {/** Current Password **/}
          <div className="flex items-center gap-2 relative w-full sm:w-auto">
            <label className="w-52 font-medium">Current Password</label>
            <div className="relative w-1/4">
              <input
                type={showPasswordCurrent ? "text" : "password"}
                name="passwordCurrent"
                placeholder="Enter current password"
                required
                minLength={8}
                className="w-full p-2 pr-10 border rounded"
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPasswordCurrent(!showPasswordCurrent)}
              >
                {showPasswordCurrent ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/** New Password **/}
          <div className="flex items-center gap-2 relative w-full sm:w-auto">
            <label className="w-52 font-medium">New Password</label>
            <div className="relative w-1/4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                required
                minLength={8}
                className="w-full p-2 pr-10 border rounded"
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/** Confirm Password **/}
          <div className="flex items-center gap-2 relative w-full sm:w-auto">
            <label className="w-52 font-medium">Confirm New Password</label>
            <div className="relative w-1/4">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                name="passwordConfirm"
                placeholder="Confirm new password"
                required
                minLength={8}
                className="w-full p-2 pr-10 border rounded"
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              >
                {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Update Password
          </button>
        </Form>
      )}
    </div>
  );
}
