import React from "react";

const ProductListing = ({ product }) => {
  const { id, description, name, image_url, price } = product;

  return <div>{id}</div>;
};

export default ProductListing;
