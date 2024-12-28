import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import Spinner from "../components/Spinner";

const CheckoutPage = ({ stripePromise }) => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState(["image not loading"]);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const product = await res.json();
        setEntry(product);
        setImages(product.imageString.split(","));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEntry();
  }, [id]);

  return (
    <div className="mt-4">
      <div className="inline-block p-4 ">
        <Link
          to={`/view/${id}`}
          className="ms-10 hover:underline hover:text-slate-700"
        >
          Go Back
        </Link>
      </div>

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="pb-10">
          <p className="text-center font-bold text-3xl">Checkout</p>
          <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr]">
            {/* Left: Checkout Form (3/4ths of the width) */}
            <div className="bg-slate-200 rounded-lg p-2">
              <CheckoutForm product={entry} stripePromise={stripePromise} />
            </div>

            {/* Right: Image and Price (Shrink-wrapped to fit content) */}
            <div
              className="bg-gray-100 shadow-md rounded-lg p-6 border border-black flex flex-col flex-shrink-0 justify-start md:ml-0 md:mr-12 mt-4 ml-6 mr-6"
              style={{ height: "min-content" }}
            >
              {/* Image in smaller form, full width */}
              <img
                src={images[0]}
                className="w-full object-contain mb-4"
                alt={images[0]}
                style={{ maxHeight: "200px", objectFit: "contain" }}
              />

              {/* Horizontal line */}
              <div className="border-t border-gray-300 my-4"></div>

              {/* Price */}
              <div className="flex justify-between text-lg font-semibold">
                <p>Price:</p>
                <p className="text-gray-800">{entry.price}</p>
              </div>
              <div className="border-t border-gray-300 my-4"></div>
              <div className="flex justify-center text-sm text-gray-500">
                <p>
                  Note: Pickup is only in San Antonio, Please email us if you
                  have any questions
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
