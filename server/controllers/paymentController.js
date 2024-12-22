const Stripe = require("stripe");

const stripe = Stripe(process.env.SECRET_API_KEY);

const retrieveSessionStatus = async (req, res, next) => {
  const session_id = req.query.session_id;
  const session = await stripe.checkout.sessions.retrieve(session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
};

const retrieveCheckoutSession = async (req, res, next) => {
  const { name, cost, id } = req.body;
  const product = await stripe.products.create({ name: `${name}` });
  const price = await stripe.prices.create({
    unit_amount: cost * 100,
    currency: "usd",
    product: `${product.id}`,
  });
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    metadata: {
      id: id,
    },
    mode: "payment",
    return_url: `${process.env.DOMAIN}/complete?session_id={CHECKOUT_SESSION_ID}`,
    automatic_tax: { enabled: true },
  });
  res.send({ clientSecret: session.client_secret });
};

module.exports = {
  retrieveSessionStatus,
  retrieveCheckoutSession,
};
