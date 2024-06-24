const User = require("../models/User");

const readUser = async (req, res, next) => {
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

const readOneUser = async (req, res, next) => {
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
module.exports = { readUser, readOneUser, getAbout };
