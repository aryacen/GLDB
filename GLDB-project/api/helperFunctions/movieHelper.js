import Review from "../models/Review.js";
import Movies from "../models/Movies.js";

//Get the rating of a movie
export async function getRating(tmdbId) {
  const reviews = await Review.find({ movieId: tmdbId }).catch(function (err) {
    console.log(err);
  });

  let rating = 0;
  for (let i = 0; i < reviews.length; i++) {
    rating = rating + reviews[i].rating;
  }
  if (reviews.length != 0) {
    rating = rating / reviews.length;
  }
  return rating;
}

//Update the rating of a movie
export async function ratingUpdate(tmdbId) {
  const newRating = await getRating(tmdbId);
  Movies.findOneAndUpdate(
    { tmdb_id: tmdbId },
    { rating: newRating },
    { new: true }
  ).catch(function (err) {
    next(err);
  });
}

//Search for something in the database
export async function searchMongo(model, query) {
  try {
    const result = await model.find(query).catch(function (err) {
      next(err);
    });
    return result;
  } catch (err) {
    next(err);
  }
}
