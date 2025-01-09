import Navbar from "../Navbar/Navbar";
import ProductDescription from "./ProductDescription";
import SimilarProducts from "./SimilarProducts";
import FeatureSection from "../HomePage/FeatureSection";
import Footer from "../Footer/Footer";

function DescriptionLayout() {
  return (
    <div>
      {/* <Navbar /> */}
      <ProductDescription />
      <SimilarProducts />
      <FeatureSection />
      {/* <Footer /> */}
    </div>
  );
}

export default DescriptionLayout;
