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
router.get("/post/:id", postController.readOnePost);
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
  userController.getProfile
);
router.get(
  "/profile/edit",
  authMidelware,
  setLayout("layouts/user"),
  userController.getEditProfile
);
router.put(
  "/edit-profile/:id",
  authMidelware,
  setLayout("layouts/user"),
  userController.putProfile
);

// Post
router.post("/add-post", postController.createPost);
router.get(
  "/add-post",
  authMidelware,
  setLayout("layouts/user"),
  postController.getCreatePostPage
);
router.get(
  "/user-post/:id",
  authMidelware,
  setLayout("layouts/user"),
  postController.readOnePostUser
);

router.put(
  "/edit-post/:id",
  authMidelware,
  setLayout("layouts/user"),
  postController.putPost
);
router.get(
  "/edit-post/:id",
  authMidelware,
  setLayout("layouts/user"),
  postController.getPutPost
);
router.delete(
  "/delete-post/:id",
  authMidelware,
  setLayout("layouts/user"),
  postController.deletePost
);
module.exports = router;
