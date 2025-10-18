import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";



const useItemStore = create(
  persist(
    (set) => ({
      loading: false,
      item: null,
      createItem: async (formData) => {
        try {
          set({ loading: true });

          const response = await axios.post(`https://mystore-245577333791.asia-south1.run.app/api/v1/item`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          });

          if (response?.data?.success) {
            toast.success(response.data.message);
            set({ loading: false, item: response.data.item });
          } else {
            toast.error("Failed to create item");
            set({ loading: false });
          }
        } catch (error) {
          console.error("Create item error:", error);
          const errorMessage =
            error?.response?.data?.message || "Failed to create item";
          toast.error(errorMessage);
          set({ loading: false });
        }
      },
    }),
    {
      name: "en-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useItemStore;
