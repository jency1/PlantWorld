import { useState } from "react";
import { FaArrowRight, FaArrowLeft, FaQuoteRight } from "react-icons/fa";

const feedbacks = [
  {
    image: "/frontend/Feedback/testimonial3.jpg",
    content:
      "The plants I ordered have transformed my living space. They arrived perfectly packaged and in great condition. It's clear that the team really cares about plant health, and their website has tons of helpful care tips. I'll definitely be back for more!",
    name: "Sarah Patel",
    rating: 5,
    occupation: "Owner, Maceba Restaurant",
  },
  {
    image: "/frontend/Feedback/testimonial2.jpeg",
    content:
      "Great selection of plants! My monstera arrived with a slight bend, but the team guided me on how to care for it, and it's thriving now. The only reason I'm not giving 5 stars is that I wish the packaging was a bit more eco-friendly. Overall, a fantastic experience!",
    name: "Dhyey Dave",
    rating: 4,
    occupation: "Owner, BSN Cafe",
  },
  {
    image: "/frontend/Feedback/testimonial1.jpg",
    content:
      "I can't believe how much life these plants have brought to my home! The quality is exceptional, and the delivery was quick and seamless. I've bought plants from several places before, but nothing compares to the health and vibrancy of the ones from here. Highly recommended!",
    name: "Dianne Russell",
    rating: 5,
    occupation: "Owner, Architecture Studio",
  },
];

function Feedback() {
  const [current, setCurrent] = useState(0);

  function handleLeftClick() {
    setCurrent(current === 0 ? feedbacks.length - 1 : current - 1);
  }

  function handleRightClick() {
    setCurrent(current === feedbacks.length - 1 ? 0 : current + 1);
  }

  return (
    <div className="container px-5 py-5">
      <div className="lg:mt-4 mb-4 text-success font-serif font-bold text-2xl md:text-3xl lg:text-4xl text-center">
        Our Customer Feedback
      </div>
      <div className="row justify-content-center">
        <div className="mt-3 lg:w-2/3">
          <div className="rounded-lg shadow-lg flex flex-col md:flex-row items-center p-4 md:p-10 bg-gray-100 relative">
            <div
              className="bg-green-700 text-white rounded-full w-7 h-7 md:w-10 md:h-10 flex items-center justify-center text-lg cursor-pointer absolute top-1/2 transform -translate-y-1/2 left-[-10px] md:left-[-20px]"
              onClick={handleLeftClick}
            >
              <FaArrowLeft />
            </div>

            <div className="flex flex-col md:flex-row items-center w-full">
              <div className="relative w-36 sm:w-44 md:w-48">
                <img
                  src={feedbacks[current].image}
                  className="w-28 sm:w-44 md:w-48 h-28 sm:h-44 md:h-48 rounded-full object-cover"
                  alt="Customer"
                />
                <div
                  className="bg-green-700 text-white rounded-full w-8 sm:w-12 h-8 sm:h-12 flex items-center justify-center text-sm sm:text-lg cursor-pointer absolute top-[-3%] right-[23%] sm:top-[-4%] sm:right-[10%]"
                  onClick={handleRightClick}
                >
                  <FaQuoteRight />
                </div>
              </div>
              <div className="mt-2 md:mt-0 md:ml-5 text-left w-full md:w-3/4">
                <div className="flex items-center justify-center md:justify-start">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg sm:text-2xl ${
                        i < feedbacks[current].rating
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm sm:text-lg ml-2">
                    {feedbacks[current].rating}.0
                  </span>
                </div>
                <p className="italic my-2 text-xs sm:text-base">
                  {feedbacks[current].content}
                </p>
                <div className="font-bold text-sm sm:text-lg">
                  {feedbacks[current].name}
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {feedbacks[current].occupation}
                </p>
              </div>
            </div>

            <div
              className="bg-green-700 text-white rounded-full w-7 h-7 md:w-10 md:h-10 flex items-center justify-center text-lg cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-[-10px] md:right-[-20px]"
              onClick={handleRightClick}
            >
              <FaArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
