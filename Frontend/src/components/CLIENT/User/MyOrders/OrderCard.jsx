import React, { useState } from "react";
import OrderHeader from "./OrderHeader";
import OrderTracking from "./OrderTracking";
import OrderItems from "./OrderItems";
import CancelOrder from "./CancelOrder";
import ReturnOrder from "./ReturnOrder";

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
  const [actionType, setActionType] = useState(null);

  const latestStage = status?.length > 0 ? status[status.length - 1].stage : "";
  const isDelivered = latestStage === "Order Delivered";
  const isCancellable = !isDelivered && latestStage !== "Order Cancelled";

  const handleOpen = (type) => {
    setActionType(type);
    setOpenDialog(true);
  };

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

      {/* Total price + action button */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm md:text-lg font-semibold text-green-700">
          Total: ₹{orderTotal}
        </div>

        {/* Cancel*/}
        {isCancellable && (
          <button
            onClick={() => handleOpen("cancel")}
            className="text-xs lg:text-sm md:text-sm bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded transition duration-300"
          >
            Cancel Order
          </button>
        )}

        {/* Return */}
        {isDelivered && (
          <button
            onClick={() => handleOpen("return")}
            className="text-xs lg:text-sm md:text-sm bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-2 px-3 rounded transition duration-300"
          >
            Return Order
          </button>
        )}
      </div>

      {/* Dialog Components */}
      {actionType === "cancel" && (
        <CancelOrder
          orderId={_id}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onCancelSuccess={onCancelSuccess}
        />
      )}

      {actionType === "return" && (
        <ReturnOrder open={openDialog} onClose={() => setOpenDialog(false)} />
      )}
    </div>
  );
}
