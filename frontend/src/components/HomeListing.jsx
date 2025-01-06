import React from "react";
import { NavLink } from "react-router-dom";
import ItemCard from "./ItemCard";
import SoldOutImage from "../assets/images/SoldOut.png";

const HomeListing = ({ product }) => {
  const { id, description, name, imageString, price, available } = product;
  const link = `/view/${id}`;
  const soldOutLink = `/soldout/${id}`;
  const images = imageString.split(",");

  return (
    <div>
      {available ? (
        <NavLink to={link}>
          <ItemCard
            other="border-[2px] border-black transition-colors duration-300 hover:border-hotPink"
            inner={
              <>
                <h3 className="text-xl font-bold">{name}</h3>
                <img
                  src={images[0]}
                  alt={images[0]}
                  className="w-full h-auto"
                />
                <div className="text-gray-500 text-right px-2">{price}</div>
              </>
            }
          />
        </NavLink>
      ) : (
        <NavLink to={soldOutLink}>
          <ItemCard
            className=""
            other="border-[2px] border-black transition-colors duration-300 hover:border-hotPink"
            inner={
              <>
                <h3 className="text-xl font-bold">{name}</h3>
                <div className="overlap-container">
                  <div className="overlapping-images w-full h-auto">
                    <img
                      src={images[0]}
                      alt={images[0]}
                      className="bottom-image"
                    />
                    <img
                      src={SoldOutImage}
                      alt="Soldout.png"
                      className="top-image"
                    />
                  </div>
                </div>
                <div className="text-gray-500 text-right px-2 font-bold">
                  Sold Out
                </div>
              </>
            }
          />
        </NavLink>
      )}
    </div>
  );
};

export default HomeListing;
