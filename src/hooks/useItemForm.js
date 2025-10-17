import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_ADD = " https://mystore-245577333791.asia-south1.run.app/api/v1/item/addItem";

export function useAddItem() {
  const [loading, setLoading] = useState(false);
  const addItem = async (form, onSuccess) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      const res = await axios.post(API_ADD, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message || "Item added");
      if (onSuccess) onSuccess(res.data.item);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error adding item");
    } finally {
      setLoading(false);
    }
  };
  return { addItem, loading };
}
