import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import Spinner from "../components/Spinner";

const CartPage = () => {
  const checkoutUrl = `/checkout`;
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

  const removeItem = (id) => {
    removeFromCart(id);
  };

  return (
    <>
      <div className="inline-block p-4 ">
        <Link
          to={`/`}
          className="ms-10 hover:underline hover:text-slate-700"
        >
          Go Back
        </Link>
      </div>
      <div className="container mx-auto px-4 py-6 max-w-[600px]">
        <h1 className="text-center text-lg pb-10">Whats Inside Your Cart?</h1>
        <div className="flex flex-col gap-4">
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            items.map((item, index) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <p className="text-lg">{item.name}</p>
                <div className="flex flex-col-reverse sm:flex-row items-center gap-2">
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                  <div className="w-full h-full overflow-hidden max-w-[50px] max-h-[50px]">
                    <img
                      src={images[index]}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <Link to={checkoutUrl} className="flex justify-end pt-10">
          <button className="bg-blue-500 text-white px-6 py-2 font-medium uppercase tracking-wide hover:bg-blue-600 transition duration-300">
            Purchase
          </button>
        </Link>
      </div>
    </>
  );
};

export default CartPage;
