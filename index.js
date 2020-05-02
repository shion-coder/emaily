const mongoose = require("mongoose");

const app = require("./app");
const { mongoURI } = require("./config/keys");

/* -------------------------------------------------------------------------- */

// Connect Mongo Database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 4000;

app.listen(PORT);
