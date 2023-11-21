import mongoose from 'mongoose';

const FriendReqestSchema = new mongoose.Schema({
    sender: {
        type: String, required: true
    },
    receiver: {
        type: String, required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending',
    },
});

export default mongoose.model("FriendRequests", FriendReqestSchema);