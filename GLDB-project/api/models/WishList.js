import mongoose from 'mongoose';
const { Schema } = mongoose;

const wishlistSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true
    },
    wishlsName: {
        type: String,
        required: true
    },
    desc: {
      type: String,
      required:true
    },
    wishlist: {
      type: [String]
    },
});

export default mongoose.model("Wishlist", wishlistSchema);