import React from "react";
import ImageOnlyFeature from "./ImageOnlyFeature";
import TextCardFeature from "./TextCardFeature";

export default function AboutFeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
      <ImageOnlyFeature
        imageSrc="/frontend/AboutUS/image1.jpg"
        altText="Friendly and fast support"
      />

      <TextCardFeature
        imageSrc="/frontend/AboutUS/image2.png"
        altText="Organic and seed grown plants"
        title="Organic and seed grown plants"
        description="We offer organic and seed-grown plants, ensuring eco-friendly,
        chemical-free options for sustainable, healthy gardening."
      />

      <ImageOnlyFeature
        imageSrc="/frontend/AboutUS/image3.jpg"
        altText="Friendly and fast support"
      />

      <TextCardFeature
        imageSrc="/frontend/AboutUS/image4.png"
        altText="Friendly and fast support"
        title="Friendly and fast support"
        description="We provide friendly and fast support, ensuring your questions
        are answered quickly with helpful, knowledgeable assistance
        every time."
      />

      <ImageOnlyFeature
        imageSrc="/frontend/AboutUS/image5.jpg"
        altText="Five plants you need in your life"
      />

      <TextCardFeature
        imageSrc="/frontend/AboutUS/image6.png"
        altText="Expert Guidance"
        title="Expert Guidance & Resources"
        description="We offer expert guidance to help you choose, care for, and grow
        your plants successfully, every step."
      />
    </div>
  );
}
