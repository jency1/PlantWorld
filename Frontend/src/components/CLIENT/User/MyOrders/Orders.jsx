import React, { useEffect, useState, useContext } from "react";

import OrderCard from "./OrderCard";
import EmptyOrdersMessage from "./EmptyOrdersMessage";

import LoadingSpinner from "../../../../ui/LoadingSpinner";
import { AuthContext } from "../../../../context/CLIENT/AuthContext";
import { NotificationContext } from "../../../../context/NotificationContext";

export default function Orders() {
  const { token } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/orders/myorders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch orders.");
      }

      setOrders(data.orders || []);
    } catch (err) {
      showNotification(
        "Something went wrong. Please try again later!",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      setLoading(true);
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="relative flex justify-center items-center bg-[#ecffed]">
      <div className="flex flex-col w-full lg:w-[80%] rounded-[10px] p-6 lg:p-10">
        <h2 className="text-success font-bold text-xl mt-3 md:text-3xl text-center mb-8 font-serif">
          My Orders
        </h2>

        {loading ? (
          <>
            {/* <p className="text-center text-gray-600">Loading your orders...</p> */}
            <LoadingSpinner />
          </>
        ) : orders.length === 0 ? (
          <EmptyOrdersMessage />
        ) : (
          [...orders]
            .reverse()
            .map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onCancelSuccess={fetchOrders}
              />
            ))
        )}
      </div>
    </div>
  );
}
