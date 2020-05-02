const { stripeSecretKey } = require("../config/keys");

const stripe = require("stripe")(stripeSecretKey);
const requireLogin = require("../middlewares/require-login");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charges = await stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      source: req.body.token.id,
    });

    req.user.credits += 5;

    const user = await req.user.save();

    res.send(user);
  });
};
