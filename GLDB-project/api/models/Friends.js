import mongoose from 'mongoose';

const FriendsSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
});

export default mongoose.model("Friend", FriendsSchema);