import React from "react";

const ItemCard = ({ inner, bg = "bg-gray-100", size = "p-6 rounded-lg" }) => {
  return <div className={`${(bg, size)}`}>{inner}</div>;
};

export default ItemCard;
