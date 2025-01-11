import { useState } from "react";
import styles from "./Feedback.module.css";

import { FaArrowRight, FaArrowLeft, FaQuoteRight } from "react-icons/fa";

const feedbacks = [
  {
    image: "/Feedback/testimonial3.jpg",
    content:
      "The plants I ordered have transformed my living space. They arrived perfectly packaged and in great condition. It's clear that the team really cares about plant health, and their website has tons of helpful care tips. I'll definitely be back for more!",
    name: "Sarah Patel",
    rating: 5,
    occupation: "Owner, Maceba Restaurant ",
  },
  {
    image: "/Feedback/testimonial2.jpeg",
    content:
      "Great selection of plants! My monstera arrived with a slight bend, but the team guided me on how to care for it, and it's thriving now. The only reason I'm not giving 5 stars is that I wish the packaging was a bit more eco-friendly. Overall, a fantastic experience!",
    name: "Dhyey Dave",
    rating: 4,
    occupation: "Owner, BSN Cafe",
  },
  {
    image: "/Feedback/testimonial1.jpg",
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
    <div className={`container ${styles["testimonial-container"]}`}>
      <div className="h1 mt-5 text-success text-center">
        Our Customer Feedback
      </div>
      <div className="row justify-content-center">
        <div className="mt-3 col-9">
          <div className={`${styles["testimonial-card"]} position-relative`}>
            <div
              className={`${styles["testimonial-arrow"]} ${styles["left-arrow"]}`}
              onClick={handleLeftClick}
            >
              <FaArrowLeft />
            </div>

            <div className="container">
              <div className={`${styles["testimonial-content"]} d-flex`}>
                <div className={`${styles["testimonial-image"]} `}>
                  <img
                    src={feedbacks[current].image}
                    className="img-fluid rounded-circle"
                    alt="Customer"
                  />
                  <div
                    className={`${styles["quote"]}`}
                    onClick={handleRightClick}
                  >
                    <FaQuoteRight />
                  </div>
                </div>
                <div className={`ml-4 ${styles["testimonial-text"]}`}>
                  <div
                    className={`${styles["testimonial-rating"]} d-flex align-items-center`}
                  >
                    <span
                      className={`${styles["stars"]} ${
                        1 <= feedbacks[current].rating
                          ? styles.filled
                          : styles["not-filled"]
                      }`}
                    >
                      ★
                    </span>
                    <span
                      className={`${styles["stars"]} ${
                        2 <= feedbacks[current].rating
                          ? styles.filled
                          : styles["not-filled"]
                      }`}
                    >
                      ★
                    </span>
                    <span
                      className={`${styles["stars"]} ${
                        3 <= feedbacks[current].rating
                          ? styles.filled
                          : styles["not-filled"]
                      }`}
                    >
                      ★
                    </span>
                    <span
                      className={`${styles["stars"]} ${
                        4 <= feedbacks[current].rating
                          ? styles.filled
                          : styles["not-filled"]
                      }`}
                    >
                      ★
                    </span>
                    <span
                      className={`${styles["stars"]} ${
                        5 <= feedbacks[current].rating
                          ? styles.filled
                          : styles["not-filled"]
                      }`}
                    >
                      ★
                    </span>
                    <span className={`${styles["rating-value"]} ml-2`}>
                      {feedbacks[current].rating}.0
                    </span>
                  </div>
                  <p className={`${styles["testimonial-quote"]}`}>
                    {feedbacks[current].content}
                  </p>
                  <div className={`${styles["testimonial-name"]}`}>
                    {feedbacks[current].name}
                  </div>
                  <p className={`${styles["testimonial-title"]}`}>
                    {feedbacks[current].occupation}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`${styles["testimonial-arrow"]} ${styles["right-arrow"]}`}
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
