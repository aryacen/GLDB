import User from "../models/User.js";
import { create_error } from "../utils/error.js";

//Add movie to wishlist
export const addToWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const movie = {
      movieId: req.body.movieId,
      movieTitle: req.body.movieTitle,
      moviePoster: req.body.moviePoster,
    };
    user.wish_list.push(movie);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//Remove movie from wishlist
export const removeFromWishlist = async (req, res, next) => {
  try { 
    const user = await User.findById(req.params.id);
    const movieId = req.body.movieId;

    const movieIndex = user.wish_list.findIndex(movie => movie.movieId === movieId);
    user.wish_list.pull(user.wish_list[movieIndex]);

    await user.save();
    res.status(200).json(user);

  } catch (err) {
    next(err);
  }
};

export const getWishlist = async (req, res, next) => {
  try { 
    const user = await User.findById(req.params.id);
    const output = {
      username: user.username,
      wish_list: user.wish_list,
    }
    res.status(200).json(output);
  } catch(err) {
    next(err);
  }
};

export const inWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);
    let exist = false;
    user.wish_list.map((item) => {
      if (item.movieId == req.body.movieId) {
        exist = true;
      }
    });

    if (exist) {
      res.status(200).json(true);
    }
    res.status(200).json(false);
  } catch(err) {
    next(err);
  }
};