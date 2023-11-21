import Movies from "../models/Movies.js";
import Cast from "../models/Cast.js";
import { getRating } from "../helperFunctions/movieHelper.js";

//Get a movie detail
export const movieDetails= async (req, res, next) => {
  let result = {"title":"", "genres":[], "rating":0, "keywords":[], "overview":[], "tagline":"", "casts":[], "director":""};
  const movie = await Movies.findOne({ tmdb_id : parseInt(req.params.movieId)});
  const cast = await Cast.findOne({ movie_id : parseInt(req.params.movieId)});
  if (movie == null) {
    next(new Error("Can't find movie."));
  }
  else {
    result.rating = await getRating(parseInt(req.params.movieId));
    result.title = movie.title;
    result.keywords = JSON.parse(movie.keywords);
    result.genres = JSON.parse(movie.genres);
    result.casts = JSON.parse(cast.cast);
    result.overview = movie.overview;
    result.tagline = movie.tagline;

    //Find the director
    let crews = JSON.parse(cast.crew);
    
    result.director = crews.find(item => item.job === "Director");

    res.status(200).json(result);
  }
};



