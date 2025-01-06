import React from "react";
import { Link } from "react-router-dom";
import MultipleImageDisplay from "./MultipleImageDisplay";
import { useCart } from "../contexts/CartContext";

const ViewListing = ({ product }) => {
  const { addToCart, removeFromCart, checkInCart } = useCart();
  const { id, description, name, imageString, price, dimension, available } =
    product;
  const checkoutUrl = `/cart`;
  const images = imageString.split(",");

  return (
    <>
      <div className="flex flex-col md:flex-row mb-8 mt-6 items-center sm:items-start">
        {/* Multiple Image Display */}
        {images.length === 1 ? (
          <img
            src={images[0]}
            alt={name}
            className="w-auto md:w-1/2 md:h-auto object-contain px-8 max-h-[500px]"
          />
        ) : (
          <div className="md:w-2/3 w-5/6 h-auto flex mx-0 px-4 items-center">
            {/* Centered Image on smaller screens */}
            <MultipleImageDisplay imageString={imageString} size={"large"} />
          </div>
        )}

        {/* Product Details */}
        <div className="flex flex-col w-full md:w-1/3 items-start px-12 py-4 md:px-4">
          {/* Title and Price */}
          <h1 className="text-xl font-bold mb-2">{name}</h1>
          <p className="text-xl font-medium text-gray-600 mb-3">{price}</p>
          <p className="text-gray-800 mb-6">{dimension}</p>

          {/* Description */}
          <p className="text-gray-800 mb-6">{description}</p>

          {/* Checkout Button */}

          {checkInCart(id) ? (
            <div className="flex flex-col">
              <Link to={checkoutUrl}>
                <button className="self-start bg-blue-500 text-white px-6 py-2 font-medium uppercase tracking-wide hover:bg-blue-600 transition duration-300">
                  Proceed to Checkout
                </button>
              </Link>
              <Link to={"/"}>
                <p className="text-gray-400 hover:text-gray-300 py-4">Continue Shopping?</p>
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                addToCart(id);
              }}
              className="self-start bg-blue-500 text-white px-6 py-2 font-medium uppercase tracking-wide hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewListing;
