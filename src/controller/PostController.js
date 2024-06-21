const Post = require("../models/Post");

const readPost = async (req, res, next) => {
  res.json({
    message: "Here your post",
  });
  next();
};

const deletePost = async (req, res, next) => {
  try {
    res.json({
      message: "Delete Success",
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

const putPost = async (req, res, next) => {
  try {
    res.json({
      message: "Put Post succes",
    });
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    try {
      //   const newPost = new Post({
      //     author: req.body.author,
      //     title: req.body.title,
      //     body: req.body.body,
      //   });
      //   await newPost.save();
      const newPost = new Post({
        author: "Marzuki",
        title: "Hello",
        body: "lorem12",
        feature: "yes",
        category: "Tech",
      });
      //   await newPost.save();
      res.json({
        message: "Create Success",
        data: newPost,
      });
      next();
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { createPost, readPost, putPost, deletePost };
