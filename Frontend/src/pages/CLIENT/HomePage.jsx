import Header from "../../components/CLIENT/HomePage/Header";
import FeaturedProducts from "../../components/CLIENT/HomePage/FeaturedProducts";
import ShopByCategory from "../../components/CLIENT/HomePage/ShopByCategory";
import FollowOnInstagram from "../../components/CLIENT/HomePage/FollowOnInstagram";
import Feedback from "../../components/CLIENT/HomePage/Feedback";
import Blog from "../../components/CLIENT/HomePage/Blog";
import FeatureSection from "../../components/CLIENT/HomePage/FeatureSection";

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
