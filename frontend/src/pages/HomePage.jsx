import React from "react";
import ProductListings from "../components/ProductListings";

const HomePage = () => {
  return (
      <ProductListings />
  );
};

const productLoader = async ({ params }) => {
  const res = await fetch(`/api/products/${params.id}`);
  const data = await res.json();
  return data;
};

export { HomePage as default, productLoader };
