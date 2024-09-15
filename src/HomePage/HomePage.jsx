import Navbar from "../Navbar/Navbar";
import Header from "./Header";
import FeaturedProducts from "./FeaturedProducts";
import ShopByCategory from "./ShopByCategory";
import FollowOnInstagram from "./FollowOnInstagram";

function HomePage() {
  return (
    <>
      <Navbar />
      <Header />
      <FeaturedProducts />
      <ShopByCategory />
      <FollowOnInstagram />
    </>
  );
}

export default HomePage;
