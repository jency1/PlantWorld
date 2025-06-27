import { useParams } from "react-router-dom";

import ProductDescription from "../../../components/CLIENT/ProductDescription/ProductDescription";
import SimilarProducts from "../../../components/CLIENT/ProductDescription/SimilarProducts";
import FeatureSection from "../../../components/CLIENT/HomePage/FeatureSection";

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
