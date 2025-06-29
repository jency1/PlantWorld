import React, { useContext, useEffect, useState } from "react";

import { FaqContext } from "../../context/FaqContext";

import LoadingSpinner from "../../ui/LoadingSpinner";
import FaqAccordionList from "../../ui/FaqAccordionList";

export default function FAQs() {
  const { faqs, fetchAllFaqs } = useContext(FaqContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      await fetchAllFaqs();
      setLoading(false);
    };

    fetchFaqs();
  }, []);

  return (
    <div className="bg-white py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl md:text-3xl lg:text-4xl text-success font-bold text-center mb-12 font-serif">
        Frequently Asked Questions
      </h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:space-x-10">
          <div className={faqs[0]?.image ? "md:w-2/3 w-full" : "w-full"}>
            <FaqAccordionList faqs={faqs} />
          </div>
        </div>
      )}
    </div>
  );
}
