const express = require("express");
const passpost = require("passport");
const path = require("path");
const cookieSession = require("cookie-session");

const { cookieKey } = require("./config/keys");

/* -------------------------------------------------------------------------- */

const app = express();

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

// Serve when production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/* -------------------------------------------------------------------------- */

module.exports = app;
