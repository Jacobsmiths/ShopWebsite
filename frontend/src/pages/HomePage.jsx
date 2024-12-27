import React from "react";
import ProductListings from "../components/ProductListings";

const HomePage = () => {
  return (
    <div className="bg-slate-200">
      <ProductListings />
    </div>
  );
};

const productLoader = async ({ params }) => {
  const res = await fetch(`/api/products/${params.id}`);
  const data = await res.json();
  return data;
};

export { HomePage as default, productLoader };
