const Post = require("../models/Post");

const createPost = async (req, res, next) => {
  try {
    try {
      const newPost = new Post({
        author: req.body.author,
        title: req.body.title,
        body: req.body.body,
      });
      await newPost.save();
      res.json({
        message: "Create Success",
        data: newPost,
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { createPost };
