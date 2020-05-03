const express = require("express");
const mongoose = require("mongoose");
const passpost = require("passport");
const cookieSession = require("cookie-session");
const path = require("path");

const { cookieKey, mongoURI } = require("./config/keys");

require("./models/user");
require("./models/survey");
require("./routes/survey-routes");
require("./services/passpost");

/* -------------------------------------------------------------------------- */

// Connect Mongo Database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

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

// Routes
require("./routes/auth-routes")(app);
require("./routes/billing-routes")(app);

// Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT);
