const jwt = require("jsonwebtoken");
const { User } = require("../database/models/user");

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log("token inside auth >>>", token);
  if (!token) {
    return res
      .status(401)
      .send({ message: "You are not logged in. Login first to hit this api." });
  }

  const decodedData = jwt.verify(token, "adfgfg#443%$2423sg&*85");
  const { userId } = decodedData;

  const user = await User.findById(userId);
  console.log(user);
  req.user = user;
  next();
};

module.exports = {
  userAuth,
};
