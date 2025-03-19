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
const methodOverride = require("method-override");
const AWS = require("aws-sdk");
const multer = require("multer");
const fs = require("fs");
const User = require("./src/models/User");

// Konfigurasi AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const upload = multer({ dest: "uploads/" });

// Connection Database MongoDB
connectDb();
// Server
const app = express();
const port = 3000 || process.env.port;
// Request API parsing data
app.use(bodyParser.urlencoded({ extended: true }));
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

// override with POST having ?_method=PUT
app.use(methodOverride("_method"));

// Templating layout
app.use(express.static("public"));
app.use("/post", express.static("public"));
app.use("/user-post", express.static("public"));
app.use("/edit-post", express.static("public"));
app.use("/profile", express.static("public"));
// app.use("/admin", express.static("public"));
app.use(expressLayout);
app.set("layout", "./layouts/reader");
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
// route API
app.use("/", router);
app.post("/upload/:id", upload.single("avatar"), async (req, res) => {
  try {
    const sessionUserId = req.session.userId;
    const userId = req.params.id;

    if (sessionUserId !== userId) {
      return res.status(403).send("Unauthorized to update this profile");
    }

    const fileContent = fs.readFileSync(req.file.path);
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `avatars/${Date.now()}_${req.file.originalname}`, // Nama unik
      Body: fileContent,
    };

    s3.upload(params, async (err, data) => {
      fs.unlinkSync(req.file.path); // Hapus file lokal setelah diunggah
      if (err) {
        return res.status(500).send("Error saat mengunggah file");
      }

      // Update avatar URL di database
      await User.findByIdAndUpdate(userId, {
        avatar: data.Location,
        updatedAt: Date.now(),
      });

      res.redirect("/profile");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`App Listing On Port: 4000`);
});
