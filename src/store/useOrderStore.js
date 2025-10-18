import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";



const useOrderStore = create(
  persist(
    (set) => ({
      orders: [],
      loading: false,
      createCheckoutSession: async (checkoutSession) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `https://mystore-245577333791.asia-south1.run.app/api/v1/order/checkout/create-checkout-session`,
            checkoutSession,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          window.location.href = response.data.session.url;
        } catch (error) {
          toast(error?.response?.data?.message || error.message || "Something went wrong");
          console.error(error);
        } finally {
          set({ loading: false });
        }
      },
      getOrderDetails: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`https://mystore-245577333791.asia-south1.run.app/api/v1/order/getOrder`);
          set({ loading: false, orders: response.data.orders });
        } catch (error) {
          set({ Loading: false });
        }
      },
    }),
    {
      name: "ordr-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOrderStore;
