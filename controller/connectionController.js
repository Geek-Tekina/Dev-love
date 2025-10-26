const {
  sendRequest,
  reviewRequest,
  pendingRequest,
  getConnections,
} = require("../database/repository/connectionRepository");

const sendConnectionRequest = async (req, res, next) => {
  try {
    const { toUserId, status } = req.params;

    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).send({ message: "Invalid Status." });
    }

    const fromUserId = req.user._id;

    if (fromUserId == toUserId) {
      return res
        .status(400)
        .send({ message: "Invalid request. Can not send request to self." });
    }

    const connReq = await sendRequest(fromUserId, toUserId, status);
    if (connReq == null) {
      return res
        .status(409)
        .send({ message: "Connection request already exists." });
    }

    return res.send({
      message: "Connection Sent successfully.",
      data: connReq,
    });
  } catch (err) {
    console.log("Error at /api/v1/connection/request >>>", err.message);
    throw new Error(err);
  }
};

const reviewConnectionRequest = async (req, res, next) => {
  try {
    const { status, reqId } = req.params;

    const allowedStatus = ["rejected", "accepted"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).send({ message: "Invalid status." });
    }

    const loggedInUserId = req.user._id;

    const reviewdReq = await reviewRequest(reqId, status, loggedInUserId);
    if (reviewdReq == null) {
      return res.status(404).send({ message: "No connection found." });
    }

    return res.send({
      message: "Connection request successfully reviewed.",
      data: reviewdReq,
    });
  } catch (err) {
    console.log("Error at /api/v1/connection/review >>>", err.message);
    throw new Error(err);
  }
};

const pendingConnectionRequest = async (req, res, next) => {
  try {
    const pendingReqs = await pendingRequest(req.user._id);
    if (pendingReqs == null) {
      return res.send({ message: "No pending connection requests" });
    }
    return res.send({
      message: "These are pending connection requests.",
      data: pendingReqs,
    });
  } catch (err) {
    console.log("Error at /api/v1/connection/pending >>>", err.message);
    throw new Error(err);
  }
};

const connections = async (req, res, next) => {
  try {
    const connections = await getConnections(req.user._id);
    if (connections == null) {
      return res.send({ message: "You have no connections." });
    }
    return res.send({
      message: "These are your connections.",
      data: connections,
    });
  } catch (err) {
    console.log("Error at /api/v1/connection/getConnections >>>", err.message);
    throw new Error(err);
  }
};

module.exports = {
  sendConnectionRequest,
  reviewConnectionRequest,
  pendingConnectionRequest,
  connections,
};
