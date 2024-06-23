const User = require("../models/User");
const Acc = require("../models/Account");
const bcrypt = require("bcrypt");

const registrasi = async (req, res, next) => {
  try {
    const userData = req.body.user;
    const accountData = req.body.account;

    // Ensure all required fields are provided
    if (
      !userData.name ||
      !userData.gender ||
      !userData.email ||
      !userData.contact ||
      !userData.job
    ) {
      return res.status(400).send({ message: "All user fields are required" });
    }

    if (!accountData.username || !accountData.password) {
      return res
        .status(400)
        .send({ message: "Username and password are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(accountData.password, 10);

    // Create new user
    const newUser = new User({
      name: userData.name,
      gender: userData.gender,
      email: userData.email,
      contact: userData.contact,
      job: userData.job,
    });
    const savedUser = await User.create(newUser);

    // Create new account
    const newAcc = new Acc({
      username: accountData.username,
      password: hashedPassword,
      userId: savedUser._id,
    });
    const savedAcc = await Acc.create(newAcc);

    res.status(200).send({
      message: "Success",
      data: {
        User: savedUser,
        Account: savedAcc,
      },
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { registrasi };
