import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ShopPageLayout from "./pages/ShopPageLayout";
import DescriptionLayout from "./pages/DescriptionLayout";
import LoginPage from "./pages/LoginPage";
import Contact from "./pages/Contact";
import contactFormAction from "./actions/contactFormAction";
import AboutUs from "./pages/AboutUs";
import FAQs from "./pages/FAQs";
import BlogPage from "./pages/BlogPage";
import CartPage from "./pages/CartPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AppLayout from "./AppLayout";
import ScrollToTop from "./ScrollToTop";

import { PlantContextProvider } from "./context/PlantsContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import { OrderProvider } from "./context/OrderContext";
import AddressFormPage from "./pages/AddressFormPage";
import loginAction from "./actions/loginAction";

const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollToTop />

        <NotificationProvider>
          <AuthProvider>
            <PlantContextProvider>
              <CartProvider>
                <OrderProvider>
                  <AppLayout />
                </OrderProvider>
              </CartProvider>
            </PlantContextProvider>
          </AuthProvider>
        </NotificationProvider>
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/shop",
        element: <ShopPageLayout />,
      },
      {
        path: "/contact",
        element: <Contact />,
        action: contactFormAction,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/plant/description/:plantId",
        element: <DescriptionLayout />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/faqs",
        element: <FAQs />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/cart/address",
        element: <AddressFormPage />,
      },
      {
        path: "/order-success",
        element: <OrderSuccessPage />,
      },
      {
        path: "/resetPassword/:token",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <>
        <ScrollToTop />

        <NotificationProvider>
          <AuthProvider>
            <PlantContextProvider>
              <CartProvider>
                <LoginPage />
              </CartProvider>
            </PlantContextProvider>
          </AuthProvider>
        </NotificationProvider>
      </>
    ),
    action: loginAction,
  },
]);

function App() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;
