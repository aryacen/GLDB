import User from "../models/User.js";
import WatchTogetherRequest from "../models/WatchTogetherRequest.js";

//Add a request
export const addRequest = async (req, res, next) => {
  let request = req.body;
  request.status = "pending";
  const existingRequest = WatchTogetherRequest.find({
    "sender.id": request.sender.id,
    "receiver.id": request.receiver.id,
    status:"pending"
  });
  if ((await existingRequest).length > 0) {
    res.status(200).json({
      success: false,
      message: "You have unaccepted invites with this user",
    });
  } else {
    try {
      const newRequest = new WatchTogetherRequest(Object.assign(request));
      await newRequest.save().then(async (response) => {
        res.status(200).json({
          success: true,
          message: "",
        });
      });
    } catch (err) {
      next(err);
    }
  }
};

//Remove a request
export const removeRequest = async (req, res, next) => {
  try {
    const request = req.body;
    await WatchTogetherRequest.findByIdAndRemove(request._id);

    if ((await WatchTogetherRequest.findById(request._id)).length == 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (err) {
    next(err);
  }
};

//Accept a request
export const acceptRequest = async (req, res, next) => {
  const userId = req.params.id;
  const request = req.body;

  if (request.receiver.id == userId && request.status == "pending") {
    try {
      const updatedRequest = await WatchTogetherRequest.findByIdAndUpdate(
        request._id,
        { status: "accepted" },
        { new: true }
      );

      await User.findByIdAndUpdate(
        request.receiver.id,
        {
          $addToSet: { events: request.event },
        },
        {
          new: true,
          projection: { events: 1 },
        }
      );

      await User.findByIdAndUpdate(
        request.sender.id,
        {
          $addToSet: { events: request.event },
        },
        {
          new: true,
          projection: { events: 1 },
        }
      );
    } catch (err) {
      next(err);
    }
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false });
  }
};

//Decline a request
export const declineRequest = async (req, res, next) => {
  const userId = req.params.id;
  const request = req.body;

  if (request.receiver.id == userId && request.status == "pending") {
    try {
      const updatedRequest = await WatchTogetherRequest.findByIdAndUpdate(
        request._id,
        { status: "declined" },
        { new: true }
      );
    } catch (err) {
      next(err);
    }
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false });
  }
};

// Get request sent by user
export const getSentRequest = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const requests = await WatchTogetherRequest.find({
      "sender.id": userId,
    }).then((response) => {
      res.status(200).json(response);
    });
  } catch (err) {
    next(err);
  }
};

// Get request received by user
export const getReceivedRequest = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const requests = await WatchTogetherRequest.find({
      "receiver.id": userId,
    }).then((response) => {
      res.status(200).json(response);
    });
  } catch (err) {
    next(err);
  }
};
