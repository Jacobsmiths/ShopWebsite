import React, { useCallback } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const CheckoutForm = ({ products, stripePromise }) => {
  // so this is given a list of jsons products, [{}, {}]
  const fetchClientSecret = useCallback(async () => {
    const names = [];
    const ids = [];
    const costs = [];
    products.forEach((product) => {
      console.log(product);
      names.push(product.name);
      ids.push(product.id);
      costs.push(product.price);
    });

    return await fetch("/api/products/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        names: names,
        costs: costs,
        ids: ids,
      }),
    })
      .catch((err) => {
        console.log(err);
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
