import express from "express";
import {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
  getAllComments
} from "../controllers/comment.js";
import { verify_token } from "../utils/verify_token.js";

const router = express.Router();

// Create a new comment
router.post("/", createComment);

router.get("/", getAllComments);

// Get all comments
router.get("/:postId", getCommentsByPostId);

// Update a comment by ID
router.put("/:id", verify_token, updateComment);

// Delete a comment by ID
router.delete("/:id", verify_token, deleteComment);



export default router;
