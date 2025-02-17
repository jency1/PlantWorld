import ShopHeader from "../components/ShopPage/ShopHeader";
import ShopPlants from "../components/ShopPage/ShopPlants";
import FeatureSection from "../components/HomePage/FeatureSection";

function ShopPageLayout() {
  return (
    <div>
      {/* <Navbar /> */}
      <ShopHeader />
      <ShopPlants />
      <FeatureSection />
      {/* <Footer /> */}
    </div>
  );
}

export default ShopPageLayout;
