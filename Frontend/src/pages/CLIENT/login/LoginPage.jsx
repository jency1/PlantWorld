import React, { useCallback, useState } from "react";
import BackToHomeButton from "../../../components/CLIENT/LoginPage/BackToHomeButton";
import LeftSection from "../../../components/CLIENT/LoginPage/LeftSection";
import RightSection from "../../../components/CLIENT/LoginPage/RightSection";
import ForgotPasswordModal from "../../../components/CLIENT/LoginPage/ForgotPasswordModal";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleForgotPassword = useCallback((e) => {
    e.preventDefault();
    setShowForgotPasswordModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowForgotPasswordModal(false);
  }, []);

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#ecffed] p-2 md:p-4">
      <BackToHomeButton />
      <div className="flex w-[90%] md:w-[80%] max-w-[1200px] bg-white/80 rounded-[10px] shadow-lg flex-col sm:flex-row mt-16 lg:mt-10 mb-4 md:mt-3">
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
