import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductListing = ({ product, isProductPage = false }) => {
  const { id, description, name, image_url, price } = product;
  const link = `/view/${id}`;
  return (
    <section>
      {isProductPage ? (
        <div className="container flex flex-col">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
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
              <button className="self-start bg-blue-500 text-white px-6 py-2 font-medium uppercase tracking-wide hover:bg-blue-600 transition duration-300">
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <NavLink to={link}>
          <div className=" border-2 bg-slate-100 border-black p-4">
            <div className="rounded-lg ">
              <h3 className="text-xl font-bold">{name}</h3>
            </div>
            <img src={image_url} alt={name} className="w-full h-auto" />
            <div className="text-gray-500 text-right px-2">
              ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
          </div>
        </NavLink>
      )}
    </section>
  );
};

export default ProductListing;
