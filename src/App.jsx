import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ShopPageLayout from "./pages/ShopPageLayout";
import DescriptionLayout from "./pages/DescriptionLayout";
import LoginPage from "./components/LoginPage/LoginPage";
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
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

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
