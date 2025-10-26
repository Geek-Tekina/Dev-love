const express = require("express");
const {
  sendConnectionRequest,
  reviewConnectionRequest,
  pendingConnectionRequest,
  connections,
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

connectionRouter.get("/pending", userAuth, pendingConnectionRequest);

connectionRouter.get("/getConnections", userAuth, connections);

module.exports = {
  connectionRouter,
};
