import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ShopPageLayout from "./pages/ShopPageLayout";
import DescriptionLayout from "./pages/DescriptionLayout";
import LoginPage from "./pages/LoginPage";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import FAQs from "./pages/FAQs";
import BlogPage from "./pages/BlogPage";
import ScrollToTop from "./ScrollToTop";
import AppLayout from "./AppLayout";
import Payment from "./components/Payment/Payment";
import { PlantContextProvider } from "./context/PlantsContext.jsx";

const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollToTop />
        <PlantContextProvider>
          <AppLayout />
        </PlantContextProvider>
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
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/product/description",
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
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/payment",
    element: <Payment />,
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
