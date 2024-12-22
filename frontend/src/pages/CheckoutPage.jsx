import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import CheckoutListing from "../components/CheckoutListing";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const CheckoutPage = ({ stripePromise }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [clientSecret, setSecret] = useState(null);
  const [entry, setEntry] = useState(undefined);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const product = await res.json();
        setEntry(product);

        const secretResponse = await fetch("/api/products/create-secret", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [product] }),
        });
        const { clientSecret } = await secretResponse.json();
        setSecret(clientSecret);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEntry();
  }, [id]);

  const appearance = { theme: "stripe" };
  const loader = "auto";

  return (
    <div className="mt-4">
      <Link to="/" className="ms-10 hover:underline hover:text-slate-700">
        Go Back
      </Link>

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        clientSecret && (
          <Elements
            options={{ clientSecret, appearance, loader }}
            stripe={stripePromise}
          >
            <div>
              <CheckoutListing product={entry} key={entry.id} />
              <CheckoutForm />
            </div>
          </Elements>
        )
      )}
    </div>
  );
};

export default CheckoutPage;
