import express from "express";
import { addToWishlist, getWishlist, inWishlist, removeFromWishlist } from "../controllers/wishilist_con.js";

const router = express.Router();

//Add movies to wishlist
router.put("/add/:id", addToWishlist);

//Remove movies from wishlist
router.put("/remove/:id", removeFromWishlist);

router.get("/:id", getWishlist);

router.post("/inwishlist", inWishlist);

export default router;