import Navbar from "../Navbar/Navbar";
import ShopHeader from "./ShopHeader";
import ShopPlants from "./ShopPlants";
import FeatureSection from "../HomePage/FeatureSection";
// import Footer from "../Footer/Footer";

function ShopPageLayout() {
  return (
    <div>
      <Navbar />
      <ShopHeader />
      <ShopPlants />
      <FeatureSection />
      {/* <Footer /> */}
    </div>
  );
}

export default ShopPageLayout;
