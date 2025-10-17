import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import useDeviceStore from "./responsive/useDeviceStore";
import React, { useEffect } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import "./App.css";
import "./index.css";
import Product from "./Product";
import Tutorial from "./Tutorial";

const queryClient = new QueryClient();

const App = () => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
  }
  const setDevice = useDeviceStore((state) => state.setDevice);

  useEffect(() => {
    const updateDevice = () => {
      setDevice(window.innerWidth < 768 ? "mobile" : "desktop");
    };

    updateDevice();
    window.addEventListener("resize", updateDevice);
    return () => window.removeEventListener("resize", updateDevice);
  }, [setDevice]);
  const open = useSelector((state: RootState) => state.sidebar.sidebar);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            {open && (
              <div className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm flex">
                <Sidebar
                  onClose={() =>
                    window.dispatchEvent(new CustomEvent("closeSidebar"))
                  }
                />
                {/* Click outside to close */}
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("closeSidebar"))
                  }
                />
              </div>
            )}
            <Routes>
              <Route path="/*" element={<Product />} />
              {/* allow nested paths under /tutorial to be handled inside Tutorial */}
              <Route path="/tutorial/*" element={<Tutorial />} />
            </Routes>
          </ClerkProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
