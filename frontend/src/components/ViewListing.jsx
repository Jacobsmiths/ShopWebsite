import React from "react";
import { Link } from "react-router-dom";
import MultipleImageDisplay from "./MultipleImageDisplay";

const ViewListing = ({ product }) => {
  const { id, description, name, imageString, price, dimension, available } =
    product;
  const checkoutUrl = `https://thewaitingmarket.me/checkout/${id}`;
  const images = imageString.split(",");

  return (
    <>
      {images.length === 1 ? (
        <div className="mb-8 mt-6 flex flex-col">
          <div className="flex flex-col md:flex-row ">
            {/* Left: Image */}
            <img
              src={images[0]}
              alt={name}
              className="w-auto md:w-1/2 md:h-auto object-contain px-8 max-h-[500px]"
            />
            {/* Right: Details */}
            <div className="flex flex-col w-full md:w-1/2 mt-6 px-4">
              {/* Title and Price */}
              <h1 className="text-xl font-bold mb-2">{name}</h1>
              <p className="text-xl font-medium text-gray-600 mb-3">{price}</p>
              <p className="text-gray-800 mb-6">{dimension}</p>

              {/* Description */}
              <p className="text-gray-800 mb-6">{description}</p>

              {/* Checkout Button */}
              {available ? (
                <Link to={checkoutUrl}>
                  <button className="self-start bg-blue-500 text-white px-6 py-2 font-medium uppercase tracking-wide hover:bg-blue-600 transition duration-300">
                    Checkout
                  </button>
                </Link>
              ) : (
                <p className="self-start text-red-800 px-6 py-2 font-medium uppercase tracking-wide">
                  Sold Out
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row mb-8 mt-6 ">
          {/* Multiple Image Display */}
          <div className="md:w-2/3 w-5/6 h-auto flex mx-0 px-4">
            {/* Centered Image on smaller screens */}
            <MultipleImageDisplay imageString={imageString} />
          </div>
          {/* Product Details */}
          <div className="flex flex-col w-full md:w-1/3 items-start px-4 py-4">
            {/* Title and Price */}
            <h1 className="text-xl font-bold mb-2">{name}</h1>
            <p className="text-xl font-medium text-gray-600 mb-3">{price}</p>
            <p className="text-gray-800 mb-6">{dimension}</p>

            {/* Description */}
            <p className="text-gray-800 mb-6">{description}</p>

            {/* Checkout Button */}
            {available ? (
              <Link to={checkoutUrl}>
                <button className="self-start bg-blue-500 text-white px-6 py-2 font-medium uppercase tracking-wide hover:bg-blue-600 transition duration-300">
                  Checkout
                </button>
              </Link>
            ) : (
              <p className="self-start text-red-800 px-6 py-2 font-medium uppercase tracking-wide">
                Sold Out
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewListing;
