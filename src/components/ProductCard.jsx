import React from "react";
import { useNavigate } from "react-router-dom";
import Ratings from "./shared/Ratings";

const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col h-full w-full max-w-xs mx-auto">
      <div
        className="cursor-pointer flex-1 flex flex-col"
        onClick={() => {
          navigate(`/product/${products._id}`);
        }}
      >
        <div className="flex items-center justify-center bg-gray-100 h-[200px] rounded-md overflow-hidden mb-3">
          <img
            className="mix-blend-multiply p-6"
            src={products.image}
            alt={products.title}
            width={160}
            height={160}
          />
        </div>
        <h1 className="font-semibold text-base text-[#111] mb-1 line-clamp-2 min-h-[40px]">{products.title}</h1>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2 min-h-[32px]">{`${products.description.substring(0, 50)}...`}</p>
        <Ratings ratings={products.rating} />
      </div>
      <p className="font-bold text-xl text-[#B12704] mt-2">${products.price}</p>
    </div>
  );
};

export default ProductCard;
