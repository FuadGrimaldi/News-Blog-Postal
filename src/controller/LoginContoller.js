const Acc = require("../models/Account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const login = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    // const { username, password } = req.body;
    // console.log(req.body);
    // Find user by username
    const accountUser = await Acc.findOne({ username });
    if (!accountUser) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }

    // Compare passwords
    const isValidPass = await bcrypt.compare(password, accountUser.password); // Fix typo in 'accountUser.password'
    if (!isValidPass) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ accId: accountUser._id }, jwtSecret);

    // Send response
    res.json({
      status: 200,
      message: "Success",
      token, // Include token in response
    });

    next(); // Call the next middleware if needed
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { login };
