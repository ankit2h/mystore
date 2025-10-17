import React from "react";
import ShoppingCart from "./ShoppingCart";
import ProceedToBuy from "./ProceedToBuy";
import useCartStore from "../store/useCartStore";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  return (
    <div className="w-full min-h-screen bg-[#eaeded] py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="flex-1">
          <ShoppingCart cart={cart} totalPrice={totalPrice} />
        </div>
        <div className="w-full md:w-[350px]">
          <ProceedToBuy length={cart.length} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
