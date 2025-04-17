import React from "react";
import ImageOnlyFeature from "./ImageOnlyFeature";
import TextCardFeature from "./TextCardFeature";

export default function AboutFeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
      <ImageOnlyFeature
        imageSrc="/AboutUS/image1.jpg"
        altText="Friendly and fast support"
      />

      <TextCardFeature
        imageSrc="/AboutUS/image2.png"
        altText="Organic and seed grown plants"
        title="Organic and seed grown plants"
        description="we offer organic and seed-grown plants, ensuring eco-friendly,
        chemical-free options for sustainable, healthy gardening."
      />

      <ImageOnlyFeature
        imageSrc="/AboutUS/image3.jpg"
        altText="Friendly and fast support"
      />

      <TextCardFeature
        imageSrc="/AboutUS/image4.png"
        altText="Friendly and fast support"
        title="Friendly and fast support"
        description="we provide friendly and fast support, ensuring your questions
        are answered quickly with helpful, knowledgeable assistance
        every time."
      />

      <ImageOnlyFeature
        imageSrc="/AboutUS/image5.jpg"
        altText="Five plants you need in your life"
      />

      <TextCardFeature
        imageSrc="/AboutUS/image6.png"
        altText="Expert Guidance"
        title="Expert Guidance & Resources"
        description="we offer expert guidance to help you choose, care for, and grow
        your plants successfully, every step."
      />
    </div>
  );
}
