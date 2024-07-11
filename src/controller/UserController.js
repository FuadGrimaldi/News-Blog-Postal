const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require("mongoose");
const formatDate = require("../utils/dateFormatter");
const truncatString = require("../utils/truncatString");

const readUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json({
      status: 200,
      message: "Success",
      data: user,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(5000).sen({ message: "Internal Server Error" });
  }
};

const readOneUser = async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await User.findById({ _id: slug });
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

const getAbout = async (req, res) => {
  try {
    const locals = {
      title: "About",
      description: "Simple portal created with NodeJS, Express & MongoDB ",
    };
    res.render("about", { locals });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Interval Server Error" });
  }
};
const getProfile = async (req, res) => {
  try {
    let warningMessage;
    const sessionUserId = req.session.userId;
    const successMessage = req.session.message;
    delete req.session.message;
    // console.log(sessionUserId);
    const locals = {
      title: "Profile",
      description: "Simple portal created with NodeJS, Express & MongoDB ",
    };
    if (!mongoose.Types.ObjectId.isValid(sessionUserId)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }

    const data = await User.findOne({ _id: sessionUserId });
    if (
      !data.job ||
      !data.contact ||
      !data.gender ||
      !data.email ||
      !data.address
    ) {
      warningMessage = "Please complete the profile";
    }
    // console.log(data);
    if (!data) {
      return res.status(404).send({ message: "User not found" });
    }
    res.render("user/profile", {
      locals,
      data,
      warningMessage,
      successMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const getDashboardUser = async (req, res) => {
  try {
    let warningMessage;
    let name;
    const locals = {
      title: "Dashboard",
      description: "Simple portal created with NodeJS, Express & MongoDB ",
    };
    const sessionUserId = req.session.userId;
    const successMessage = req.session.Message;

    const data = await User.find();
    const dataPost = await Post.find();
    dataPost.forEach((post) => {
      post.formattedDate = formatDate(post.createAt);
      post.truncatStr = truncatString(post.body, 100);
    });

    // Delete req.session.Message if it exists
    if (req.session.Message !== undefined) {
      delete req.session.Message;
    }

    data.forEach((user) => {
      if (user._id == sessionUserId) {
        name = user.name;
        if (
          !user.job ||
          !user.contact ||
          !user.gender ||
          !user.email ||
          !user.address
        ) {
          warningMessage = "Please complete the profile";
        }
      }
    });

    res.render("user/index", {
      locals,
      data,
      dataPost,
      name,
      sessionUserId,
      successMessage,
      warningMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getContact = async (req, res) => {
  const locals = {
    title: `Contact Us`,
    description: "Simple portal created with NodeJS, Express & MongoDB ",
  };
  try {
    res.render("contact", { locals });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getEditProfile = async (req, res) => {
  try {
    const sessionUserId = req.session.userId;
    const locals = {
      title: `edit profile`,
      description: "Simple portal created with NodeJS, Express & MongoDB ",
    };
    const data = await User.findOne({ _id: sessionUserId });
    res.render("user/edit-profile", { locals, data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const putProfile = async (req, res) => {
  try {
    const sessionUserId = req.session.userId;
    await User.findByIdAndUpdate(sessionUserId, {
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      contact: req.body.contact,
      gender: req.body.gender,
      avatar: req.file,
      desc: req.body.desc,
      job: req.body.job,
      updateAt: Date.now(),
    });
    const message = "Update Profile Successfull!";
    req.session.Message = message;
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  readUser,
  readOneUser,
  getProfile,
  getAbout,
  getDashboardUser,
  getEditProfile,
  getContact,
  putProfile,
};
