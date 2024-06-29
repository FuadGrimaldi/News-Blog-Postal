const express = require("express");
const router = express.Router();
const postController = require("../controller/PostController");
const registrasiController = require("../controller/RegistrasiController");
const userController = require("../controller/UserController");
const loginController = require("../controller/LoginContoller");
const searchConttroller = require("../controller/searchController");
const logoutController = require("../controller/logoutController");
const authMidelware = require("../middleware/middleware");
const setLayout = require("../utils/setLayout");

router.get("/", postController.getHomepage);
// Post
router.post("/add-post", postController.createPost);
// router.get("/dashboard", postController.readPost);
router.get("/post/:id", postController.readOnePost);
router.put("/edit-post/:id", postController.putPost);
router.delete("/delete-post/:id", postController.deletePost);

// Regis

// Login
router.post("/login", loginController.login);
router.get("/login", loginController.getLoginPage);

// Register
router.post("/register", registrasiController.registrasi);
router.get("/register", registrasiController.getRegistedPage);

// logout
router.get("/logout", logoutController.logout);

// Reader
router.get("/user", userController.readUser);
router.get("/about", userController.getAbout);
router.get("/contact", userController.getContact);
router.post("/search", searchConttroller.searchPost);
router.get("/search", searchConttroller.getSearch);
// router.get("/profile", userController.readOneUser);

// User
router.get(
  "/dashboard",
  authMidelware,
  setLayout("layouts/user"),
  userController.getDashboardUser
);
router.get(
  "/profile",
  authMidelware,
  setLayout("layouts/user"),
  userController.getAbout
);

module.exports = router;
