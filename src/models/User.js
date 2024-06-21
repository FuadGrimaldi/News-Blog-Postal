const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  job: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("User", UserSchema);
