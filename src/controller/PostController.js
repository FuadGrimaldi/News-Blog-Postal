const { create } = require("connect-mongo");
const Post = require("../models/Post");
const formatDate = require("../utils/dateFormatter");
const truncatString = require("../utils/truncatString");
const getHomepage = async (req, res) => {
  try {
    const locals = {
      title: "News Portal",
      description: "Simple portal created with NodeJS, Express & MongoDB ",
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

    // Format the date before rendering
    data.forEach((post) => {
      post.formattedDate = formatDate(post.createAt);
      post.truncatStr = truncatString(post.body, 100);
    });
    const successMessage = req.session.Message;
    console.log(successMessage);
    delete req.session.Message;
    res.render("index", {
      locals,
      data,
      successMessage,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const readPost = async (req, res, next) => {
  try {
    const data = await Post.find();
    res.status(200).send({ message: "Success" });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const readOnePost = async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    const locals = {
      title: `News: ${data.title}`,
      description: "Simple portal created with NodeJS, Express & MongoDB ",
    };
    const date = formatDate(data.createAt);
    res.render("news-details", { locals, data, date });
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
      title: "Next",
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

module.exports = {
  createPost,
  readOnePost,
  readPost,
  putPost,
  deletePost,
  nextPage,
  getHomepage,
};
