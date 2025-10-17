import { useNavigate } from "react-router-dom";
import Ratings from "./Ratings";
import useCartStore from "../../store/useCartStore";
import useDeviceStore from "../../responsive/useDeviceStore";

const CategoryWiseProduct = ({ product }) => {
  const device = useDeviceStore((state) => state.device);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();
  return device === "mobile" ? (
    <div className="bg-white rounded-md shadow-sm border border-[#e3e6e6] w-full max-w-full mx-0 flex flex-col relative group cursor-pointer p-2 min-h-[340px]">
      {/* Category badge */}
      <span className="absolute top-2 left-2 bg-[#f0c14b] text-[11px] font-semibold px-2 py-1 rounded text-[#111] shadow-sm border border-[#a88734] z-10">
        {product.category}
      </span>
      {/* Prime badge */}
      <span className="absolute top-2 right-2 flex items-center gap-1 bg-white/80 px-2 py-1 rounded text-[#1a98ff] text-[11px] font-bold border border-[#e3e6e6] shadow-sm z-10">
        <svg width="16" height="10" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12L14 22L34 2" stroke="#1a98ff" strokeWidth="3" strokeLinecap="round"/></svg>
        Prime
      </span>
      {/* Product image fills top, edge-to-edge */}
      <div className="w-full flex items-center justify-center bg-white pt-6 pb-2">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain w-full max-h-40 drop-shadow-sm"
          style={{ maxWidth: "100%", height: "160px" }}
        />
      </div>
      {/* Product info */}
      <div className="flex-1 flex flex-col justify-between px-1">
        <h1 className="font-semibold text-[#0f1111] text-[15px] line-clamp-2 min-h-[2.2em] mb-1 leading-tight group-hover:underline">
          {product.title}
        </h1>
        <Ratings ratings={product.rating} />
        <div className="flex items-end gap-2 mt-1">
          <span className="text-lg font-bold text-[#B12704] leading-none">
            ₹{product.price}
          </span>
          <span className="text-xs text-[#565959] line-through leading-none">
            MRP: ₹{Math.round(product.price * 1.2)}
          </span>
        </div>
        <p className="text-xs text-[#565959] mt-1 line-clamp-2 min-h-[2em]">
          {product.description?.substring(0, 80)}...
        </p>
      </div>
      {/* Add to Cart button always visible at bottom */}
      <button
        onClick={() => {
          addToCart(product);
          navigate("/cart");
        }}
        className="w-full py-1 rounded bg-[#FFD814] hover:bg-[#f7ca00] border border-[#f0c14b] text-[#111] text-sm font-semibold shadow-sm transition-colors duration-150 tracking-tight group-hover:scale-[1.02] mt-2"
        style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,0.15)" }}
      >
        Add to Cart
      </button>
    </div>
  ) : (
    <div className="border border-[#e3e6e6] rounded-lg shadow-sm bg-white hover:shadow-[0_4px_24px_0_rgba(213,217,217,0.5)] transition-shadow duration-200 p-4 flex flex-col h-full max-w-xs mx-auto relative group cursor-pointer">
      <span className="absolute top-2 left-2 bg-[#f0c14b] text-xs font-semibold px-2 py-1 rounded text-[#111] shadow-sm border border-[#a88734]">
        {product.category}
      </span>
      {/* Optional Prime badge for realism */}
      <span className="absolute top-2 right-2 flex items-center gap-1 bg-white/80 px-2 py-1 rounded text-[#1a98ff] text-xs font-bold border border-[#e3e6e6] shadow-sm">
        <svg
          width="18"
          height="12"
          viewBox="0 0 36 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 12L14 22L34 2"
            stroke="#1a98ff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        Prime
      </span>
      <div className="flex-1 flex items-center justify-center bg-white mt-6 mb-4">
        <img
          src={product.image}
          width={180}
          height={180}
          alt={product.title}
          className="object-contain max-h-44 max-w-full drop-shadow-sm"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <h1 className="font-semibold text-[#0f1111] text-base line-clamp-2 min-h-[2.5em] mb-1 leading-tight group-hover:underline">
          {product.title}
        </h1>
        <Ratings ratings={product.rating} />
        <div className="flex items-end gap-2 mt-2">
          <span className="text-xl font-bold text-[#B12704] leading-none">
            ₹{product.price}
          </span>
          <span className="text-xs text-[#565959] line-through leading-none">
            MRP: ₹{Math.round(product.price * 1.2)}
          </span>
        </div>
        <p className="text-xs text-[#565959] mt-1 line-clamp-2 min-h-[2em]">
          {product.description?.substring(0, 80)}...
        </p>
      </div>
      <button
        onClick={() => {
          addToCart(product);
          navigate("/cart");
        }}
        className="w-full mt-4 py-2 rounded-md bg-[#FFD814] hover:bg-[#f7ca00] border border-[#f0c14b] text-[#111] font-semibold shadow-sm transition-colors duration-150 tracking-tight group-hover:scale-[1.02]"
        style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,0.15)" }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CategoryWiseProduct;
