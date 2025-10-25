const bcrypt = require("bcrypt");
const { User } = require("../database/models/user");
const jwt = require("jsonwebtoken");
const {
  registerUser,
  loginUser,
  updatedUser,
  updateUser,
} = require("../database/repository/userRepository");

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, age, password, hobbies } = req.body;

    if (!firstName || !lastName || !email || !age || !password) {
      res.status(400).send({ message: "Please fill the required fields." });
    }

    const isEmailRegistered = await User.findOne({ email: email });
    if (isEmailRegistered) {
      return res.status(409).send({
        message:
          "There is already an account with this email. Login in or register with other email.",
      });
    }

    const newUser = await registerUser(
      firstName,
      lastName,
      email,
      age,
      password,
      hobbies
    );
    res.status(201).send({ message: "User registered successfully." });
  } catch (err) {
    console.log("Error at /api/v1/user/register >>>", err.message);
    throw new Error(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const isUserExists = await User.findOne({ email: email });
  // console.log(isUserExists);
  if (!isUserExists) {
    return res.status(404).send({ message: "Wrong Credentials." });
  }

  const getUserFromDb = await loginUser(email, password);
  if (getUserFromDb == null) {
    return res.status(404).send({ message: "Wrong Credentials." });
  } else {
  }

  console.log(`${getUserFromDb.firstName} has logged in >>>>>`);
  const token = await jwt.sign(
    { userId: getUserFromDb._id },
    "adfgfg#443%$2423sg&*85"
  );
  //   console.log("token inside userController : login >>>>", token);
  res.cookie("token", token, {
    expires: new Date(Date.now() + 3600000),
  }); // Expires in 1 hour from now

  return res.status(200).send({ message: "User has been logged in." });
};

const logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send({ message: "User logged out." });
};

const viewSelf = async (req, res, next) => {
  return res.send({ data: req.user });
};

const updateSelf = async (req, res, next) => {
  try {
    const data = req.body;
    // console.log("Data >>>>>", data);
    const id = req.user._id;
    const updatedUser = await updateUser(data, id);
    res.send({
      message: "User details updated successfully.",
      data: updatedUser,
    });
  } catch (err) {
    console.log("Error at /api/v1/user/profile/edit >>>", err.message);
    throw new Error(err);
  }
};

module.exports = {
  register,
  login,
  viewSelf,
  logout,
  updateSelf,
};
