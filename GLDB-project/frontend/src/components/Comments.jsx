import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TopSection from "./TopSection";
import { AuthContext } from "../context/AuthContext";

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { user } = useContext(AuthContext); // get the user from AuthContext
    console.log("user", user); // Add this line to see the value of user
    
    useEffect(() => {
        console.log("Making API call to get comments for post:", postId);
        axios
            .get(`http://localhost:9000/api/posts/${postId}/comments`)
            .then((response) => {
                console.log("API call succeeded with response:", response);
                setComments(response.data);
            })
            .catch((error) => {
                console.log("API call failed with error:", error);
            });
    }, [postId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const comment = {
            content: newComment,
            author: user.username, // set the author as the user's username
            postId: postId,
        };

        axios
            .post("http://localhost:9000/api/comments", comment)
            .then((response) => {
                console.log(response);
                setComments([...comments, response.data]);
                setNewComment("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <h3>Comments:</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>{comment.content}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    required
                />
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

const PostDetails = () => {
    const [post, setPost] = useState(null);
    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Making API call with postId:", postId);
        axios
            .get(`http://localhost:9000/api/posts/${postId}`)
            .then((response) => {
                console.log("API call succeeded with response:", response);
                setPost(response.data);
            })
            .catch((error) => {
                console.log("API call failed with error:", error);
            });
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <TopSection />
            <div className="post-details">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p>Posted By: {post.author}</p>
                <p>Posted At: {new Date(post.createdAt).toLocaleString()}</p>
                <button onClick={() => navigate(`/posts/${postId}/edit`)}>
                    Edit Post
                </button>
                <CommentSection postId={postId} />
            </div>
        </>
    );
};

export default PostDetails;
