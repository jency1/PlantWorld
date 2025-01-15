import React, { useState } from 'react';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: 'Propagation methods using cuttings?',
      answer:
        'Propagation using cuttings is a popular method for reproducing plants, including trees, by taking a piece of the parent plant and encouraging it to grow into a new plant. This technique is widely used because it can produce new plants faster and maintain the characteristics of the parent plant.',
      image: '/public/FAQs/image.jpg', 
    },
    {
      question: 'How often should I water my plants?',
      answer: 'Watering frequency depends on the plant type, environment, and season. Generally, check the soil moisture before watering.',
    },
    {
      question: 'Best location for indoor plants to thrive?',
      answer: 'Most indoor plants prefer bright, indirect light. Avoid direct sunlight and drafts.',
    },
    {
      question: 'Effective ways to control plant pests?',
      answer: 'Regularly inspect your plants, use insecticidal soap or neem oil, and provide good air circulation.',
    },
    {
      question: 'Plants suitable for low-light indoor spaces?',
      answer: 'Snake plants, ZZ plants, and cast iron plants are known to tolerate low-light conditions.',
    },
  ];

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-grey-900 text-center mb-16">
          Frequently Asked Questions
        </h2>

        <div className="md:flex md:space-x-16"> 
          {faqs[0].image && ( 
            <div className="md:w-1/3 mb-8 md:mb-0">
              <img src={faqs[0].image} alt={faqs[0].question} className="rounded-lg shadow-lg w-full" />
            </div>
          )}
          <div className={faqs[0].image ? "md:w-2/3" : "w-full"}> 
            {faqs.map((faq, index) => (
              <div key={index} className="mb-6 border rounded-lg overflow-hidden">
                <button
                  className="w-full text-left p-4 bg-gray-100 flex items-center justify-between"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <span className="text-gray-600">
                    {expandedIndex === index ? '-' : '+'}
                  </span>
                </button>
                {expandedIndex === index && (
                  <div className="p-4 bg-white text-gray-800">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;