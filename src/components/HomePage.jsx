import React, { useEffect } from "react";
import CategoryWiseProduct from "./shared/CategoryWiseProduct";
import { useDatabase } from "../hooks/useDatabase";
import useDeviceStore from "../responsive/useDeviceStore";
import { setSidebar } from "../redux/sideSlice";
import { useDispatch } from "react-redux";

const category = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports & Outdoors",
  "Books",
  "Food & Beverages",
  "Toys & Games",
  "Automotive",
  "Beauty & Health",
];

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSidebar(false));
  }, [dispatch]);
  const device = useDeviceStore((state) => state.device);
  const { getCategoryProduct, categoryProducts } = useDatabase();
  useEffect(() => {
    category.forEach((cat) => {
      getCategoryProduct(cat);
    });
  }, []);

  return device === "mobile" ? (
    <div className="relative min-h-screen pb-4">
      {/* Fixed background covering entire screen */}
      <div className="fixed inset-0 w-full h-full bg-[#EAEDED] -z-10" />
      <img
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
          width: "100vw",
          height: "220px",
        }}
        className="w-full object-cover mb-2 relative z-10"
        src="https://images-eu.ssl-images-amazon.com/images/G/31/img24/AmazonPay/Travel/PC_Hero_BAU/IF_PC_Hero_3000x1200._CB583399235_.jpg"
        alt="banner"
      />
      <div className="px-2 relative z-10 -mt-25">
        {category.map((cat) => (
          <div key={cat} className="mb-4 pb-4 border-b border-[#ddd]">
            <h2 className="text-sm font-bold mb-2 text-[#232F3E] text-left">
              {cat}
            </h2>
            <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex overflow-x-auto gap-2 pb-1 hide-scrollbar">
              {(categoryProducts[cat] || []).map((product, idx) => {
                const key = product._id || product.id || idx;
                return (
                  <div
                    key={key}
                    className="bg-white min-w-[270px] max-w-[270px] rounded p-1 flex-shrink-0"
                  >
                    <CategoryWiseProduct product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  ) : (
    <div>
      <img
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
          width: "100%",
          height: "auto",
        }}
        src={
          "https://images-eu.ssl-images-amazon.com/images/G/31/img24/AmazonPay/Travel/PC_Hero_BAU/IF_PC_Hero_3000x1200._CB583399235_.jpg"
        }
        alt="banner"
      />
      <div className="w-[90%] mx-auto relative -top-64">
        {category.map((cat) => (
          <div key={cat} className="mb-8">
            <h2 className="text-xl font-bold mb-2">{cat}</h2>
            <div className="grid grid-cols-4 gap-2">
              {(categoryProducts[cat] || []).map((product, idx) => {
                const key = product._id || product.id || idx;
                return (
                  <div key={key}>
                    <CategoryWiseProduct product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
