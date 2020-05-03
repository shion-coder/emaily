const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MONGO_URI,
  COOKIE_KEY,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
  SEND_GRID_KEY,
  REDIRECT_DOMAIN,
} = process.env;

module.exports = {
  googleClientID: GOOGLE_CLIENT_ID,
  googleClientSecret: GOOGLE_CLIENT_SECRET,
  mongoURI: MONGO_URI,
  cookieKey: COOKIE_KEY,
  stripePublishableKey: STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: STRIPE_SECRET_KEY,
  sendGridKey: SEND_GRID_KEY,
  redirectDomain: REDIRECT_DOMAIN,
};
