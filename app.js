const express = require("express");
const connectDb = require("./src/config/db");

// Connection Database MongoDB
connectDb();
// Server
const app = express();
const port = 4000 || process.env.port;
app.listen(port, () => {
  console.log(`App  Listing On Port: 4000`);
});
