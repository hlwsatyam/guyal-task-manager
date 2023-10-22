const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  isCompleted: Boolean,
  title: String,
  description: String,
  date: String,
  user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
});

module.exports = mongoose.model("todo", TodoSchema);
