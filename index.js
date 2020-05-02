// Import
const app = require("./app");

// ----------------------------------------------------------------------------------------- //

// Setup
const port = process.env.PORT || 4000;

// Serving
app.listen(port, (error) => {
  if (error) throw error;

  console.log(`Listening on port: ${port}`);
});
