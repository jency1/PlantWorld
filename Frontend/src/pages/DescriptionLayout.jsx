import ProductDescription from "../components/ProductDescription/ProductDescription";
import SimilarProducts from "../components/ProductDescription/SimilarProducts";
import FeatureSection from "../components/HomePage/FeatureSection";

function DescriptionLayout() {
  return (
    <div>
      <ProductDescription />
      <SimilarProducts />
      <FeatureSection />
    </div>
  );
}

export default DescriptionLayout;
