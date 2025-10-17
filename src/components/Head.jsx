import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { BiCart } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import useUserStore from "../store/useUserStore";
import useDeviceStore from "../responsive/useDeviceStore";
import { setSidebar } from "../redux/sideSlice";
import { useDispatch } from "react-redux";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignOutButton,
} from "@clerk/clerk-react";

const itemList = [
  "All",
  "Fresh",
  "Amazon miniTV",
  "Sell",
  "Gift Cards",
  "Baby",
  "Buy Again",
  "Browsing History",
  "Amazon Pay",
  "Gift Ideas",
  "Health, Household & Personal Care",
];

const Head = () => {
  const device = useDeviceStore((state) => state.device);
  const cart = useCartStore((state) => state.cart);
  const [query, setQuery] = useState("");
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const serachHandler = () => {
    navigate(`/search/${query}`);
  };

  return (
    <>
      {device === "mobile" ? (
        <>
          <div className="bg-[#131921] text-white py-1 min-h-[50px]">
            <div
              className="flex items-center w-full px-2"
              style={{ minHeight: "50px" }}
            >
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center justify-center h-full mr-2"
              >
                <img
                  src="/amazon-logo-2.webp"
                  width={32}
                  height={32}
                  alt="amazon-logo"
                  className="object-contain"
                  style={{ display: "block" }}
                />
              </Link>
              {/* Search Bar */}
              <div className="flex items-center flex-1 bg-white rounded-full overflow-hidden shadow border border-[#d5d9d9] mx-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-3 py-1 text-sm outline-none text-black bg-transparent placeholder:text-[#888]"
                  placeholder="Search Amazon.in"
                  style={{ fontFamily: "Amazon Ember, Arial, sans-serif" }}
                />
                <button
                  onClick={serachHandler}
                  className="bg-[#FEBD69] px-2 py-1 flex items-center justify-center rounded-r-full border-l border-[#d5d9d9]"
                  aria-label="Search"
                >
                  <CgSearch size={20} className="text-black" />
                </button>
              </div>
              {/* Cart Icon */}
              <Link
                to="/cart"
                className="cursor-pointer relative flex items-center justify-center h-full ml-2 mr-4"
              >
                <span className="absolute -top-2 -right-2 bg-[#FFD814] text-[#111] text-[11px] font-bold rounded-full px-1 py-0.5 border border-[#f0c14b]">
                  {cart.length}
                </span>
                <BiCart size={24} className="text-white" />
              </Link>
              {/* Username display */}

              <SignedIn>
                <div
                  className="ml-1 text-xs font-semibold truncate max-w-[120px] flex items-center gap-2"
                  // title={user.fullname || user.email}
                >
                  {/* show clerk user button and sign out inline */}
                  <div className="text-[#FFD814] text-xs">
                    {/* optional label if needed */}
                  </div>
                  <UserButton />
                  <SignOutButton />
                </div>
              </SignedIn>
            </div>
          </div>
          <div className="bg-[#232F3E] w-full text-white p-1 flex justify-between items-center">
            <div className="flex flex-wrap gap-1">
              {itemList.slice(0, 5).map((link, idx) => (
                <Link
                  key={idx}
                  to={`/${link}`}
                  className="text-[11px] px-1 py-0.5 hover:border border border-transparent hover:border-white"
                >
                  {link}
                </Link>
              ))}
            </div>
            <div className="mr-2">
              <h1
                onClick={() => {
                  useUserStore.getState().setUser(null);
                  localStorage.removeItem("user-store");
                  navigate("/signin");
                }}
                className="text-[#FEBD69] text-xs font-bold cursor-pointer hover:underline"
              >
                Sign out
              </h1>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-[#131921] text-white py-2 md:py-4 min-h-[60px] md:min-h-[80px]">
            <div className="flex items-center justify-between w-[90%] mx-auto">
              <button
                className="flex items-center justify-center mr-2 sm:mr-4 text-indigo-500"
                onClick={() => dispatch(setSidebar(true))}
                aria-label="Open sidebar"
                style={{ fontSize: 0 }}
              >
                {/* SVG Hamburger Icon (no circle) */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
              <Link
                to="/"
                className="w-[10%] flex items-center"
                style={{ marginTop: "8px", marginBottom: "4px" }}
              >
                <img
                  src="/amazon-logo-2.webp"
                  width={150}
                  height={150}
                  alt="amazon-logo"
                  style={{ display: "block" }}
                />
              </Link>
              <div className="flex items-center w-[60%]">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full p-2 rounded-l-md outline-none text-black bg-[#fff] border border-[#d5d9d9] focus:ring-2 focus:ring-[#f0c14b] placeholder:text-[#888] text-base font-normal"
                  placeholder="Search Amazon.in"
                  style={{ fontFamily: "Amazon Ember, Arial, sans-serif" }}
                />
                <div
                  onClick={serachHandler}
                  className="bg-[#FEBD69] p-2 cursor-pointer hover:bg-[#ffad43] rounded-r-md border border-l-0 border-[#d5d9d9]"
                >
                  <CgSearch size={"24px"} className="text-black" />
                </div>
              </div>
              <div className="flex items-center justify-around w-[20%] gap-6">
                {/* <div
                  onClick={() => {
                    navigate("/signin");
                  }}
                  className="cursor-pointer text-left"
                >
                  <h1 className="text-xs hover:underline font-semibold text-[#fff] leading-tight">
                    {user ? user.fullname || user.email : "Signin"}
                  </h1>
                  <h1 className="font-bold text-sm text-[#fff]">Add Items</h1>
                </div> */}
                <SignedIn>
                  <div className="ml-1 text-xs font-semibold truncate max-w-[160px] flex items-center gap-2">
                    <UserButton />
                  </div>
                </SignedIn>
                <div>
                  <h1
                    onClick={() => {
                      navigate("/orders");
                    }}
                    className="font-bold text-sm cursor-pointer text-[#fff] hover:underline"
                  >
                    Orders
                  </h1>
                </div>
                <Link
                  to="/cart"
                  className="cursor-pointer relative flex items-center group"
                >
                  <span className="absolute -top-2 -right-3 bg-[#FFD814] text-[#111] text-xs font-bold rounded-full px-2 py-0.5 border border-[#f0c14b] shadow group-hover:scale-110 transition-transform">
                    {cart.length}
                  </span>
                  <div className="flex items-center">
                    <BiCart size={"36px"} className="text-white" />
                    <h1 className="ml-1 text-xs font-bold mt-2">Cart</h1>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-[#232F3E] w-full text-white p-2 flex justify-between items-center">
            <div>
              {itemList.map((link, idx) => {
                return (
                  <Link
                    key={idx}
                    to={`/${link}`}
                    className="mx-2 hover:border border border-transparent hover:border-white p-2"
                  >
                    {link}
                  </Link>
                );
              })}
            </div>
            <div className="mr-5">
              {/* <h1
                onClick={() => {
                  useUserStore.getState().setUser(null);
                  localStorage.removeItem("user-store");
                  navigate("/signin");
                }}
                className="text-[#FEBD69] font-bold cursor-pointer hover:underline"
              >
                Sign out
              </h1> */}
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <SignOutButton />
              </SignedIn>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Head;
