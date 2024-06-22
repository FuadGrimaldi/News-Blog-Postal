const Post = require("../models/Post");

const readPost = async (req, res, next) => {
  try {
    const data = await Post.find();
    res.json({
      status: 200,
      message: "Get All Success",
      data: data,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const readOnePost = async (req, res, next) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    res.json({
      status: 200,
      message: "Success",
      data: data,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const deletePost = async (req, res, next) => {
  try {
    let slug = req.params.id;
    await Post.deleteOne({ _id: slug });
    res.json({
      status: 200,
      message: "Success",
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

const putPost = async (req, res, next) => {
  try {
    let slug = req.params.id;
    const data = await Post.findByIdAndUpdate(slug, {
      author: req.body.author,
      title: req.body.title,
      body: req.body.body,
      feature: req.body.feature,
      category: req.body.category,
      updateAt: Date.now(),
    });
    res.json({
      status: 200,
      message: "Success",
      data: data,
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const author = req.body.author;
    const title = req.body.title;
    const body = req.body.body;
    const feature = req.body.feature;
    const category = req.body.category;
    const newPost = new Post({
      author: author,
      title: title,
      body: body,
      feature: feature,
      category: category,
    });
    await newPost.save();
    res.json({
      status: 200,
      message: "Create Success",
      data: newPost,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { createPost, readOnePost, readPost, putPost, deletePost };
