import React, { useCallback } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const CheckoutForm = ({ product, stripePromise }) => {
  const fetchClientSecret = useCallback(async () => {
    return await fetch("/api/products/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: product.name,
        cost: product.price,
        id: product.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);
  const options = { fetchClientSecret };
  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;
