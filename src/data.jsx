import React from "react";
import SidebarTree from "./structure";
import { setSidebar } from "./redux/sideSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const projectData = [
  {
    name: "frontend",
    type: "folder",
    children: [
      {
        name: "public",
        type: "folder",
        children: [{ name: "index.html", type: "file" }],
      },
      {
        name: "src",
        type: "folder",
        children: [
          {
            name: "components",
            type: "folder",
            children: [
              {
                name: "shared",
                type: "folder",
                children: [
                  { name: "CategoryWiseProduct.jsx", type: "file" },
                  { name: "Ratings.jsx", type: "file" },
                  { name: "Subtotal.jsx", type: "file" },
                ],
              },

              { name: "AddToCartContainer.jsx", type: "file" },
              { name: "Cart.jsx", type: "file" },
              { name: "Checkout.jsx", type: "file" },
              { name: "DeliveryAddress.jsx", type: "file" },
              { name: "Header.jsx", type: "file" },
              { name: "Orders.jsx", type: "file" },
              { name: "OrderSummary.jsx", type: "file" },
              { name: "ProceedToBuy.jsx", type: "file" },
              { name: "ProductCard.jsx", type: "file" },
              { name: "SearchResults.jsx", type: "file" },
              { name: "ShoppingCart.jsx", type: "file" },
              { name: "Success.jsx", type: "file" },
              { name: "Login.jsx", type: "file" },
              { name: "AddItemForm.jsx", type: "file" },
            ],
          },
          {
            name: "hooks",
            type: "folder",
            children: [
              { name: "useDatabase.js", type: "file" },
              { name: "useAuthForm.js", type: "file" },
              { name: "useItemForm.js", type: "file" },
            ],
          },
          {
            name: "store",
            type: "folder",
            children: [
              { name: "useCartStore.js", type: "file" },
              { name: "useMenuStore.js", type: "file" },
              { name: "useOrderStore.js", type: "file" },
              { name: "useUserStore.js", type: "file" },
            ],
          },
          { name: "App.jsx", type: "file" },
          { name: "index.css", type: "file" },
          { name: "main.jsx", type: "file" },
        ],
      },
      { name: "package.json", type: "file" },
      { name: "package-lock.json", type: "file" },
      { name: "vite.config.js", type: "file" },
    ],
  },
  {
    name: "backend",
    type: "folder",
    children: [
      {
        name: "controllers",
        type: "folder",
        children: [
          { name: "user.js", type: "file" },
          { name: "orders.js", type: "file" },
          { name: "item.js", type: "file" },
        ],
      },
      {
        name: "models",
        type: "folder",
        children: [
          { name: "user.js", type: "file" },
          { name: "orders.js", type: "file" },
          { name: "item.js", type: "file" },
        ],
      },
      {
        name: "routes",
        type: "folder",
        children: [
          { name: "user.js", type: "file" },
          { name: "orders.js", type: "file" },
          { name: "item.js", type: "file" },
        ],
      },
      {
        name: "utils",
        type: "folder",
        children: [
          { name: "database.js", type: "file" },
          { name: "cloudinary.js", type: "file" },
          { name: "datauri.js", type: "file" },
        ],
      },
      { name: "index.js", type: "file" },
      { name: ".env", type: "file" },
      { name: "package.json", type: "file" },
      { name: "package-lock.json", type: "file" },
    ],
  },
];

export default function Data() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSidebar(false));
  }, [dispatch]);
  return (
    <div className="flex pt-24 justify-center items-center min-h-screen">
      <SidebarTree data={projectData} />
      {/* <div className="flex-1 p-4">Main content here</div> */}
    </div>
  );
}
