import React from "react";

const FAQItem = ({ faq, index, expandedIndex, toggleFAQ }) => {
  return (
    <div className="mb-6 border rounded-lg overflow-hidden">
      <button
        className="w-full text-left p-4 bg-gray-100 flex items-center justify-between"
        onClick={() => toggleFAQ(index)}
      >
        <span className="font-medium">{faq.question}</span>
        <span className="text-gray-600">
          {expandedIndex === index ? "-" : "+"}
        </span>
      </button>
      {expandedIndex === index && (
        <div className="p-4 bg-white text-gray-800">{faq.answer}</div>
      )}
    </div>
  );
};

export default FAQItem;
