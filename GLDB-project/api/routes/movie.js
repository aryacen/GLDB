import express from "express";
import { movieDetails } from "../controllers/detail_con.js";
import { browse, featured, personalised_rec } from "../controllers/featured.js";
import { getMovies } from "../controllers/friendswatching.js";


const router = express.Router();

router.get("/details/:movieId", movieDetails);
router.get("/featured", featured);
router.get("/friendswatching/:id", getMovies);
router.get("/recommendations/:id", personalised_rec);
router.get("/browse/:genreId", browse);

export default router;