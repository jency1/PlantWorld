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
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-3xl lg:text-4xl text-success font-bold text-center mb-12 font-serif">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-10">
          {faqs[0]?.image && (
            <FAQImage image={faqs[0].image} alt={faqs[0].question} />
          )}

          <div className={faqs[0]?.image ? "md:w-2/3 w-full" : "w-full"}>
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
