import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    movieId:{
      type: Number,
      required: true,
    },
    title:{
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
      min: 1,
      max: 5,
      validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      }
    },
    content: {
      type: String,
      required: true,
    },
    reply: {
      type: [String],
    },
    likes: {
      type: [String],
    },
    dislikes: {
      type: [String],
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", reviewSchema);
