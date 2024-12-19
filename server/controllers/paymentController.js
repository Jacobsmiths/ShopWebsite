import Stripe from "stripe";

const stripe = Stripe(process.env.SECRET_API_KEY);

export const retrievePaymentIntent = async () => {
  const { payment_intentID } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      payment_intentID
    );
    res.send({ paymentIntent: paymentIntent });
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    res.status(500).send({ error: "Error retrieving payment intent" });
  }
};

const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.price;
  });
  return total;
};

export const createPaymentIntent = async (req, res, next) => {
  const { items } = req.body;
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
