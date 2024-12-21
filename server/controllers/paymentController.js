const Stripe = require('stripe');

const stripe = Stripe(process.env.SECRET_API_KEY);

const retrievePaymentIntent = async (req, res) => {
  const { payment_intentID } = req.body;
  
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intentID);
    res.send({ paymentIntent: paymentIntent });
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    res.status(500).send({ error: 'Error retrieving payment intent' });
  }
};

const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.price;
  });
  return total;
};

const createPaymentIntent = async (req, res, next) => {
  const { items } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items) * 100,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: { id: items.id },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = {
  retrievePaymentIntent,
  createPaymentIntent,
};
