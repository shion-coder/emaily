const mongoose = require("mongoose");

const app = require("./app");
const { mongoURI } = require("./config/keys");

require("./models/user");
require("./services/passpost");

// Routes
require("./routes/auth-routes")(app);
require("./routes/billing-routes")(app);

/* -------------------------------------------------------------------------- */

// Connect Mongo Database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 4000;

app.listen(PORT);
