const express = require("express");

// Server
const app = express();
const port = 4000 || process.env.port;
app.listen(port, () => {
  console.log(`App  Listing On Port: 4000`);
});
