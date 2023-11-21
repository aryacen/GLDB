import express from "express";
import { ban_user, unban_user } from "../controllers/bannedList.js";


const router = express.Router();

router.post("/ban/:id", ban_user);
router.post("/unban/:id", unban_user);


export default router

