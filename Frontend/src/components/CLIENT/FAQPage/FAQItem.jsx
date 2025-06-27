import React, { useRef, useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQItem = ({ faq, index, expandedIndex, toggleFAQ }) => {
  const isOpen = expandedIndex === index;
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden transition-all duration-300">
      <button
        onClick={() => toggleFAQ(index)}
        className="w-full p-4 bg-gray-100 flex items-center justify-between focus:outline-none"
      >
        <span className="font-medium text-sm md:text-base text-left">
          {faq.question}
        </span>
        <span className="text-gray-500 text-lg">
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: `${height}px`,
        }}
      >
        <div className="px-4 py-3 text-sm md:text-base text-gray-700 bg-white">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
