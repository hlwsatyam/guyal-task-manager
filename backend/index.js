const express = require("express");
const mongoose = require("mongoose");
const TodoRouter = require("./route/route");
require("dotenv").config();
const cors = require("cors");
const userAuth = require("./route/userRoute.js");
// Express Applications
const app = express();

// Application Port
const PORT = process.env.PORT || 5600;

// Routing Area
app.use(cors());
app.use(express.json());

// Middlewares
app.use("/todo", TodoRouter);
app.post("/login", userAuth.login);
app.post("/register", userAuth.register);

// database Connections
const ConnectionDb = async () => {
  mongoose
    .connect(process.env.mongo_url)
    .then(() => {
      console.log("Mongodb Connected");
    })
    .catch((err) => console.log("mongodb is not connected"));
};
ConnectionDb();

// listing server
app.listen(PORT, () => {
  console.log(`application is running on ${PORT}`);
});
