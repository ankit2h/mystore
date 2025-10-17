import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import useDeviceStore from "./responsive/useDeviceStore";
import { useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import Head from "./components/Head";
import AddItemForm from "./components/AddItemForm";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import SingleProduct from "./components/SingleProduct";
import SearchResults from "./components/SearchResults";
import Login from "./components/Login";
import Success from "./components/Success";
import HomePage from "./components/HomePage";
import "./App.css";
import "./index.css";

const queryClient = new QueryClient();

const Product = () => {
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
        {/* <Header /> */}
        <Head />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addEditItem" element={<AddItemForm />} />
          <Route
            path="/cart"
            element={
              <>
                <SignedIn>
                  <Cart />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn redirectUrl="/cart" />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <SignedIn>
                  <Orders />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn redirectUrl="/orders" />
                </SignedOut>
              </>
            }
          />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/success" element={<Success />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default Product;
