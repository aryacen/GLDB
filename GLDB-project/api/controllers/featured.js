import mongoose from "mongoose";
import { getRating } from "../helperFunctions/movieHelper.js";
import User from "../models/User.js";
import Movies from "../models/Movies.js";
import Review from "../models/Review.js";

export const featured = async (req, res, next) => {
    try {
        const db = mongoose.connection.db;
        const moviesCollection = db.collection('MoviesInfo');
        // Get the top 15 rated movies
        const result = await moviesCollection.aggregate([
            {
                $sort: { rating: -1 }
            }, {
                $project: { title: 1, rating: 1, tmdb_id: 1, _id: 0 }
            }, {
                $limit: 15
            },
        ]).toArray();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const personalised_rec = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const preferred_genres = user.preferred_genres;

        const batchSize = 30;
        let page = 0;
        let keepFetching = true;
        let filteredMovies = [];

        while (keepFetching) {
            const allMovies = await Movies.find({})
                .skip(batchSize * page)
                .limit(batchSize)
                .lean();

            if (allMovies.length === 0) {
                keepFetching = false;
            } else {
                const parsedMovies = allMovies.map((movie) => {
                    const genresArray = movie.genres ? JSON.parse(movie.genres) : [];
                    return { ...movie, genres: genresArray };
                });

                filteredMovies = filteredMovies.concat(
                    parsedMovies.filter((movie) =>
                        movie.genres.some((genre) => preferred_genres.includes(genre.name))
                    )
                );

                if (filteredMovies.length >= 10) {
                    keepFetching = false;
                }
            }

            page++;
        }

        const sortedMovies = filteredMovies
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 10);

        res.status(200).json(sortedMovies);
    } catch (err) {
        next(err);
    }
};

export const browse = async (req, res, next) => {
    try {
        const genreId = parseInt(req.params.genreId);
        const page = parseInt(req.query.page) || 1;

        const batchSize = 500;

        const moviesPerPage = parseInt(req.query.moviesPerPage) || 30;
        const skip = (page - 1) * batchSize;

        const allMovies = await Movies.find({})
            .skip(skip)
            .limit(batchSize)
            .lean();

        const parsedMovies = allMovies.map((movie) => {
            const genresArray = movie.genres ? JSON.parse(movie.genres) : [];
            return { ...movie, genres: genresArray };
        });

        const filteredMovies = parsedMovies.filter((movie) =>
            movie.genres.some((genre) => genre.id === genreId)
        );

        const sortedMovies = filteredMovies.sort((a, b) => {
            const ratingDiff = b.rating - a.rating;
            if (ratingDiff !== 0) {
                return ratingDiff;
            }

            const titleA = typeof a.title === 'string' ? a.title : '';
            const titleB = typeof b.title === 'string' ? b.title : '';

            return titleA.localeCompare(titleB);
        }).slice(0, moviesPerPage);

        res.status(200).json(sortedMovies);
    } catch (err) {
        next(err);
    }
};





