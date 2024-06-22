const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  author: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  feature: {
    type: Boolean,
    require: true,
  },
  category: {
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

module.exports = mongoose.model("Post", PostSchema);
