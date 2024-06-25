const express = require("express");
const router = express.Router();
const postController = require("../controller/PostController");
const registrasiController = require("../controller/RegistrasiController");
const userController = require("../controller/UserController");
const loginController = require("../controller/LoginContoller");
const searchConttroller = require("../controller/searchController");
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
router.post("/registrasi", registrasiController.registrasi);

// Login
router.post("/login", loginController.login);
router.get("/login", loginController.getLoginPage);

// User
router.get("/user", userController.readUser);
router.get("/about", userController.getAbout);
router.post("/search", searchConttroller.searchPost);
router.get("/search", searchConttroller.getSearch);
// router.get("/profile", userController.readOneUser);

// User Registed
router.get(
  "/dashboard",
  authMidelware,
  setLayout("layouts/userRegisted"),
  userController.getDashboardUser
);

module.exports = router;
