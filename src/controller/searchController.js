const Post = require("../models/Post");
const formatDate = require("../utils/dateFormatter");
const truncatString = require("../utils/truncatString");

const searchPost = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const locals = {
      title: `search?${searchTerm}`,
      description: "Simple blog created with NodeJS, Express & MongoDB ",
    };
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
    const data = await Post.find({
      $or: [
        { author: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { category: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    data.forEach((post) => {
      post.formattedDate = formatDate(post.createAt);
      post.truncatStr = truncatString(post.body, 100);
    });
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

const getSearch = async (req, res) => {
  try {
    const locals = {
      title: `search`,
      description: "Simple portal created with NodeJS, Express & MongoDB ",
    };
    const data = await Post.find();
    data.forEach((post) => {
      post.formattedDate = formatDate(post.createAt);
      post.truncatStr = truncatString(post.body, 100);
    });
    res.render("search", { locals, data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { searchPost, getSearch };
