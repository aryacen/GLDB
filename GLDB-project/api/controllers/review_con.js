import Review from "../models/Review.js";
import Movies from "../models/Movies.js";
import User from "../models/User.js";
import { ratingUpdate } from "../helperFunctions/movieHelper.js";

//Leave a review
export const leaveReview = async (req, res, next) => {
  //Check if  the movie is in the database, check user identity.
  Movies.findOne({ tmdb_id: req.body.movieId })
    .then((models) => review(models))
    .catch(function (err) {
      next(err);
    });

  const review = async (models) => {
    if (models == null) {
      next(new Error("Can't find movie."));
    } else {
      const reviews = await Review.find({
        movieId: req.body.movieId,
        userId: req.params.id,
      }).catch(function (err) {
        next(err);
      });
      if (reviews.length != 0) {
        next(new Error("You have already reviewed this movie."));
      } else {
        try {
          const newReview = new Review(
            Object.assign({ userId: req.params.id }, req.body)
          );
          await newReview.save().then(async (response) => {
            await ratingUpdate(newReview.movieId);
            res.status(200).json(response);
          });
        } catch (err) {
          next(err);
        }
      }
    }
  };
};

//Get reviews from movie
export const getMovieReview = async (req, res, next) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId }).catch(
      function (err) {
        next(err);
      }
    );
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

//Find the reviews of a user
export const getUserReview = async (req, res, next) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId }).catch(
      function (err) {
        next(err);
      }
    );
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

//Edit Review
export const editReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.body.reviewId);
    if (review.userId == req.params.id) {
      const editedReview = await Review.findByIdAndUpdate(
        req.body.reviewId,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(editedReview);
    } else {
      next(new Error("Can't edit review. Not authorised."));
    }
  } catch (err) {
    next(err);
  }
};

//Delete Review
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.body.reviewId);
    if (review.userId == req.params.id) {
      await Review.findByIdAndDelete(req.body.reviewId);
      res.status(200).json();
      await ratingUpdate(review.movieId);
    } else {
      next(new Error("Can't delete review. Not authorised."));
    }
  } catch (err) {
    next(err);
  }
};

//Like a review
export const likeReview = async (req, res, next) => {
  try {
    const editedReview = await Review.findByIdAndUpdate(
      req.body.reviewId,
      {
        $addToSet: { likes: req.params.id },
        $pull: { dislikes: req.params.id },
      },
      {
        new: true,
      }
    );
    res.status(200).json(editedReview);
  } catch (err) {
    next(err);
  }
};

//Unlike a review
export const unlikeReview = async (req, res, next) => {
  try {
    const editedReview = await Review.findByIdAndUpdate(
      req.body.reviewId,
      {
        $pull: { likes: req.params.id },
      },
      {
        new: true,
      }
    );
    res.status(200).json(editedReview);
  } catch (err) {
    next(err);
  }
};

//Dislike a review
export const dislikeReview = async (req, res, next) => {
  try {
    const editedReview = await Review.findByIdAndUpdate(
      req.body.reviewId,
      {
        $addToSet: { dislikes: req.params.id },
        $pull: { likes: req.params.id },
      },
      {
        new: true,
      }
    );
    res.status(200).json(editedReview);
  } catch (err) {
    next(err);
  }
};

//Undislike a review
export const undislikeReview = async (req, res, next) => {
  try {
    const editedReview = await Review.findByIdAndUpdate(
      req.body.reviewId,
      {
        $pull: { dislikes: req.params.id },
      },
      {
        new: true,
      }
    );
    res.status(200).json(editedReview);
  } catch (err) {
    next(err);
  }
};

//Show the movies rating
export const getAllRating = async (req, res, next) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId }).catch(
      function (err) {
        console.log(err);
      }
    );
    let rating = 0;
    for (let i = 0; i < reviews.length; i++) {
      rating = rating + reviews[i].rating;
    }
    if (reviews.length != 0) {
      rating = rating / reviews.length;
    }
    res.status(200).json(rating);
  } catch (err) {
    next(err);
  }
};

//Get the total likes of a review
export const totalLikes = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    res
      .status(200)
      .json({ TotalLikes: review.likes.length - review.dislikes.length });
  } catch (err) {
    next(err);
  }
};

//Check if the user have left a review on a movie
export const reviewed = async (req, res, next) => {
  let result = { reviewed: false };
  try {
    const reviews = await Review.find({
      movieId: req.params.movieId,
      userId: req.params.id,
    }).catch(function (err) {
      console.log(err);
    });
    if (reviews.length != 0) {
      result.reviewed = true;
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

//Check if a user have liked or disliked a review
export const interacted = async (req, res, next) => {
  let result = { liked: false, disliked: false };
  try {
    const review = await Review.findById(req.params.reviewId);
    if (review.likes.includes(req.params.id)) {
      result.liked = true;
    } else if (review.dislikes.includes(req.params.id)) {
      result.disliked = true;
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

//Get reviews after remove banned user's review
export const getMovieReviewAfterBanned = async (req, res, next) => {
  try {
    const bannedList = await User.findById(req.params.id, {
      banned_list: 1,
      _id: 0,
    });
    if (bannedList == null) {
      next(new Error("Can't find user."));
    }
    const reviews = await Review.find({
      movieId: req.params.movieId,
      userId: { $nin: bannedList.banned_list },
    }).catch(function (err) {
      next(err);
    });
    res.status(200).json(reviews);
    console.log(bannedList.banned_list);
  } catch (err) {
    next(err);
  }
};

//Show the movies rating
export const getRatingAfterBanned = async (req, res, next) => {
  try {
    const bannedList = await User.findById(req.params.id, {
      banned_list: 1,
      _id: 0,
    });
    if (bannedList == null) {
      next(new Error("Can't find user."));
    }
    const reviews = await Review.find(
      { movieId: req.params.movieId, userId: { $nin: bannedList.banned_list } },
      { rating: 1, _id: 0 }
    ).catch(function (err) {
      next(err);
    });
    let rating = 0;
    for (let i = 0; i < reviews.length; i++) {
      rating = rating + reviews[i].rating;
    }
    rating = rating / reviews.length;
    res.status(200).json(rating);
  } catch (err) {
    next(err);
  }
};
