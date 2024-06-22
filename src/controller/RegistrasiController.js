const User = require("../models/User");
const Acc = require("../models/Account");

const registrasi = async (req, res, next) => {
  try {
    const userData = req.body.user;
    const accountData = req.body.account;
    // console.log(userData, accountData);
    const newUser = new User({
      name: userData.name,
      gender: userData.gender,
      email: userData.email,
      contact: userData.contact,
      job: userData.job,
    });
    const savedUser = await newUser.save();

    const newAcc = new Acc({
      username: accountData.username,
      password: accountData.password,
      userId: savedUser._id,
    });
    const savedAcc = await newAcc.save();

    res.json({
      status: 200,
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
