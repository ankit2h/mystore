
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDatabase } from '../hooks/useDatabase';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const { getFilterData, filterData } = useDatabase();
  const params = useParams();
  const { query } = params;

  useEffect(() => {
    if (query) {
      getFilterData(query);
    }
    // eslint-disable-next-line
  }, [query, getFilterData]);
  if (!filterData || filterData.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#eaeded] py-10 flex items-center justify-center">
        <h1 className="text-xl text-gray-500">No results found.</h1>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen bg-[#eaeded] py-10">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-auto">
        <div className="mb-6">
          <h1 className="font-semibold text-2xl text-[#111] mb-1">Results</h1>
          <p className="text-sm text-gray-700">Price and other details may vary based on product size and colour.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterData.map((product, index) => (
            <div key={product.id || product._id || `product-${index}`}
              className="h-full flex">
              <ProductCard products={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
