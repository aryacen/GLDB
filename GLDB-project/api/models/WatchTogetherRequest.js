import mongoose from "mongoose";
import event from "./Event.js";

const WatchTogetherReqestSchema = new mongoose.Schema({
  sender: {
    type: {
      id: { type: String, required: true },
      propic: { type: String, required: true },
      userName: { type: String, required: true },
    },
    required: true,
  },
  receiver: {
    type: {
      id: { type: String, required: true },
      propic: { type: String, required: true },
      userName: { type: String, required: true },
    },
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  event: {
    type: event,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
});

export default mongoose.model("WatchTogetherReqest", WatchTogetherReqestSchema);
