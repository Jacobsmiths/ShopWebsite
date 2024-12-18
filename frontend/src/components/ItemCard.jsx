import React from "react";

const ItemCard = ({ inner, bg = "bg-slate-100", size = "p-4", other="" }) => {
  return <div className={`${bg} ${size} ${other}`}>{inner}</div>;
};

export default ItemCard;
