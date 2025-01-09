// import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import HomePage from "./HomePage/HomePage";
import ShopPageLayout from "./ShopPage/ShopPageLayout";
import DescriptionLayout from "./ProductDescription/DescriptionLayout";
import LoginPage from "./LoginPage/LoginPage";
import AppLayout from "./AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
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
        path: "/product/description",
        element: <DescriptionLayout />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

// function App() {
//   return (
//     <>
//       {/* <Navbar /> */}
//       <HomePage />
//       {/* <ShopPageLayout /> */}
//       {/* <DescriptionLayout /> */}
//       {/* <LoginPage /> */}
//       {/* <LP /> */}
//     </>
//   );
// }

export default App;
