import Navbar from "../Navbar/Navbar";
import Header from "./Header";
import FeaturedProducts from "./FeaturedProducts";
import ShopByCategory from "./ShopByCategory";
import FollowOnInstagram from "./FollowOnInstagram";
import Feedback from "./Feedback";

function HomePage() {
  return (
    <>
      <Navbar />
      <Header />
      <FeaturedProducts />
      <ShopByCategory />
      <Feedback />
      <FollowOnInstagram />
    </>
  );
}

export default HomePage;
