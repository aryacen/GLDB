
import User from "../models/User.js";
import Movies from "../models/Movies.js";

export const getMovies = async (req, res, next) => {
    try {
        let movieIds = [];
        const user = await User.findById(req.params.id);
        const friend_list = user.friends_list;

        await Promise.all(
            friend_list.map(async (friend) => {
                const friendObj = await User.findById(friend.userId);
                friendObj.watched_movies.forEach((movie) => {
                    movieIds.push(movie.movieId);
                });
            })
        );
        const movies = await Movies.find({ tmdb_id: { $in: movieIds } });
        res.status(200).json(movies);
    } catch (err) {
        next(err);
    }
};