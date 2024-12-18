import React from "react";
import { NavLink, Link } from "react-router-dom";
import ItemCard from "./ItemCard";

const ViewListing = ({ product }) => {
  const { id, description, name, image_url, price } = product;
  const checkoutUrl = `/checkout/${id}`;

  return (
    <div>
      <ItemCard
        bg=""
        inner={
          <div className="container flex flex-col">
            <div className="flex flex-col md:flex-row mb-12">
              {/* Left: Image */}
              <img
                src={image_url}
                alt={name}
                className="w-full md:w-1/2 object-contain px-24 py-8"
              />
              {/* Right: Details */}
              <div className="flex flex-col w-full md:w-1/2">
                {/* Title and Price */}
                <h1 className="text-xl font-bold mb-2">{name}</h1>
                <p className="text-xl font-medium text-gray-600 mb-3">
                  ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>

                {/* Description */}
                <p className="text-gray-800 mb-6">{description}</p>

                {/* Checkout Button */}
                <Link to={checkoutUrl}>
                  <button className="self-start bg-blue-500 text-white px-6 py-2 font-medium uppercase tracking-wide hover:bg-blue-600 transition duration-300">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ViewListing;
