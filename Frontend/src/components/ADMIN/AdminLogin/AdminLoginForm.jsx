import {
  Form,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useContext } from "react";
import { AdminAuthContext } from "../../../context/ADMIN/AdminAuthContext";
import { useNotification } from "../../../context/NotificationContext";

const AdminLoginForm = ({ handleForgotPassword }) => {
  const { loginAdmin } = useContext(AdminAuthContext);
  const { showNotification } = useNotification();
  const actionData = useActionData();
  const navigation = useNavigation();
  const loading = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success && actionData.token && actionData.user) {
      if (actionData.user.role === "admin") {
        loginAdmin(actionData.token, actionData.user);
        showNotification("Admin Login successful!", "success");
      } else {
        showNotification("Access denied. Not an admin account.", "error");
      }
    } else if (actionData?.error) {
      showNotification(actionData.error, "error");
    }
  }, [actionData]);

  return (
    <Form method="post" className="flex flex-col w-full">
      <label htmlFor="email" className="mb-2 text-[0.8rem] lg:text-[1.1rem]">
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="admin@example.com"
        required
        className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[0.8rem] lg:text-[1rem]"
      />

      <label htmlFor="password" className="mb-2 text-[0.8rem] lg:text-[1.1rem]">
        Password:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="*****"
        required
        className="w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[0.8rem] lg:text-[1rem]"
      />

      <div className="text-right text-xs md:text-md lg:text-lg mb-[8px] lg:mb-[15px]">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-[#72a876] font-semibold hover:text-[#499a4e] no-underline"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-[#4ead54] text-white font-bold px-[2px] py-[3px] lg:px-[12px] lg:py-[10px] rounded border-none text-[0.8rem] lg:text-[1.1rem] cursor-pointer transition-colors duration-300 ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#499a4e]"
        }
        `}
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
    </Form>
  );
};

export default AdminLoginForm;
