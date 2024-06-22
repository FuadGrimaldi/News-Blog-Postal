const express = require("express");
const router = express.Router();
const postController = require("../controller/PostController");
const registrasiController = require("../controller/RegistrasiController");
const userController = require("../controller/UserController");
// Post
router.post("/add-post", postController.createPost);
router.get("/dashboard", postController.readPost);
router.get("/post/:id", postController.readOnePost);
router.put("/edit-post/:id", postController.putPost);
router.delete("/delete-post/:id", postController.deletePost);

// Regis
router.post("/registrasi", registrasiController.registrasi);

// User
router.get("/user", userController.readUser);
module.exports = router;
