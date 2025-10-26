const express = require("express");
const {
  register,
  login,
  viewSelf,
  logout,
  updateSelf,
  getFeed,
} = require("../controller/userController");
const { userAuth } = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.get("/profile/view", userAuth, viewSelf);
userRouter.patch("/profile/edit", userAuth, updateSelf);
userRouter.get("/feed", userAuth, getFeed);

module.exports = {
  userRouter,
};
