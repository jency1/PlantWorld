import Navbar from "../Navbar/Navbar";
import Header from "./Header";
import FeaturedProducts from "./FeaturedProducts";
import ShopByCategory from "./ShopByCategory";
import FollowOnInstagram from "./FollowOnInstagram";
import Feedback from "./Feedback";
import Blog from "./Blog";
import FeatureSection from "./FeatureSection";

// import LoginPage from "./LoginPage";

import DescriptionLayout from "../ProductDescription/DescriptionLayout";

import ShopPageLayout from "../ShopPage/ShopPageLayout";

function HomePage() {
  return (
    <>
      <Navbar />
      <Header />
      <FeaturedProducts />
      <ShopByCategory />
      <Feedback />
      <FollowOnInstagram />
      <FeatureSection />
      <Blog />

      {/* <DescriptionLayout /> */}

      {/* <ShopPageLayout /> */}

      {/* <br />
      <LoginPage /> */}
    </>
  );
}

export default HomePage;
