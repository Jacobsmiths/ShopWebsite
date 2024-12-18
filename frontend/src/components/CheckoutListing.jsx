import React from "react";
import { NavLink, Link } from "react-router-dom";
import ItemCard from "./ItemCard";

const ProductListing = ({ product }) => {
  const { id, description, name, image_url, price } = product;

  return <div>{id}</div>;
};

export default ProductListing;
