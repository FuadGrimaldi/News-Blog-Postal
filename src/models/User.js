const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  contact: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  job: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("User", UserSchema);
