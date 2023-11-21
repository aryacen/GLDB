import express from "express";
import { deleteReview, dislikeReview, editReview, getMovieReview, getUserReview, getAllRating, interacted, leaveReview, likeReview, reviewed, totalLikes, undislikeReview, unlikeReview, getMovieReviewAfterBanned, getRatingAfterBanned } from "../controllers/review_con.js";

const router = express.Router();

//Leave a review
router.post("/post/:id", leaveReview);
router.post("/edit/:id", editReview);
router.get("/getMovieAll/:movieId",getMovieReview);
router.get("/getUserAll/:userId",getUserReview);
router.delete("/delete/:id",deleteReview);
router.post("/like/:id",likeReview);
router.post("/unlike/:id",unlikeReview);
router.post("/dislike/:id",dislikeReview);
router.post("/undislike/:id",undislikeReview);
router.post("/delete/:id",deleteReview);
router.get("/rating/:movieId",getAllRating);
router.get("/totalLikes/:reviewId",totalLikes);
router.get("/reviewed/:id/:movieId",reviewed);
router.get("/interacted/:id/:reviewId", interacted);
router.get("/getReviewRemoveBanned/:id/:movieId",getMovieReviewAfterBanned);
router.get("/getRatingRemoveBanned/:id/:movieId",getRatingAfterBanned);
export default router;