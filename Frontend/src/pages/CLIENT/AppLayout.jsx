import { Outlet } from "react-router-dom";
import Navbar from "../../components/CLIENT/Navbar/Navbar";
import Footer from "../../components/CLIENT/Footer/Footer";

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
