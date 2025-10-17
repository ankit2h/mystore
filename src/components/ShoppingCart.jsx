import React from "react";
import Subtotal from "./shared/Subtotal";
import useCartStore from "../store/useCartStore";

const ShoppingCart = ({ cart, totalPrice }) => {
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeFromTheCart = useCartStore((state) => state.removeFromTheCart);
  const clearCart = useCartStore((state) => state.clearCart);
  return (
    <div className="w-full md:w-[70%] bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center border-b border-gray-300 pb-5 mb-2">
        <h1 className="font-semibold text-2xl text-[#111]">Shopping Cart</h1>
        <h1 className="font-medium text-[#111]">Price</h1>
      </div>
      {cart.map((product, idx) => {
        const key = product._id || product.id || idx;
        return (
          <div
            key={key}
            className="py-5 flex flex-col md:flex-row md:justify-between border-b border-gray-200 last:border-b-0"
          >
            <div className="flex">
              <div className="flex items-center justify-center bg-gray-100 rounded-md overflow-hidden w-[120px] h-[120px]">
                <img
                  src={product.image}
                  width={100}
                  height={100}
                  alt="product title"
                  className="object-contain"
                />
              </div>
              <div className="ml-6 flex flex-col justify-between">
                <h1 className="font-semibold text-base text-[#111] mb-1 line-clamp-2 min-h-[40px]">{product.title}</h1>
                <p className="text-[#007600] font-bold my-1 text-xs">In Stock</p>
                <div className="flex text-lg my-3 font-medium items-center w-fit bg-gray-200 rounded-md px-4 py-1">
                  <button
                    onClick={() => {
                      product.quantity > 1 && decrementQuantity(product._id || product.id);
                    }}
                    className="cursor-pointer mr-4 px-2 py-0.5 rounded bg-gray-300 hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="mx-2">{product.quantity}</span>
                  <button
                    onClick={() => {
                      incrementQuantity(product._id || product.id);
                    }}
                    className="cursor-pointer ml-4 px-2 py-0.5 rounded bg-gray-300 hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => {
                    removeFromTheCart(product._id || product.id);
                  }}
                  className="font-bold text-red-600 cursor-pointer w-fit text-xs hover:underline mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between min-w-[100px] mt-4 md:mt-0">
              <h1 className="font-bold text-xl text-[#B12704]">${product.price}</h1>
              <p className="text-xs py-1 text-gray-500">
                M.R.P. : <span className="line-through">3995.00</span>
              </p>
            </div>
          </div>
        );
      })}

      <button
        onClick={() => {
          clearCart();
        }}
        className="text-red-600 font-bold cursor-pointer py-2 hover:underline mt-2"
      >
        CLEAR ALL
      </button>
      <Subtotal left={false} length={cart.length} totalPrice={totalPrice} />
    </div>
  );
};

export default ShoppingCart;
