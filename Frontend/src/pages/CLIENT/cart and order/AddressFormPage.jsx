import React, { useContext } from "react";
import { Form } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

import { OrderContext } from "../../../context/CLIENT/OrderContext";
import { NotificationContext } from "../../../context/NotificationContext";

const labelClass = "mb-1 ml-1 text-[0.8rem] lg:text-[1.08rem]";
const inputClass =
  "text-success w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-2 rounded border border-gray-300 text-[0.7rem] lg:text-[1rem] focus:border-green-500 focus:outline-none";

const gridRow = "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 md:gap-y-3";

const AddressFormPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);
  const { checkoutHandler } = useContext(OrderContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "mobile",
      "addressLine1",
      "addressLine2",
      "area",
      "city",
      "state",
      "pincode",
    ];

    const missingFields = requiredFields.filter(
      (field) => !data[field]?.trim()
    );

    if (missingFields.length > 0) {
      showNotification(
        "Please fill all shipping details before proceeding.",
        "warning"
      );
      return;
    }

    if (!/^\d{6}$/.test(data.pincode)) {
      showNotification("Please enter a valid 6-digit pincode.", "warning");
      return;
    }

    await checkoutHandler(data);
  };

  return (
    <div className="relative flex justify-center items-center bg-[#ecffed]">
      <div className="flex flex-col w-[90%] md:w-[80%] max-w-[1200px] bg-white/80 rounded-[10px] shadow-lg mt-10 md:mt-12 mb-5 p-6 lg:p-10">
        <h2 className="text-success font-bold text-2xl md:text-3xl text-center mb-8 font-serif">
          Shipping Details
        </h2>

        <Form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name + Last Name */}
          <div className={gridRow}>
            <div>
              <label className={labelClass}>First Name</label>
              <input
                required
                name="firstName"
                placeholder="John"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input
                required
                name="lastName"
                placeholder="Doe"
                className={inputClass}
              />
            </div>
          </div>

          {/* Email + Mobile */}
          <div className={gridRow}>
            <div>
              <label className={labelClass}>Email</label>
              <input
                required
                type="email"
                name="email"
                placeholder="abc@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Mobile Number</label>
              <input
                required
                name="mobile"
                placeholder="0123456789"
                className={inputClass}
              />
            </div>
          </div>

          {/* Address Line 1 + Address Line 2 */}
          <div className={gridRow}>
            <div>
              <label className={labelClass}>Address Line 1</label>
              <input
                required
                name="addressLine1"
                placeholder="House No, Street"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Address Line 2</label>
              <input
                name="addressLine2"
                placeholder="Optional"
                className={inputClass}
              />
            </div>
          </div>

          {/* Area + City */}
          <div className={gridRow}>
            <div>
              <label className={labelClass}>Area</label>
              <input
                required
                name="area"
                placeholder="Area/Locality"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input
                required
                name="city"
                placeholder="City"
                className={inputClass}
              />
            </div>
          </div>

          {/* State + Pincode */}
          <div className={gridRow}>
            <div>
              <label className={labelClass}>State</label>
              <input
                required
                name="state"
                placeholder="State"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Pincode</label>
              <input
                required
                name="pincode"
                placeholder="400001"
                className={inputClass}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => navigate("/cart")}
              type="button"
              className="text-xs md:text-lg flex items-center gap-1 text-md text-success hover:text-[#3b8f44] underline transform transition duration-300 hover:scale-105"
            >
              <IoIosArrowRoundBack className="text-[1.2rem] md:text-[1.7rem]" />
              <span>Back to Cart</span>
            </button>

            <button
              type="submit"
              className="btn btn-success text-white text-xs md:text-base lg:text-md rounded-md transform transition duration-300 hover:scale-105 cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddressFormPage;
