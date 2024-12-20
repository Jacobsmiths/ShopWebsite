import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import CheckoutListing from "../components/CheckoutListing";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const CheckoutPage = ({ stripePromise }) => {
  const product = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [clientSecret, setSecret] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {

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
  }, []);

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
              <CheckoutListing product={product} key={product.id} />
              <CheckoutForm  />
            </div>
          </Elements>
        )
      )}
    </div>
  );
};

export default CheckoutPage;
