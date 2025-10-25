const express = require("express");
const {
  sendConnectionRequest,
  reviewConnectionRequest,
} = require("../controller/connectionController");
const { userAuth } = require("../middleware/auth");

const connectionRouter = express.Router();

connectionRouter.post(
  "/request/:status/:toUserId",
  userAuth,
  sendConnectionRequest
);

connectionRouter.post(
  "/review/:status/:reqId",
  userAuth,
  reviewConnectionRequest
);

module.exports = {
  connectionRouter,
};
