import ProductDescription from "../components/ProductDescription/ProductDescription";
import SimilarProducts from "../components/ProductDescription/SimilarProducts";
import FeatureSection from "../components/HomePage/FeatureSection";
import { useParams } from "react-router-dom";

function DescriptionLayout() {
  const { plantId } = useParams();

  return (
    <div>
      <ProductDescription plantId={plantId} />
      <SimilarProducts />
      <FeatureSection />
    </div>
  );
}

export default DescriptionLayout;
