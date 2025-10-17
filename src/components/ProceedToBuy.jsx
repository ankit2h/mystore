import React from "react";
import Subtotal from "./shared/Subtotal";
import { useNavigate } from "react-router-dom";

const ProceedToBuy = ({
  length,
  totalPrice,
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-[320px] h-fit border border-gray-200 rounded-lg shadow-lg bg-white ml-0 md:ml-4">
      <div className="p-5 text-sm">
        <p className="mb-2">
          <span className="text-[#007600] font-semibold block mb-1">
            Your order is eligible for FREE Delivery
          </span>
          <span className="text-gray-700">Choose FREE Delivery option at checkout</span>
        </p>
        <Subtotal left={true} length={length} totalPrice={totalPrice} />
        <button
          onClick={() => {
            navigate("/checkout");
          }}
          className="bg-[#FFD814] hover:bg-yellow-300 w-full py-2 rounded-md shadow font-semibold text-[#111] border border-[#fcd200] my-4 transition"
        >
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default ProceedToBuy;
