const mongoose = require("mongoose");

const userSchma = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  todo: [{ type: mongoose.Types.ObjectId, ref: "todo", required: true }],
});

module.exports = mongoose.model("user", userSchma);
