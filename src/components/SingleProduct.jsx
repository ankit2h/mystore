import React, { useEffect } from "react";
import Ratings from "./shared/Ratings";
import AddToCardContainer from "./AddToCardContainer";
import { useDatabase } from "../hooks/useDatabase";
import { useParams } from "react-router-dom";
import useDeviceStore from "../responsive/useDeviceStore";

const SingleProduct = () => {
  const device = useDeviceStore((state) => state.device);
  const params = useParams();
  const { id } = params;
  const { singleProduct, getItem } = useDatabase();
  useEffect(() => {
    if (id) getItem(id);
  }, [id, getItem]);
  if (Array.isArray(singleProduct)) {
    return device === "mobile" ? (
      <div className="w-full min-h-screen bg-[#EAEDED] pb-[80px]">
        {singleProduct.map((product) => (
          <div key={product._id || product.id} className="bg-white rounded-md shadow-sm border border-[#e3e6e6] w-full max-w-full mx-0 flex flex-col relative p-0">
            {/* Product image fills top, edge-to-edge */}
            <div className="w-full flex items-center justify-center bg-white pt-4 pb-2">
              <img
                src={product.image}
                alt={product.title}
                className="object-contain w-full max-h-64 drop-shadow-sm"
                style={{ maxWidth: "100%", height: "220px" }}
              />
            </div>
            {/* Product info stacked */}
            <div className="flex flex-col px-4 pt-2 pb-4">
              <h1 className="font-semibold text-lg text-[#111] mb-1 leading-tight">
                {product.title}
              </h1>
              <Ratings ratings={product.rating} />
              <span className="text-lg font-bold text-[#B12704] mt-2 mb-1">
                ₹{product.price}
              </span>
              <span className="text-xs text-[#565959] line-through mb-1">
                MRP: ₹{Math.round(product.price * 1.2)}
              </span>
              <p className="text-sm text-gray-700 mb-2 mt-1">
                {product.description}
              </p>
              <div className="mt-2">
                <h1 className="font-bold text-base mb-1">About this item</h1>
                <div className="list-disc ml-5 text-sm text-gray-700 space-y-1">Description</div>
              </div>
            </div>
            {/* Add to Cart scrollable for mobile */}
            <div className="w-full px-4 pb-3">
              <AddToCardContainer product={product} />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="w-full md:w-[80%] mx-auto mt-10">
        <div className="flex flex-col gap-8">
          {singleProduct.map((product) => (
            <div
              key={product._id || product.id}
              className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-lg p-6"
            >
              <div className="flex flex-col md:flex-row w-full">
                <div className="bg-gray-100 rounded-lg flex items-center justify-center w-[320px] h-[320px]">
                  {product.image && (
                    <img
                      className="mix-blend-multiply p-4"
                      src={product.image}
                      width={300}
                      height={300}
                      alt="product-title"
                    />
                  )}
                </div>
                <div className="mx-6 flex-1 flex flex-col justify-between">
                  <h1 className="font-semibold text-2xl text-[#111] mb-2">
                    {product.title}
                  </h1>
                  <p className="text-base text-gray-700 mb-2">
                    {product.description}
                  </p>
                  <Ratings ratings={product.rating} />
                  <h1 className="font-bold text-lg text-[#B12704] mt-2 mb-1">
                    ${product.price}
                  </h1>
                  <div className="mt-4">
                    <h1 className="font-bold text-base mb-1">
                      About this item
                    </h1>
                    <div className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                      Description
                    </div>
                  </div>
                </div>
                <div className="min-w-[280px] ml-0 md:ml-8 mt-8 md:mt-0">
                  <AddToCardContainer product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render single product object
  if (singleProduct && typeof singleProduct === "object") {
    return device === "mobile" ? (
      <div className="w-full min-h-screen bg-[#EAEDED] pb-[80px]">
        <div className="bg-white rounded-md shadow-sm border border-[#e3e6e6] w-full max-w-full mx-0 flex flex-col relative p-0">
          {/* Product image fills top, edge-to-edge */}
          <div className="w-full flex items-center justify-center bg-white pt-4 pb-2">
            <img
              src={singleProduct.image}
              alt={singleProduct.title}
              className="object-contain w-full max-h-64 drop-shadow-sm"
              style={{ maxWidth: "100%", height: "220px" }}
            />
          </div>
          {/* Product info stacked */}
          <div className="flex flex-col px-4 pt-2 pb-4">
            <h1 className="font-semibold text-lg text-[#111] mb-1 leading-tight">
              {singleProduct.title}
            </h1>
            <Ratings ratings={singleProduct.rating} />
            <span className="text-lg font-bold text-[#B12704] mt-2 mb-1">
              ₹{singleProduct.price}
            </span>
            <span className="text-xs text-[#565959] line-through mb-1">
              MRP: ₹{Math.round(singleProduct.price * 1.2)}
            </span>
            <p className="text-sm text-gray-700 mb-2 mt-1">
              {singleProduct.description}
            </p>
            <div className="mt-2">
              <h1 className="font-bold text-base mb-1">About this item</h1>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                <li>Processor: Good speed for gaming</li>
                <li>Display: High resolution, vibrant colors</li>
                <li>Battery: Long-lasting performance</li>
              </ul>
            </div>
          </div>
          {/* Add to Cart scrollable for mobile */}
          <div className="w-full px-4 pb-3">
            <AddToCardContainer product={singleProduct} />
          </div>
        </div>
      </div>
    ) : (
      <div className="w-full md:w-[80%] mx-auto mt-10">
        <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-lg p-6">
          <div className="bg-gray-100 rounded-lg flex items-center justify-center w-[320px] h-[320px]">
            {singleProduct.image && (
              <img
                className="mix-blend-multiply p-4"
                src={singleProduct.image}
                width={300}
                height={300}
                alt="product-title"
              />
            )}
          </div>
          <div className="mx-6 flex-1 flex flex-col justify-between">
            <h1 className="font-semibold text-2xl text-[#111] mb-2">
              {singleProduct.title}
            </h1>
            <p className="text-base text-gray-700 mb-2">
              {singleProduct.description}
            </p>
            <Ratings ratings={singleProduct.rating} />
            <h1 className="font-bold text-lg text-[#B12704] mt-2 mb-1">
              ${singleProduct.price}
            </h1>
            <div className="mt-4">
              <h1 className="font-bold text-base mb-1">About this item</h1>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                <li>Processor: Good speed for gaming</li>
                <li>Display: High resolution, vibrant colors</li>
                <li>Battery: Long-lasting performance</li>
              </ul>
            </div>
          </div>
          <div className="min-w-[280px] ml-0 md:ml-8 mt-8 md:mt-0">
            <AddToCardContainer product={singleProduct} />
          </div>
        </div>
      </div>
    );
  }

  // Fallback for undefined/null
  return null;
};

export default SingleProduct;
