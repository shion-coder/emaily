const express = require("express");
const passpost = require("passport");
const path = require("path");
const cookieSession = require("cookie-session");

const { cookieKey } = require("./config/keys");

require("./models/user");
require("./services/passpost");

/* -------------------------------------------------------------------------- */

const app = express();

// Routes
require("./routes/auth-routes")(app);
require("./routes/billing-routes")(app);

// Midllewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  })
);
app.use(passpost.initialize());
app.use(passpost.session());

// Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

/* -------------------------------------------------------------------------- */

module.exports = app;
