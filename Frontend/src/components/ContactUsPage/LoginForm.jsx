import React from "react";
import { Form, useNavigation } from "react-router-dom";

const labelClass = "mb-1 ml-1 text-[0.8rem] lg:text-[1.08rem]";
const inputClass =
  "w-full px-[6px] py-[3px] lg:px-[12px] lg:py-[8px] mb-3 rounded border border-gray-300 text-[14px] lg:text-[16px]";

const fields = [
  {
    label: "Name:",
    name: "username",
    type: "text",
    placeholder: "Enter your name here",
  },
  {
    label: "Email:",
    name: "email",
    type: "email",
    placeholder: "Enter your email here",
  },
  {
    label: "Contact Number:",
    name: "contactNumber",
    type: "tel",
    placeholder: "123-456-7890",
    pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
  },
];

const LoginForm = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className="flex flex-col w-full">
      {fields.map(({ label, name, type, placeholder, pattern }) => (
        <div key={name}>
          <label htmlFor={name} className={labelClass}>
            {label}
          </label>
          <input
            required
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            pattern={pattern}
            className={inputClass}
          />
        </div>
      ))}

      <label htmlFor="message" className={labelClass}>
        Your Message:
      </label>
      <textarea
        required
        id="message"
        name="message"
        placeholder="Enter your message here..."
        rows="4"
        className={inputClass}
      ></textarea>

      <div className="w-fit px-3 py-1 rounded-lg mt-1 text-xs md:text-md lg:text-lg mb-[8px] lg:mb-[15px] bg-[#659e69] hover:bg-[#499a4e] ml-auto">
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-white no-underline bg-transparent border-none cursor-pointer"
        >
          {isSubmitting ? "Sending message..." : "Send Message"}
        </button>
      </div>
    </Form>
  );
};

export default LoginForm;
