const Acc = require("../models/Account");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const getLoginPage = async (req, res) => {
  try {
    const locals = {
      title: "Login",
    };
    res.render("login", { locals });
  } catch (error) {
    console.log(error);
    res.status(500).send({ nmessage: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    // Find user by username
    const accountUser = await Acc.findOne({ username });
    if (!accountUser) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }

    // Compare passwords
    const isValidPass = await bcrypt.compare(password, accountUser.password);
    if (!isValidPass) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ accId: accountUser._id }, jwtSecret);

    // // Send response
    // res.json({
    //   status: 200,
    //   message: "Success",
    //   token, // Include token in response
    // });
    res.cookie("token", token, { httpOnly: true });
    req.session.successMessage = "Login Successful!";
    req.session.username = accountUser.name;
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { login, getLoginPage };
