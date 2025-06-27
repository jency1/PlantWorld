import React from "react";
import { formatDateWithDay } from "../../../../utils/formatDate";

export default function OrderHeader({
  orderId,
  paymentId,
  createdAt,
  expectedDelivery,
}) {
  return (
    <div className="mb-4">
      <h3 className="text-sm md:text-base lg:text-lg font-semibold text-success mb-1">
        Order ID: {orderId}
      </h3>
      <div className="pt-2 text-xs md:text-sm text-gray-600 space-y-1">
        {paymentId && (
          <p>
            <span className="font-semibold pr-2">Payment ID:</span>
            {paymentId}
          </p>
        )}

        {createdAt && (
          <p>
            <span className="font-semibold pr-2">Order Placed On:</span>
            {formatDateWithDay(createdAt)}
          </p>
        )}

        {expectedDelivery && (
          <p>
            <span className="font-semibold pr-2">Expected Delivery:</span>
            {formatDateWithDay(expectedDelivery)}
          </p>
        )}
      </div>
    </div>
  );
}
