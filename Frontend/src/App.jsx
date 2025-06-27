import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/CLIENT/HomePage";

import ShopPageLayout from "./pages/CLIENT/shop/ShopPageLayout";
import DescriptionLayout from "./pages/CLIENT/shop/DescriptionLayout";

import Contact from "./pages/CLIENT/Contact";
import contactFormAction from "./actions/CLIENT/contactFormAction";

import AboutUs from "./pages/CLIENT/AboutUs";
import FAQs from "./pages/CLIENT/FAQs";
import BlogPage from "./pages/CLIENT/BlogPage";

import LoginPage from "./pages/CLIENT/login/LoginPage";
import loginAction from "./actions/CLIENT/loginAction";
import ResetPasswordPage from "./pages/CLIENT/login/ResetPasswordPage";
import resetPasswordAction from "./actions/CLIENT/resetPasswordAction";

import CartPage from "./pages/CLIENT/cart and order/CartPage";
import OrderSuccessPage from "./pages/CLIENT/cart and order/OrderSuccessPage";
import AddressFormPage from "./pages/CLIENT/cart and order/AddressFormPage";

import ProfilePage from "./pages/CLIENT/user/ProfilePage";
import MyOrdersPage from "./pages/CLIENT/user/MyOrdersPage";
import SettingsPage from "./pages/CLIENT/user/SettingsPage";

import AppLayout from "./AppLayout";
import ScrollToTop from "./ScrollToTop";

import { PlantContextProvider } from "./context/CLIENT/PlantsContext";
import { AuthProvider } from "./context/CLIENT/AuthContext";
import { CartProvider } from "./context/CLIENT/CartContext";
import { NotificationProvider } from "./context/CLIENT/NotificationContext";
import { OrderProvider } from "./context/CLIENT/OrderContext";
import ProtectedRoute from "./ProtectedRoute";

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
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart/address",
        element: (
          <ProtectedRoute>
            <AddressFormPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order-success",
        element: (
          <ProtectedRoute>
            <OrderSuccessPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/resetPassword/:token",
        element: <ResetPasswordPage />,
        action: resetPasswordAction,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myOrders",
        element: (
          <ProtectedRoute>
            <MyOrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
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
