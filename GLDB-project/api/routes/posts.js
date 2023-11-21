import express from "express";
import {
  create_post,
  get_all_posts,
  get_post_by_id,
  update_post,
  delete_post,
} from "../controllers/post.js";
import { verify_token } from "../utils/verify_token.js";

const router = express.Router();

// Create a new post
router.post("/", create_post);

// Get all posts
router.get("/", get_all_posts);

// Get a specific post by ID
router.get("/:id", get_post_by_id);

// Update a post by ID
router.put("/:id", verify_token, update_post);

// Delete a post by ID
router.delete("/:id", delete_post);

export default router;
