import {
  useNavigation,
  Form,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

import { useNotification } from "../../../context/NotificationContext";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();
  const { showNotification } = useNotification();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      showNotification("Password reset successfully! Please login.", "success");

      // Redirect to login after short delay - to see the success notification
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer); // cleanup
    } else if (actionData?.error) {
      showNotification(actionData.error, "error");
    }
  }, [actionData]);

  return (
    <div className="flex items-center justify-center bg-gray-50 px-5 py-5">
      <Form
        method="post"
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
          name="password"
          required
          className="w-full mb-3 px-3 py-2 border rounded-md"
        />

        <label htmlFor="passwordConfirm" className="text-sm font-medium">
          Confirm New Password
        </label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          required
          className="w-full mb-4 px-3 py-2 border rounded-md"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#4ead54] text-white font-semibold py-2 w-full rounded-md hover:bg-[#499a4e] transition"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;
