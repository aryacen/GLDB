import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    genres: {
      type: String,
    },
    tmdb_id:{
      type: Number,
    },
    keywords: {
      type: String,
    },
    overview: {
      type: String,
    },
    tagline: {
      type: String,
    },
    rating: {
      type: Number
    }
  }
);


export default mongoose.model('Movies', movieSchema, 'MoviesInfo');
