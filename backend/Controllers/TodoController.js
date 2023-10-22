const mongoose = require("mongoose");
const TodoModel = require("../models/TodoModel");
const UserModel = require("../models/userModel");

const getAllTodos = async (req, res) => {
  const { id } = req.body;
  let user;
  try {
    user = await UserModel.findById(id).populate("todo");
  } catch (error) {
    return res.status(505).send(error);
  }

  if (user) {
    return res.status(202).json({ status: true, user });
  }
  return res.status(400).json({ status: false, user: "something went worng" });
};

const createTodo = async (req, res) => {
  const { isCompleted, title, description, date, id } = req.body;
  let user;
  try {
    user = await UserModel.findById(id);
  } catch (error) {
    return res.status(505).send(error);
  }

  const Todo = new TodoModel({
    isCompleted,
    title,
    description,
    date,
    user: id,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Todo.save();
    await Todo.save({ session });
    user.todo.push(Todo);
    await user.save({ session });
    await session.commitTransaction();
    await session.endSession();
    return res.status(202).json({ status: true, message: "created Todo!" });
  } catch (error) {
    return res.status(505).send(error);
  }
};

const updateTodo = async (req, res) => {
  const { isCompleted, title, description, Todoid } = req.body;
  try {
    await TodoModel.findByIdAndUpdate(Todoid, {
      isCompleted,
      title,
      description,
    });
    return res.status(202).json({ status: true, message: "updated Todo!" });
  } catch (error) {
    return res.status(505).send(error);
  }
};

const deleteTodo = async (req, res) => {
  const { Todoid } = req.body;
  let deletedTodo;
  try {
    deletedTodo = await TodoModel.findByIdAndDelete(Todoid).populate("user");
    await deletedTodo.user.todo.pull(deletedTodo);
    await deletedTodo.user.save();
    return res.status(202).json({ status: true, message: "deleted Todo!" });
  } catch (error) {
    return res.status(505).send(error);
  }
};

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };
