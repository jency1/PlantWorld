import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// CLIENT

import HomePage from "./pages/CLIENT/HomePage";

import ShopPageLayout from "./pages/CLIENT/shop/ShopPageLayout";
import DescriptionLayout from "./pages/CLIENT/shop/DescriptionLayout";

import Contact from "./pages/CLIENT/Contact";
import contactFormAction from "./actions/contactFormAction";

import AboutUs from "./pages/CLIENT/AboutUs";
import FAQs from "./pages/CLIENT/FAQs";
import BlogPage from "./pages/CLIENT/BlogPage";

import LoginPage from "./pages/CLIENT/login/LoginPage";
import loginAction from "./actions/loginAction";
import ResetPasswordPage from "./pages/CLIENT/login/ResetPasswordPage";
import resetPasswordAction from "./actions/resetPasswordAction";

import CartPage from "./pages/CLIENT/cart and order/CartPage";
import OrderSuccessPage from "./pages/CLIENT/cart and order/OrderSuccessPage";
import AddressFormPage from "./pages/CLIENT/cart and order/AddressFormPage";

import ProfilePage from "./pages/CLIENT/user/ProfilePage";
import MyOrdersPage from "./pages/CLIENT/user/MyOrdersPage";
import SettingsPage from "./pages/CLIENT/user/SettingsPage";

import AppLayout from "./pages/CLIENT/AppLayout";
import ScrollToTop from "./ScrollToTop";

import { AuthProvider } from "./context/CLIENT/AuthContext";
import { CartProvider } from "./context/CLIENT/CartContext";
import { OrderProvider } from "./context/CLIENT/OrderContext";
import { PlantContextProvider } from "./context/CLIENT/PlantsContext";
import ProtectedRoute from "./ProtectedRoute";

import { NotificationProvider } from "./context/NotificationContext";

// ADMIN

import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminLayout from "./pages/ADMIN/AdminLayout";

import AdminLoginPage from "./pages/ADMIN/AdminLoginPage";
import AdminDashboard from "./pages/ADMIN/AdminDashboard";
import ManagePlants from "./pages/ADMIN/ManagePlants";
import ManageUsers from "./pages/ADMIN/ManageUsers";
import ManageOrders from "./pages/ADMIN/ManageOrders";
import ManageFaqs from "./pages/ADMIN/ManageFaqs";

import { AdminAuthProvider } from "./context/ADMIN/AdminAuthContext";

const router = createBrowserRouter([
  {
    // USER
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

  // ADMIN
  {
    path: "/admin/login",
    element: (
      <>
        <ScrollToTop />
        <NotificationProvider>
          <AdminAuthProvider>
            <AdminLoginPage />
          </AdminAuthProvider>
        </NotificationProvider>
      </>
    ),
    action: loginAction,
  },
  {
    path: "/admin",
    element: (
      <>
        <ScrollToTop />
        <NotificationProvider>
          <AdminAuthProvider>
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          </AdminAuthProvider>
        </NotificationProvider>
      </>
    ),
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "plants", element: <ManagePlants /> },
      { path: "users", element: <ManageUsers /> },
      { path: "orders", element: <ManageOrders /> },
      { path: "faqs", element: <ManageFaqs /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;
