import { Form, useActionData, useNavigation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

const LoginForm = ({ handleForgotPassword }) => {
  const { login } = useContext(AuthContext);
  const { showNotification } = useNotification();
  const actionData = useActionData();
  const navigation = useNavigation();
  const loading = navigation.state === "submitting";

  // Handle login on successful response
  useEffect(() => {
    if (actionData?.success && actionData.token && actionData.user) {
      showNotification("Login successful!", "success");
      login(actionData.token, actionData.user);
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
        placeholder="xyz@example.com"
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
        <a
          href="#"
          onClick={handleForgotPassword}
          className="text-[#72a876] font-semibold hover:text-[#499a4e] no-underline"
        >
          Forgot Password?
        </a>
      </div>

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
    </Form>
  );
};

export default LoginForm;
