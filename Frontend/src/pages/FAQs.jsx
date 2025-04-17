import React, { useState } from "react";
import faqs from "../components/FAQPage/FAQData";
import FAQImage from "../components/FAQPage/FAQImage";
import FAQItem from "../components/FAQPage/FAQItem";

export default function FAQs() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-success font-bold tracking-tight text-center mb-16">
          Frequently Asked Questions
        </h2>

        <div className="md:flex md:space-x-16">
          {faqs[0].image && (
            <FAQImage image={faqs[0].image} alt={faqs[0].question} />
          )}
          <div className={faqs[0].image ? "md:w-2/3" : "w-full"}>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                expandedIndex={expandedIndex}
                toggleFAQ={toggleFAQ}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
