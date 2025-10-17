import React, { useState } from "react";
import useCartStore from "../store/useCartStore";
import useUserStore from "../store/useUserStore";
import useOrderStore from "../store/useOrderStore";
import OrderSummary from "./OrderSummary";

const DeliveryAddress = () => {
  const cart = useCartStore((state) => state.cart);
  const user = useUserStore((state) => state.user);
  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  // Example: calculate totalPrice from cart
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  return (
    <div className="bg-white rounded-lg shadow border border-[#e3e6e6] p-6">
      <div className="border-b border-[#e3e6e6] pb-4 mb-4">
        <h1 className="font-bold text-lg text-[#111] mb-4">1. Delivery Address</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={input.name}
            onChange={changeEventHandler}
            className="border border-[#a6a6a6] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#f0c14b] text-sm"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="border border-[#a6a6a6] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#f0c14b] text-sm"
          />
          <input
            type="text"
            placeholder="Contact"
            name="contact"
            value={input.contact}
            onChange={changeEventHandler}
            className="border border-[#a6a6a6] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#f0c14b] text-sm"
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={input.address}
            onChange={changeEventHandler}
            className="border border-[#a6a6a6] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#f0c14b] text-sm"
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={input.city}
            onChange={changeEventHandler}
            className="border border-[#a6a6a6] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#f0c14b] text-sm"
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={input.country}
            onChange={changeEventHandler}
            className="border border-[#a6a6a6] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#f0c14b] text-sm"
          />
        </form>
      </div>
      <div className="border-b border-[#e3e6e6] pb-4 mb-4">
        <h1 className="font-bold text-lg text-[#111] mb-4">2. Items and Delivery</h1>
        <div className="space-y-4">
          {cart.map((product, index) => (
            <div
              key={product.id || product._id || `product-${index}`}
              className="flex items-center gap-4 bg-[#fafafa] rounded p-3 border border-[#e3e6e6]"
            >
              <img
                src={product.image}
                alt="product"
                width={80}
                height={80}
                className="object-contain rounded"
              />
              <div className="flex-1">
                <h1 className="font-semibold text-[#0f1111] text-base line-clamp-2 mb-1">{product.title}</h1>
                <p className="text-lg font-bold text-[#B12704]">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* OrderSummary is rendered for logic, but hidden from UI */}
      <div style={{ display: "" }}>
        <OrderSummary totalPrice={totalPrice} cart={cart} deliveryDetails={input} />
      </div>
    </div>
  );
};

export default DeliveryAddress;
