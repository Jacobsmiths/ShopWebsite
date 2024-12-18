import Stripe from "stripe";

const stripe = Stripe(
  "sk_test_51QWWzXP3msuX5JsQHGVPHBDLYFWxQXgg6vKhTeFArfEdCr2WABd20HW9AulLB5QWLmpBHjMaSd7t1LW2UGmyn7230092OFLqyW"
);

const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.price;
  });
  return total;
};

export const createPaymentIntent = async (req, res, next) => {
  const { items } = req.body;
  console.log(items);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items) * 100,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
