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

module.exports = {
  sendRequest,
  reviewRequest,
};
