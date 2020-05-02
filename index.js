// const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const app = express();

// const app = require("./app");
// const { mongoURI } = require("./config/keys");

// require("./models/user");
// require("./services/passpost");

/* -------------------------------------------------------------------------- */

// // Connect Mongo Database
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

// // Routes
// require("./routes/auth-routes")(app);
// require("./routes/billing-routes")(app);

app.get("/", (req, res) => {
  res.send("Heloooo");
});

// Serve when production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT);
