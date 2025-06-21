import Header from "../components/HomePage/Header";
import FeaturedProducts from "../components/HomePage/FeaturedProducts";
import ShopByCategory from "../components/HomePage/ShopByCategory";
import FollowOnInstagram from "../components/HomePage/FollowOnInstagram";
import Feedback from "../components/HomePage/Feedback";
import Blog from "../components/HomePage/Blog";
import FeatureSection from "../components/HomePage/FeatureSection";

function HomePage() {
  return (
    <>
      <Header />
      <FeaturedProducts />
      <ShopByCategory />
      <Feedback />
      <FollowOnInstagram />
      <FeatureSection />
      <Blog />
    </>
  );
}

export default HomePage;
