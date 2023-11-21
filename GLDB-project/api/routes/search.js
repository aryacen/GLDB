import express from "express";
import { search_query } from "../controllers/search.js";

const router = express.Router();

router.get("/:prompt", search_query);

export default router;