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
  try {
    const { names, costs, ids } = req.body;

    if (!Array.isArray(names) || !Array.isArray(costs) || !Array.isArray(ids)) {
      throw new Error("names, costs, and ids must be arrays.");
    }

    if (names.length !== costs.length || names.length !== ids.length) {
      throw new Error(
        "names, costs, and ids arrays must have the same length."
      );
    }

    const lineItems = [];
    for (let i = 0; i < names.length; i++) {
      const product = await stripe.products.create({ name: names[i] });
      const price = await stripe.prices.create({
        unit_amount: parseFloat(costs[i].replace("$", "")) * 100,
        currency: "usd",
        product: product.id,
      });
      lineItems.push({
        price: price.id,
        quantity: 1,
      });
    }

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
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Regular Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 7,
              },
              maximum: {
                unit: "business_day",
                value: 15,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Pickup",
          },
        },
      ],
      line_items: lineItems,
      metadata: {
        ids: ids.join(","),
      },
      mode: "payment",
      return_url: `${process.env.DOMAIN}/complete?session_id={CHECKOUT_SESSION_ID}`,
    });
    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  retrieveSessionStatus,
  retrieveCheckoutSession,
};
