import React from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import useDeviceStore from "../responsive/useDeviceStore";

const AddToCardContainer = ({ product }) => {
  const device = useDeviceStore((state) => state.device);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();
  return device === "mobile" ? (
    <div className="border border-[#e3e6e6] rounded-md bg-white h-fit text-xs w-full max-w-full mx-0 font-['Amazon Ember','Arial','sans-serif'] p-2 shadow-sm">
      <div className="flex justify-center pt-2 pb-1">
        <img
          src="/prime-logo.png"
          width={36}
          height={22}
          alt="prime"
          className="object-contain"
        />
      </div>
      <div className="px-1 pb-2">
        <h1 className="text-[#111] text-xs font-semibold mb-1">
          <span className="text-[#147C8F] font-bold">FREE delivery</span> Thursday, 21 Mar. <span className="text-[#147C8F] hover:underline cursor-pointer">Details</span>
        </h1>
        <h2 className="text-[11px] text-[#565959] mb-1">
          Or fastest delivery <span className="font-semibold text-[#111]">Tomorrow, 20 Mar</span>. Order within <span className="text-[#B12704] font-bold">15 hrs 53 mins</span>. <span className="text-[#147C8F] hover:underline cursor-pointer">Details</span>
        </h2>
        <p className="text-[#147C8F] my-1 text-[11px] font-semibold">
          Deliver to Ankit - Gurugram
        </p>
        <button
          onClick={() => {
            addToCart(product);
            navigate("/cart");
          }}
          className="bg-[#FFD814] w-full rounded-full py-1 mt-2 text-[#111] text-sm font-bold border border-[#f0c14b] hover:bg-[#f7ca00] shadow transition-colors duration-150"
        >
          Add to Cart
        </button>
        <button
          onClick={() => {
            addToCart(product);
            navigate("/cart");
          }}
          className="bg-[#FFA41C] w-full rounded-full py-1 mt-2 text-[#111] text-sm font-bold border border-[#f0c14b] hover:bg-[#ffb700] shadow transition-colors duration-150"
        >
          Buy Now
        </button>
      </div>
    </div>
  ) : (
    <div className="border border-[#e3e6e6] rounded-lg shadow-md bg-white h-fit text-sm max-w-xs mx-auto font-['Amazon Ember','Arial','sans-serif']">
      <div className="flex justify-center pt-4">
        <img
          src="/prime-logo.png"
          width={50}
          height={30}
          alt="prime"
          className="object-contain"
        />
      </div>
      <div className="p-4">
        <h1 className="text-[#111] text-base font-semibold mb-2">
          <span className="text-[#147C8F] font-bold">FREE delivery</span>{" "}
          Thursday, 21 March.{" "}
          <span className="text-[#147C8F] hover:underline cursor-pointer">
            Details
          </span>
        </h1>
        <h2 className="text-xs text-[#565959] mb-2">
          Or fastest delivery{" "}
          <span className="font-semibold text-[#111]">Tomorrow, 20 March</span>.
          Order within{" "}
          <span className="text-[#B12704] font-bold">15 hrs 53 mins</span>.{" "}
          <span className="text-[#147C8F] hover:underline cursor-pointer">
            Details
          </span>
        </h2>
        <p className="text-[#147C8F] my-2 text-xs font-semibold">
          Deliver to Ankit - Gurugram
        </p>
        <button
          onClick={() => {
            addToCart(product);
            navigate("/cart");
          }}
          className="bg-[#FFD814] w-full rounded-full py-2 mt-2 text-[#111] font-bold border border-[#f0c14b] hover:bg-[#f7ca00] shadow-sm transition-colors duration-150"
        >
          Add to Cart
        </button>
        <button
          onClick={() => {
            addToCart(product);
            navigate("/cart");
          }}
          className="bg-[#FFA41C] w-full rounded-full py-2 mt-2 text-[#111] font-bold border border-[#f0c14b] hover:bg-[#ffb700] shadow-sm transition-colors duration-150"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default AddToCardContainer;
