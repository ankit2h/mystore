import React, { useEffect } from "react";
import useOrderStore from "../store/useOrderStore";

const Orders = () => {
  const { orders, loading, getOrderDetails } = useOrderStore();

  useEffect(() => {
    getOrderDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#eaeded] py-12">
      <div className="mx-auto w-[95%] md:w-[80%] lg:w-[60%]">
        <h1 className="text-3xl font-semibold mb-10 text-[#111] tracking-tight border-b border-gray-300 pb-4">Your Orders</h1>
        {loading ? (
          <div className="text-center py-8 text-lg text-[#111]">Loading your orders...</div>
        ) : orders && orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg mb-10 p-6 shadow-lg bg-white hover:shadow-xl transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <div className="text-xs text-gray-500">
                  <span className="font-semibold text-[#111]">Order ID:</span> {order._id}
                </div>
                <div className="text-xs text-gray-500">
                  <span className="font-semibold text-[#111]">Placed on:</span> {new Date(order.createdAt).toLocaleString()}
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-[#111]">Status:</span> <span className="text-blue-700 font-bold">{order.status}</span>
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-[#111]">Total:</span> <span className="text-[#B12704] font-bold">${order.totalAmount}</span>
                </div>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-[#111]">Delivery Address:</span>
                <div className="ml-2 text-sm text-gray-700">
                  {order.deliveryDetails?.name}, {order.deliveryDetails?.address}, {order.deliveryDetails?.city}, {order.deliveryDetails?.country} <br />
                  {order.deliveryDetails?.email}
                </div>
              </div>
              <div className="mt-4">
                <span className="font-semibold text-[#111]">Items:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                  {order.cartItems.map((item, idx) => (
                    <div key={item.itemId || idx} className="flex items-center border border-gray-200 p-3 rounded bg-[#f7f7fa] hover:bg-[#fffbe6] transition">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={70}
                        height={70}
                        className="rounded shadow-sm border border-gray-100 bg-white"
                      />
                      <div className="ml-4 flex-1">
                        <div className="font-semibold text-[#111] text-base leading-tight mb-1 line-clamp-2">{item.name}</div>
                        <div className="text-xs text-gray-600 mb-1">Qty: <span className="font-medium text-[#111]">{item.quantity}</span></div>
                        <div className="text-[#B12704] font-bold text-sm">${item.price}</div>
                        <div className="mt-1">
                          <span className="inline-block bg-[#ffd814] text-[#111] text-xs font-semibold px-2 py-0.5 rounded border border-[#fcd200]">Prime</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 text-lg">No orders found.</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
