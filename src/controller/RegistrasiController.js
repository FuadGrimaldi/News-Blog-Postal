const User = require("../models/User");
const Acc = require("../models/Account");
const bcrypt = require("bcrypt");

const registrasi = async (req, res) => {
  try {
    const name = req.body.rname;
    const username = req.body.rusername;
    const password = req.body.rpassword;
    const gender = req.body.gender;

    // Ensure all required fields are provided
    if (!name || !username || !password || !gender) {
      return res.status(400).send({ message: "All user fields are required" });
    }

    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Username and password are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name: name,
      gender: gender,
      email: "",
      desc: "",
      contact: "",
      job: "",
    });
    const savedUser = await User.create(newUser);

    // Create new account
    const newAcc = new Acc({
      username: username,
      password: hashedPassword,
      userId: savedUser._id,
    });
    const savedAcc = await Acc.create(newAcc);

    const Message = "Register Success";
    req.session.message = Message;
    res.redirect("/login");
    // res.status(200).send({ message: "Successfully created an account" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getRegistedPage = async (req, res) => {
  try {
    // get logic
    const locals = {
      title: "Dashboard",
      description: "Simple portal created with NodeJS, Express & MongoDB ",
    };
    res.render("register", { locals });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { registrasi, getRegistedPage };
