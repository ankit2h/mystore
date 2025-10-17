import React from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore";

const Success = () => {
  const cart = useCartStore((state) => state.cart);
  return (
    <div className="w-full min-h-screen bg-[#eaeded] flex items-center justify-center py-12">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-xl mx-auto p-8 flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#FFD814] rounded-full w-16 h-16 flex items-center justify-center mb-3 border-4 border-[#fcd200]">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-[#111] mb-1">Thank you for your order!</h1>
          <p className="text-gray-700 text-sm">Your order has been placed successfully with <span className="text-[#FF9900] font-semibold">Amazon.in</span></p>
        </div>
        <div className="w-full">
          <h1 className="font-bold py-3 border-b border-gray-200 mb-2 text-lg text-[#111]">Order Details</h1>
          <div className="space-y-4">
            {cart.map((product) => (
              <div key={product._id} className="flex items-center bg-gray-50 rounded p-3 border border-gray-100">
                <img
                  src={product.image}
                  width={80}
                  height={80}
                  alt="product-image"
                  className="rounded shadow-sm bg-white"
                />
                <div className="ml-5 flex-1">
                  <h1 className="font-semibold text-base text-[#111] mb-1 line-clamp-2">{product.title}</h1>
                  <h1 className="font-bold text-[#B12704] text-lg">${product.price} for each</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="my-6 w-full flex justify-center">
          <Link to="/" className="bg-[#FFD814] hover:bg-yellow-300 px-6 py-2 rounded-md font-semibold text-[#111] border border-[#fcd200] shadow transition">
            Buy more products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
