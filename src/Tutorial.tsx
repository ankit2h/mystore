import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import Data from "./data";
import Portfolio from "./portfolio";
import Setup from "./setup";
import Chat from "./pages/Chat";
import Sugn from "./components/Sugn";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import "./App.css";
import "./index.css";

const queryClient = new QueryClient();

const Tutorial = () => {
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
        <Header />
        <Routes>
          <Route
            path=":pagelink"
            element={
              <>
                <SignedIn>
                  <Index />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn redirectUrl={window.location.pathname} />
                </SignedOut>
              </>
            }
          />
          {/* ADD ALL CUSTOM ROUTES BELOW - these are relative to /tutorial */}
          <Route path="/structure" element={<Data />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route
            path="/chat"
            element={
              <>
                <SignedIn>
                  <Chat />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn redirectUrl={window.location.pathname} />
                </SignedOut>
              </>
            }
          />
          <Route path="/setup" element={<Setup />} />
          <Route path="/check" element={<Sugn />} />
          {/* catch-all must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default Tutorial;
