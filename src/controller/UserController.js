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
module.exports = { readUser };
