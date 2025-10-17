// store/useDeviceStore.js
import { create } from "zustand";

const useDeviceStore = create((set) => ({
  device: "desktop", // default
  setDevice: (device) => set({ device }),
}));

export default useDeviceStore;
