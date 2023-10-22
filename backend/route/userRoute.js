const userModel = require("../models/userModel");

const login = async (req, res) => {
  const { email, password } = req.body;

  let existUser;
  try {
    existUser = await userModel.findOne({ email, password });
  } catch (error) {
    return res.status(505).send(error);
  } 
  if (existUser) {
    return res.status(202).json({ status: true, message: "login success",user:existUser._id });
  }
  return res.status(400).json({ status: false, message: "login failed" });
};

const register = async (req, res) => {
  const { email, password, name } = req.body;
  let existUser;
  try {
    existUser = await userModel.findOne({ email });
  } catch (error) {
    return res.status(505).send(error);
  }

  if (existUser) {
    return res
      .status(400)
      .json({ status: false, message: "already user exist" });
  }
  const NewUser = new userModel({
    email,
    password,
    name,
    todo: [],
  });
  try {
    await NewUser.save();
    return res
      .status(202)
      .json({ status: true, message: "registration success",user:NewUser._id });
  } catch (error) {
    return res.status(505).send(error);
  }
};

module.exports = { login, register };
