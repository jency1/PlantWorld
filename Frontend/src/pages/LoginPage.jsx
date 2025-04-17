import React, { useState } from "react";
import BackToHomeButton from "../components/LoginPage/BackToHomeButton";
import LeftSection from "../components/LoginPage/LeftSection";
import RightSection from "../components/LoginPage/RightSection";
import ForgotPasswordModal from "../components/LoginPage/ForgotPasswordModal";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPasswordModal(true);
  };

  const handleCloseModal = () => {
    setShowForgotPasswordModal(false);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#ecffed] p-2 md:p-4">
      <BackToHomeButton />
      <div className="flex w-[90%] md:w-[80%] max-w-[1200px] bg-white/80 rounded-[10px] shadow-lg flex-col sm:flex-row mt-10 mb-2 md:mt-3">
        <LeftSection />
        <RightSection
          isSignup={isSignup}
          setIsSignup={setIsSignup}
          handleForgotPassword={handleForgotPassword}
        />
      </div>

      {showForgotPasswordModal && (
        <ForgotPasswordModal handleClose={handleCloseModal} />
      )}
    </div>
  );
};

export default LoginPage;
