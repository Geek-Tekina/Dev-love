const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

const registerUser = async (
  firstName,
  lastName,
  email,
  age,
  password,
  hobbies
) => {
  const hashedPw = await bcrypt.hash(password, 10);
  const newUser = await new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPw,
    hobbies: hobbies,
    age: age,
  });

  await newUser.save();

  return newUser;
};

const loginUser = async (email, password) => {
  const existingUser = await User.findOne({ email }).select("+password");
  const hashedPw = existingUser.password;

  const isPasswordCorrect = await bcrypt.compare(password, hashedPw);
  if (!isPasswordCorrect) {
    return null;
  } else {
    return existingUser;
  }
};

const updateUser = async (data, id) => {
  const allowedEditFields = ["firstName", "lastName", "age", "hobbies"];
  const editFields = Object.keys(data).filter((field) =>
    allowedEditFields.includes(field)
  );
  // console.log("edit fields >>", editFields);

  const updateData = {};
  editFields.forEach((field) => {
    updateData[field] = data[field];
  });

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedUser;
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
};
