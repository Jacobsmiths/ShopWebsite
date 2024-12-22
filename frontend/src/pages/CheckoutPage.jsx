import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import Spinner from "../components/Spinner";

const CheckoutPage = ({ stripePromise }) => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const product = await res.json();
        setEntry(product);
        console.log("fart");
        console.log(product);
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
      <Link to="/" className="ms-10 hover:underline hover:text-slate-700">
        Go Back
      </Link>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <CheckoutForm product={entry} stripePromise={stripePromise} />
      )}
    </div>
  );
};

export default CheckoutPage;
