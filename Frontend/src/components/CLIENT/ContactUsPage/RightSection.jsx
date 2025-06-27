import React, { useEffect } from "react";
import { useActionData } from "react-router-dom";
import Logo from "./Logo";
import LoginForm from "./LoginForm";

import { useNotification } from "../../../context/NotificationContext";

const RightSection = () => {
  const actionData = useActionData(); // get data returned from contactFormAction
  const { showNotification } = useNotification();

  useEffect(() => {
    if (actionData?.error) {
      showNotification(actionData.error, "error");
    } else if (actionData?.success) {
      showNotification(actionData.success, "success");
    }
  }, [actionData]);

  return (
    <div className="flex-1 flex flex-col justify-center bg-[#f4f7f4] p-[20px] lg:p-[30px] md:rounded-r-[10px]">
      <Logo />
      <LoginForm />
    </div>
  );
};

export default RightSection;
