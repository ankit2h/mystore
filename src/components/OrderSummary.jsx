import React from "react";
import useOrderStore from "../store/useOrderStore";
import { useSelector } from "react-redux";

const OrderSummary = ({ totalPrice, cart, deliveryDetails }) => {
  const userid = useSelector((store) => store.sidebar.user || "");

  const { createCheckoutSession, loading } = useOrderStore();
  const checkoutHandler = async (e) => {
    try {
      const checkoutData = {
        userid,
        cartItems: cart.map((cartItem) => ({
          itemId: cartItem._id,
          name: cartItem.title || "name",
          image: cartItem.image,
          price: cartItem.price.toString(),
          quantity: cartItem.quantity.toString(),
        })),
        deliveryDetails,
        totalAmount: totalPrice,
      };
      await createCheckoutSession(checkoutData);
    } catch (error) {
      console.log(error);
    }
  };
  // Calculate dynamic values
  const itemCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const deliveryFee = 40; // You can make this dynamic if needed
  const promotion = 40; // You can make this dynamic if needed
  const total = Number(totalPrice) + deliveryFee - promotion;

  return (
    <div className="border border-gray-200 rounded-lg shadow-lg bg-white p-6 mt-6 h-fit w-full max-w-sm mx-auto">
      <div>
        <h1 className="font-semibold text-xl mb-6 text-[#111] tracking-tight">
          Order Summary
        </h1>
        <div className="text-sm">
          <div className="flex items-center justify-between mb-1">
            <span>Items ({itemCount})</span>
            <span className="font-medium text-[#111]">${totalPrice}</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span>Delivery:</span>
            <span className="text-[#111]">${deliveryFee}</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span>Promotion Applied</span>
            <span className="text-green-700 font-semibold">-${promotion}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-[#B12704] py-2 border-t border-b border-gray-300 my-2">
            <span>Order Total:</span>
            <span>${total}</span>
          </div>
        </div>
        <button
          onClick={checkoutHandler}
          className="bg-[#FFD814] hover:bg-yellow-300 w-full rounded-md px-4 py-2 my-3 font-semibold text-[#111] border border-[#fcd200] shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Processing..." : "Place Your Order Now"}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
