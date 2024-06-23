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

const nextPage = async (req, res) => {
  try {
    const locals = {
      title: "NodeJS Blog",
      description: "Simple blog created with NodeJS, Express & MongoDB ",
    };
    let perPage = 8;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const countPage = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(countPage / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
};
const searchPost = async (req, res, next) => {
  try {
    const locals = {
      title: "search",
      description: "Simple blog created with NodeJS, Express & MongoDB ",
    };
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
    const data = await Post.find({
      $or: [
        { author: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    // console.log(searchTerm);
    // const data = await Post.findById({ _id: slug });
    res.render("search", {
      data,
      locals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  readOnePost,
  readPost,
  putPost,
  deletePost,
  nextPage,
  searchPost,
};
