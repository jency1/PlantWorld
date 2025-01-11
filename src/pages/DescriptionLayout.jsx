import Navbar from "../components/Navbar/Navbar";
import ProductDescription from "../components/ProductDescription/ProductDescription";
import SimilarProducts from "../components/ProductDescription/SimilarProducts";
import FeatureSection from "../components/HomePage/FeatureSection";
import Footer from "../components/Footer/Footer";

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
