import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: String,
  author: String,
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  createdAt: { type: Date, default: Date.now },
  pictures: [{ type: String }], // Array of picture URLs
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
