const express = require("express");
// const passpost = require("passport");
// const cookieSession = require("cookie-session");

// const { cookieKey } = require("./config/keys");

/* -------------------------------------------------------------------------- */

const app = express();

// Midllewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [cookieKey],
//   })
// );
// app.use(passpost.initialize());
// app.use(passpost.session());

app.get("/", (req, res) => {
  res.send("Hellooooo");
});

/* -------------------------------------------------------------------------- */

module.exports = app;
