import Navbar from "../Navbar/Navbar";
import Header from "./Header";
import FeaturedProducts from "./FeaturedProducts";
import ShopByCategory from "./ShopByCategory";
import FollowOnInstagram from "./FollowOnInstagram";
import Feedback from "./Feedback";
import Blog from "./Blog";
import LoginPage from "./LoginPage";

function HomePage() {
  return (
    <>
      <Navbar />
      <Header />
      <FeaturedProducts />
      <ShopByCategory />
      <Feedback />
      <FollowOnInstagram />
      <Blog />

      <br />
      <LoginPage />
    </>
  );
}

export default HomePage;
