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
    billing_address_collection: "required",
    ui_mode: "embedded",
    automatic_tax: {
      enabled: true,
    },
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Pickup',
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Regular Shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 10,
            },
            maximum: {
              unit: 'business_day',
              value: 30,
            },
          },
        },
      },
    ],
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
