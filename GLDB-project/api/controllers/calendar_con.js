import User from "../models/User.js";

//Add an event
export const addEvent = async (req, res, next) => {
  try {
    let newEventId = "";
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { events: req.body.event },
      },
      {
        new: true,
        projection: { events: 1 },
      }
    )
    .then((res) => (newEventId = res.events[res.events.length-1]._id));

    res.status(200).json(newEventId);
  } catch (err) {
    next(err);
  }
};

//Remove an event
export const removeEvent = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { events: { _id : req.body.eventId } },
      },
      {
        new: true,
        projection: { events: 1 },
      }
    );
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//Change an event
export const changeEvent = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { events: { _id : req.body.eventId } },
      },
      {
        new: true,
        projection: { events: 1 },
      }
    );
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//Remove an event
export const getEvents = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user.events);
  } catch (err) {
    next(err);
  }
};
