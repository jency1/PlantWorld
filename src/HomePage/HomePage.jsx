import Navbar from "../Navbar/Navbar";
import Header from "./Header";
import FeaturedProducts from "./FeaturedProducts";
import ShopByCategory from "./ShopByCategory";
import FollowOnInstagram from "./FollowOnInstagram";
import Feedback from "./Feedback";
import Blog from "./Blog";
import FeatureSection from "./FeatureSection";
import Footer from "../Footer/Footer";

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
