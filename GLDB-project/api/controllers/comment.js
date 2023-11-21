import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

// CREATE a new comment for a post
const createComment = async (req, res, next) => {
    try {
        const { content, author, postId, pictures } = req.body;

        // Convert image data to a string before storing it in the database
        const pictureStrings = pictures.map((picture) => picture.toString());

        const newComment = new Comment({
            content,
            author,
            postId,
            pictures: pictureStrings,
        });
        await newComment.save();

        // Add new comment's _id to the comments array of the corresponding post
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: newComment._id } },
            { new: true }
        ).exec();

        console.log(
            `Received new comment with content: ${content} from author: ${author} for post: ${postId}`
        );

        res.status(201).json(newComment);
    } catch (err) {
        next(err);
    }
};




// READ all comments for a post
const getCommentsByPostId = async (req, res) => {
    console.log("getCommentsByPostId function called"); // print message to console
    try {
        const postId = req.params.postId;

        const comments = await Comment.find({ postId }).exec();

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE a comment for a post
const updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            req.body,
            { new: true }
        ).exec();

        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE a comment for a post
const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        await Comment.findByIdAndDelete(commentId).exec();

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find().exec();

        res.json(comments);
    } catch (err) {
        next(err);
    }
};


export { createComment, updateComment, deleteComment, getCommentsByPostId, getAllComments };
