require("dotenv").config();
// Layout EJS
const expressLayout = require("express-ejs-layouts");
// Framework Express.js
const express = require("express");
const connectDb = require("./src/config/db");
const router = require("./src/routes/web");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");

// Connection Database MongoDB
connectDb();
// Server
const app = express();
const port = 4000 || process.env.port;
// Request API parsing data
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Cookie & Session
app.use(cookieParser());
app.use(
  session({
    secret: "key secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    // cookie: { maxAge: 180 * 60 * 1000 }, // 3 hours
  })
);

// Templating layout
app.use(express.static("public"));
// app.use("/admin", express.static("public"));
app.use(expressLayout);
app.set("layout", "./layouts/user");
app.set("view engine", "ejs");

// Origin CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/", router);

app.listen(port, () => {
  console.log(`App Listing On Port: 4000`);
});
// route API
