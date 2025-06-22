import React from "react";

export default function OrderItems({ items }) {
  if (!items?.length) return null;

  return (
    <div className="mb-3">
      <h4 className="text-sm md:text-base font-semibold mb-3 text-gray-800">
        Items:
      </h4>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
        {items.map((item) => {
          const plant = item.plantId;
          return (
            <li
              key={item._id}
              className="flex items-center gap-4 border-b pb-2 "
            >
              <img
                src={plant.imageCover}
                alt={plant.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium lg:text-base">{plant.name}</p>
                <p className="text-gray-500 text-sm lg:text-base">
                  Quantity: {item.quantity} × ₹{item.price}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
