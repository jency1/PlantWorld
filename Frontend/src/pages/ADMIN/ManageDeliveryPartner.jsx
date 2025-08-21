import React, { useEffect, useContext } from "react";
import { Form, useActionData } from "react-router-dom";
import { NotificationContext } from "../../context/NotificationContext";

const ManageDeliveryPartner = () => {
  const actionData = useActionData();
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (actionData) {
      showNotification(
        actionData.success || actionData.error,
        actionData.success ? "success" : "error"
      );
    }
  }, [actionData]);

  return (
    <div className="max-w-lg p-6 m-6">
      <Form method="post" className="space-y-4">
        {/* Full Name */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label className="sm:w-1/3 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            required
            className="w-full sm:w-2/3 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label className="sm:w-1/3 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            required
            className="w-full sm:w-2/3 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label className="sm:w-1/3 font-medium">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter phone number"
            required
            className="w-full sm:w-2/3 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 p-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
        >
          Add Delivery Partner
        </button>
      </Form>
    </div>
  );
};

export default ManageDeliveryPartner;
