import React from "react";
import { NavLink, Link } from "react-router-dom";
import ItemCard from "./ItemCard";

const HomeListing = ({ product }) => {
  const { id, description, name, image_url, price } = product;
  const link = `/view/${id}`;

  return (
    <div>
      <NavLink to={link}>
        <ItemCard
          other="border-2 border-black"
          inner={
            <>
              <h3 className="text-xl font-bold">{name}</h3>
              <img src={image_url} alt={name} className="w-full h-auto" />
              <div className="text-gray-500 text-right px-2">
                ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            </>
          }
        />
      </NavLink>
    </div>
  );
};

export default HomeListing;
