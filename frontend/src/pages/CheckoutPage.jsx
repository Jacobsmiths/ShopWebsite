import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import Spinner from "../components/Spinner";
import { useCart } from "../contexts/CartContext";
import MultipleImageDisplay from "../components/MultipleImageDisplay";

const CheckoutPage = ({ stripePromise }) => {
  const { cart, addToCart, removeFromCart, checkInCart } = useCart();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState(["image(s) not loading"]);

  useEffect(() => {
    async function fetchData() {
      try {
        const images = [];
        const products = [];
        for (const id of cart) {
          const res = await fetch(`/api/products/${id}`);
          const data = await res.json();
          products.push(data);
          images.push(data.imageString.split(",")[0]);
        }
        setItems(products);
        setImages(images);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [cart]);

  return (
    <div className="mt-4">
      <div className="inline-block p-4 ">
        <Link
          to={`/cart`}
          className="ms-10 hover:underline hover:text-slate-700"
        >
          Go Back
        </Link>
      </div>
      {cart.size <= 0 ? (
        <div>cart empty</div>
      ) : loading ? (
        <Spinner loading={loading} />
      ) : (
        <div classNam4e="pb-10">
          <p className="text-center font-bold text-3xl">Checkout</p>
          <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr]">
            <div className="bg-slate-200 rounded-lg p-2 md:order-1 order-2">
              <CheckoutForm products={items} stripePromise={stripePromise} />
            </div>

            <div
              className="bg-gray-100 shadow-md rounded-lg p-6 border border-black flex flex-col flex-shrink-0 justify-start md:ml-0 md:mr-12 mt-4 ml-6 mr-6 md:order-2 order-1"
              style={{ height: "min-content" }}
            >
              {images.length === 1 ? (
                <img
                  src={images[0]}
                  className="w-full object-contain mb-4"
                  style={{ maxHeight: "200px", objectFit: "contain" }}
                />
              ) : (
                <MultipleImageDisplay
                  imageString={images.join()}
                  size={"small"}
                />
              )}

              <div>
                {items.map((product, index) => (
                  <div key={index}>
                    {/* Horizontal line */}
                    <div className="border-t border-gray-300 my-4"></div>

                    {/* Price of Painting */}
                    <div className="flex justify-between text-lg font-semibold">
                      <p>Price of {product.name}:</p>
                      <p className="text-gray-800">{product.price}</p>
                    </div>
                  </div>
                ))}

                {/* Note */}
                <div className="border-t border-gray-300 my-4"></div>
                <div className="flex justify-center text-sm text-gray-500">
                  <p>
                    Note: Pickup is only in San Antonio. Please email us if you
                    have any questions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
