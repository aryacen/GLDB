import mongoose from "mongoose";

const castSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    movie_id:{
      type: Number,
    },
    cast: {
      type: String,
    },
    crew: {
      type: String,
    }
  }
);


export default mongoose.model('Casts', castSchema, 'MoviesCast');