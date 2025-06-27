import React, { useState } from "react";
import OrderHeader from "./OrderHeader";
import OrderTracking from "./OrderTracking";
import OrderItems from "./OrderItems";
import CancelOrder from "./CancelOrder";

export default function OrderCard({ order, onCancelSuccess }) {
  const {
    _id,
    orderTotal,
    items,
    status,
    createdAt,
    paymentId,
    expectedDelivery,
  } = order;

  const [openDialog, setOpenDialog] = useState(false);

  const latestStage = status?.length > 0 ? status[status.length - 1].stage : 0;
  const isCancellable =
    latestStage !== "Order Delivered" && latestStage !== "Order Cancelled";

  return (
    <div className="bg-white border border-green-200 rounded-lg mb-6 p-6 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
      <OrderHeader
        orderId={_id}
        paymentId={paymentId}
        createdAt={createdAt}
        expectedDelivery={expectedDelivery}
      />

      <OrderTracking status={status} />

      <OrderItems items={items} />

      <div className="flex justify-between items-center mt-4">
        {/* Total */}
        <div className="text-sm md:text-lg font-semibold text-green-700">
          Total: ₹{orderTotal}
        </div>

        {/* Cancel */}
        {isCancellable && (
          <>
            <button
              onClick={() => setOpenDialog(true)}
              className="text-xs lg:text-sm md:text-sm bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded transition duration-300"
            >
              Cancel Order
            </button>

            <CancelOrder
              orderId={_id}
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              onCancelSuccess={onCancelSuccess}
            />
          </>
        )}
      </div>
    </div>
  );
}
