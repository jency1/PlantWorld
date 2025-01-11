import Header from "../components/HomePage/Header";
import FeaturedProducts from "../components/HomePage/FeaturedProducts";
import ShopByCategory from "../components/HomePage/ShopByCategory";
import FollowOnInstagram from "../components/HomePage/FollowOnInstagram";
import Feedback from "../components/HomePage/Feedback";
import Blog from "../components/HomePage/Blog";
import FeatureSection from "../components/HomePage/FeatureSection";

// import DescriptionLayout from "../ProductDescription/DescriptionLayout";
// import ShopPageLayout from "../ShopPage/ShopPageLayout";
// import LoginPage from "../LoginPage/LoginPage";

function HomePage() {
  return (
    <>
      {/* <Navbar /> */}
      <Header />
      <FeaturedProducts />
      <ShopByCategory />
      <Feedback />
      <FollowOnInstagram />
      <FeatureSection />
      <Blog />
      {/* <Footer /> */}
    </>
  );
}

export default HomePage;
