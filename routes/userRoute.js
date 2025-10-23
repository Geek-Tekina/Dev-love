const express = require("express");
const {
  register,
  login,
  viewSelf,
  logout,
} = require("../controller/userController");
const { userAuth } = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/view", userAuth, viewSelf);
userRouter.get("/logout", logout);

module.exports = {
  userRouter,
};
