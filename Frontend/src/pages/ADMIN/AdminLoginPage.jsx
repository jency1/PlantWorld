import React, { useCallback, useState } from "react";
import LeftSection from "../../components/ADMIN/AdminLogin/LeftSection";
import RightSection from "../../components/ADMIN/AdminLogin/RightSection";
import ForgotPasswordModal from "../../components/ADMIN/AdminLogin/ForgotPasswordModal";

const LoginPage = () => {
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
      <div className="font-serif absolute top-7 md:top-20 lg:top-14 text-xl md:text-2xl lg:text-3xl font-bold text-[#4ead54]">
        Admin Login
      </div>

      <div className="flex w-[90%] md:w-[80%] max-w-[1100px] bg-white/80 rounded-[10px] shadow-lg flex-col sm:flex-row mt-16 lg:mt-10 mb-4 md:mt-3">
        <LeftSection />
        <RightSection handleForgotPassword={handleForgotPassword} />
      </div>

      {showForgotPasswordModal && (
        <ForgotPasswordModal handleClose={handleCloseModal} />
      )}
    </div>
  );
};

export default LoginPage;
