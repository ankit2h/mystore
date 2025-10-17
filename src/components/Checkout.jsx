import React from "react";
import useCartStore from "../store/useCartStore";
import { FaLock } from "react-icons/fa";
import DeliveryAddress from "./DeliveryAddress";
import OrderSummary from "./OrderSummary";

const Checkout = () => {
  const cart = useCartStore((state) => state.cart);
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  return (
    <div className="min-h-screen w-full bg-[#eaeded] pt-8 pb-16">
      <div className="max-w-5xl mx-auto bg-white rounded shadow border border-[#e3e6e6]">
        <div className="flex items-center border-b border-[#e3e6e6] px-8 py-6 justify-between">
          <div>
            <img src="/amazon-logo.png" alt="amazon" width={120} height={60} className="object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-2xl text-[#111] tracking-tight">Checkout</h1>
          </div>
          <div className="text-[#565959] flex items-center gap-2">
            <FaLock size={24} />
            <span className="text-xs font-semibold">Secure</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 px-8 py-8">
          <div className="flex-1">
            <DeliveryAddress />
          </div>
          {/* <div className="w-full md:w-[350px]">
            <OrderSummary cart={cart} totalPrice={totalPrice} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
