import SearchResults from "../components/SearchResults";
import { useState } from "react";

export const useDatabase = () => {
  const [products, setProducts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});


    const envEndpoint = " https://mystore-245577333791.asia-south1.run.app";
  

  const getDataFromDatabase = async () => {
    try {
      const res = await fetch(`${envEndpoint}/api/v1/item/getAllItem`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.items);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const getFilterData = async (query) => {
    try {
      const res = await fetch(
        `${envEndpoint}/api/v1/item/getFilterData/${query}`
      );
      const data = await res.json();
      if (data.success) {
        setFilterData(data.items);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const getCategoryProduct = async (category) => {
    try {
      const res = await fetch(
        `${envEndpoint}/api/v1/item/getCategoryProduct/${category}`
      );
      const data = await res.json();
      if (data.success) {
        setCategoryProducts((prev) => ({ ...prev, [category]: data.items }));
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const getItem = async (id) => {
    try {
      const res = await fetch(`${envEndpoint}/api/v1/item/getItem/${id}`);
      const data = await res.json();
      if (data.success) {
        setSingleProduct(data.item);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return {
    products,
    getDataFromDatabase,
    filterData,
    getFilterData,
    categoryProducts,
    getCategoryProduct,
    singleProduct,
    getItem,
  };
};
