const User = require("../models/User");
// const userRegisted = "../views/layouts/userRegisted";

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
const getDashboardUser = async (req, res) => {
  try {
    let warningMessage;
    let name;
    const locals = {
      title: "Dashboard",
      description: "Simple portal created with NodeJS, Express & MongoDB ",
    };

    let data = [];
    try {
      data = await User.find();
    } catch (error) {
      console.log(error);
    }

    const sessionUserId = req.session.userId;
    const successMessage = req.session.Message;

    // Delete req.session.Message if it exists
    if (req.session.Message !== undefined) {
      delete req.session.Message;
    }

    data.forEach((user) => {
      if (user._id == sessionUserId) {
        name = user.name;
        if (!user.job || !user.contact || !user.gender || !user.email) {
          warningMessage = "Please complete the profile";
        }
      }
    });

    res.render("userRegisted/index", {
      locals,
      data,
      name,
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

module.exports = {
  readUser,
  readOneUser,
  getAbout,
  getDashboardUser,
  getContact,
};
