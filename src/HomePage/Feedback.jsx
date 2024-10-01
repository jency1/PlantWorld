import { useState } from "react";
import "./Feedback.css";
import { FaArrowRight, FaArrowLeft, FaQuoteRight } from "react-icons/fa";

const feedbacks = [
  {
    image: "/public/Feedback/testimonial3.jpg",
    content:
      "The plants I ordered have transformed my living space. They arrived perfectly packaged and in great condition. It's clear that the team really cares about plant health, and their website has tons of helpful care tips. I'll definitely be back for more!",
    name: "Sarah Patel",
    rating: 5,
    occupation: "Owner, Maceba Restaurant ",
  },
  {
    image: "/public/Feedback/testimonial2.jpeg",
    content:
      "Great selection of plants! My monstera arrived with a slight bend, but the team guided me on how to care for it, and it's thriving now. The only reason I'm not giving 5 stars is that I wish the packaging was a bit more eco-friendly. Overall, a fantastic experience!",
    name: "Dhyey Dave",
    rating: 4,
    occupation: "Owner, BSN Cafe",
  },
  {
    image: "/public/Feedback/testimonial1.jpg",
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
    console.log(current);
    if (current == 0) {
      setCurrent(feedbacks.length - 1);
    } else {
      setCurrent(current - 1);
    }
  }

  function handleRightClick() {
    console.log(current);
    if (current == feedbacks.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  }

  return (
    <div className="container testimonial-container">
      <div className="h1 mt-5 text-success text-center">
        Our Customer Feedback
      </div>
      <div className="row justify-content-center">
        <div className="mt-3 w-75">
          <div className="testimonial-card position-relative">
            <div
              className="testimonial-arrow left-arrow"
              onClick={handleLeftClick}
            >
              <FaArrowLeft />
            </div>

            <div className="testimonial-content d-flex">
              <div className="testimonial-image">
                <img
                  src={feedbacks[current].image}
                  className="img-fluid rounded-circle"
                  alt="Customer"
                />
                <div className="quote" onClick={handleRightClick}>
                  <FaQuoteRight />
                </div>
              </div>
              <div className="ml-4 testimonial-text">
                <div className="testimonial-rating d-flex align-items-center">
                  <span
                    className={`stars ${
                      1 <= feedbacks[current].rating ? "filled" : "not-filled"
                    }`}
                  >
                    ★
                  </span>
                  <span
                    className={`stars ${
                      2 <= feedbacks[current].rating ? "filled" : "not-filled"
                    }`}
                  >
                    ★
                  </span>
                  <span
                    className={`stars ${
                      3 <= feedbacks[current].rating ? "filled" : "not-filled"
                    }`}
                  >
                    ★
                  </span>
                  <span
                    className={`stars ${
                      4 <= feedbacks[current].rating ? "filled" : "not-filled"
                    }`}
                  >
                    ★
                  </span>
                  <span
                    className={`stars ${
                      5 <= feedbacks[current].rating ? "filled" : "not-filled"
                    }`}
                  >
                    ★
                  </span>
                  <span className="rating-value ml-2">
                    {feedbacks[current].rating}.0
                  </span>
                </div>
                <p className="testimonial-quote">
                  {feedbacks[current].content}
                </p>
                <div className="testimonial-name">
                  {feedbacks[current].name}
                </div>
                <p className="testimonial-title">
                  {feedbacks[current].occupation}
                </p>
              </div>
            </div>

            <div
              className="testimonial-arrow right-arrow"
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
