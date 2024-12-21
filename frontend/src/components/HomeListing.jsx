import React from "react";
import { NavLink, Link } from "react-router-dom";
import ItemCard from "./ItemCard";

const HomeListing = ({ product }) => {
  const { id, description, name, image_url, price, available } = product;
  const link = `/view/${id}`;
  const soldOutUrl = "/src/assets/images/Soldout.png";

  return (
    <div>
      {available ? (
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
      ) : (
        <ItemCard
          className=""
          other="border-2 border-black bg-gray-200"
          inner={
            <>
              <h3 className="text-xl font-bold">{name}</h3>
              <body className="overlap-container">
                <div class="overlapping-images  w-full h-auto">
                  <img src={image_url} alt={name} class="bottom-image" />
                  <img src={soldOutUrl} alt="Soldout.png" class="top-image" />
                </div>
              </body>
              <div className="text-gray-500 text-right px-2 font-bold">
                Sold Out
              </div>
            </>
          }
        />
      )}
    </div>
  );
};

export default HomeListing;
