const { create } = require("connect-mongo");
const Post = require("../models/Post");
const formatDate = require("../utils/dateFormatter");
const truncatString = require("../utils/truncatString");
const User = require("../models/User");
const { name } = require("ejs");

const getHomepage = async (req, res) => {
  try {
    const locals = {
      title: "Sportman News",
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
    // console.log(data);
    const date = formatDate(data.createAt);
    res.render("news-details", { locals, data, date });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const readOnePostUser = async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    const locals = {
      title: `News: ${data.title}`,
      description: "Simple portal created with NodeJS, Express & MongoDB ",
    };
    const date = formatDate(data.createAt);
    res.render("user/news-details", { locals, data, date });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    const message = "Delete Successfull!";
    req.session.Message = message;
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const putPost = async (req, res) => {
  try {
    let slug = req.params.id;
    // const data =
    await Post.findByIdAndUpdate(slug, {
      author: req.body.author,
      title: req.body.title,
      body: req.body.body,
      feature: req.body.feature,
      category: req.body.category,
      updateAt: Date.now(),
    });
    const message = "Update Successfull!";
    req.session.Message = message;
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

const getPutPost = async (req, res) => {
  try {
    const slug = req.params.id;
    const locals = {
      title: "Edit Post",
      description: "Simple portal created with NodeJS, Express & MongoDB ",
    };
    const data = await Post.findOne({ _id: slug });
    res.render("user/edit-post", { locals, data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const createPost = async (req, res) => {
  try {
    const author = req.body.author;
    const title = req.body.title;
    const body = req.body.body;
    const feature = req.body.feature;
    const category = req.body.category;
    const data = await User.find();
    const sessionUserId = req.session.userId;
    let name;
    data.forEach((user) => {
      if (user._id == sessionUserId) {
        userName = user.name;
      }
    });
    const newPost = new Post({
      author: author,
      title: title,
      body: body,
      feature: feature,
      category: category,
      userId: sessionUserId,
    });
    await Post.create(newPost);
    const message = "Add Post Successfull!";
    req.session.Message = message;
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getCreatePostPage = async (req, res) => {
  try {
    const locals = {
      title: "Add Post",
      description: "Simple portal created with NodeJS, Express & MongoDB ",
    };
    const data = await User.find();
    let userName;
    const sessionUserId = req.session.userId;
    data.forEach((user) => {
      if (user._id == sessionUserId) {
        userName = user.name;
      }
    });
    res.render("user/add-post", { locals, userName });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
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
  getCreatePostPage,
  readOnePost,
  readOnePostUser,
  readPost,
  putPost,
  getPutPost,
  deletePost,
  nextPage,
  getHomepage,
};
