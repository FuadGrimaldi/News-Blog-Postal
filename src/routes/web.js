const express = require("express");
const router = express.Router();
const postController = require("../controller/PostController");
// Post
router.post("/add-post", postController.createPost);

module.exports = router;
