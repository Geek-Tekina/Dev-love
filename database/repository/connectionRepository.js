const { ConnectionRequest } = require("../models/connectionRequest");

const sendRequest = async (fromUserId, toUserId, status) => {
  //check if connection is already present
  const existingConnReq = await ConnectionRequest.findOne({
    $or: [
      { fromUserId: fromUserId, toUserId: toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
  });
  if (existingConnReq) {
    return null;
  }
  const newRequest = await new ConnectionRequest({
    fromUserId: fromUserId,
    toUserId: toUserId,
    status: status,
  });

  await newRequest.save();

  return newRequest;
};

const reviewRequest = async (reqId, status, loggedInUserId) => {
  const req = await ConnectionRequest.findOne({
    _id: reqId,
    toUserId: loggedInUserId,
    status: "interested",
  });
  if (!req) {
    return null;
  }

  req.status = status;

  await req.save();
  return req;
};

const pendingRequest = async (userId) => {
  const pendingReq = await ConnectionRequest.find({
    toUserId: userId,
    status: "interested",
  })
    .populate("fromUserId", "firstName lastName")
    .select("fromUserId");
  if (!pendingReq[0]) {
    return null;
  }
  return pendingReq;
};

const getConnections = async (userId) => {
  const connc = await ConnectionRequest.find({
    $or: [
      { toUserId: userId, status: "accepted" },
      { fromUserId: userId, status: "accepted" },
    ],
  })
    .populate("fromUserId", "firstName lastName")
    .populate("toUserId", "firstName lastName")
    .select("fromUserId");

  if (!connc[0]) return null;

  const data = connc.map((row) => {
    if (row.fromUserId._id.toString() === userId.toString()) {
      return row.toUserId;
    }
    return row.fromUserId;
  });
  return data;
};

module.exports = {
  sendRequest,
  reviewRequest,
  pendingRequest,
  getConnections,
};
