require("dotenv").config();
const express = require("express");
const connectDb = require("./src/config/db");
const router = require("./src/routes/web");

// Connection Database MongoDB
connectDb();
// Server
const app = express();
const port = 4000 || process.env.port;
app.use("/", router);

app.listen(port, () => {
  console.log(`App Listing On Port: 4000`);
});
// route API
