const express = require("express");
const router = express.Router();
const postController = require("../controller/PostController");
// Post
router.post("/add-post", postController.createPost);
router.get("/dashboard", postController.readPost);
router.get("/post/:id", postController.readOnePost);
router.put("/edit-post/:id", postController.putPost);
router.delete("/delete-post/:id", postController.deletePost);

module.exports = router;
