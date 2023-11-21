import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import TopSection from "./TopSection";


const CommentForm = ({ handleSubmit, newComment, setNewComment, handleImageUpload }) => {
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        value={newComment}
        onChange={(event) => setNewComment(event.target.value)}
        required
      />
      <label htmlFor="image-upload" className="image-upload-label">
        Upload an image or GIF
      </label>
      <input
        id="image-upload"
        type="file"
        onChange={handleImageUpload}
        accept="image/*,.gif"
        className="hidden-input"
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

const CommentSection = ({ postId, comments, setComments }) => {
  const [newComment, setNewComment] = useState("");
  const { user, dark } = useContext(AuthContext);
  const [imageData, setImageData] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageData(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImageData(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const comment = {
      content: newComment,
      postId: postId,
      author: user.username,
      pictures: imageData ? [imageData] : [],
    };


    axios
      .post("http://localhost:9000/api/comments", comment)
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment("");
        setImageData(null); // Reset the imageData after submitting
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Filter the comments array to only show comments with matching postId
  const filteredComments = comments.filter((comment) => comment.postId === postId);
  //show loading state
  if (!comments) {
    return <div className="loading_container">
      <img
        src={require("../assets/loading_gif.gif")}
        alt=""
        className="loading-gif-img"
      />
    </div>
  }
  return (
    <div className={dark ? "comment-section_dark" : "comment-section"}>
      <h3>Comments:</h3>
      <ul>
        {filteredComments.map((comment) => (
          <li key={comment._id}>
            <p>Content: {comment.content}</p>
            <p>Author: {comment.author}</p>
            <p>Posted At: {new Date(comment.createdAt).toLocaleString()}</p>
            {comment.pictures && comment.pictures.length > 0 && (
              <div className="comment-img-wrapper">
                <img src={comment.pictures[0]} alt="Comment" className="comment-section-img" />
              </div>
            )}

          </li>
        ))}
      </ul>
      <CommentForm
        handleSubmit={handleSubmit}
        newComment={newComment}
        setNewComment={setNewComment}
        handleImageUpload={handleImageUpload}
      />
    </div>
  );
};



const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const { dark } = useContext(AuthContext);
  // const navigate = useNavigate();

  useEffect(() => {
    console.log("Making API call with postId:", postId);
    axios
      .get(`http://localhost:9000/api/posts/${postId}`)
      .then((response) => {
        console.log("API call succeeded with response:", response);
        setPost(response.data);
      })
      .catch((error) => {
        console.log("API call failed with error1:", error);
      });
  }, [postId]);

  useEffect(() => {
    console.log("Making API call to get comments for post:", postId);
    axios
      .get(`http://localhost:9000/api/comments?postId=${postId}`)
      .then((response) => {
        console.log("API call succeeded with response:", response);
        setComments(response.data);
      })
      .catch((error) => {
        console.log("API call failed with error:", error);
      });

  }, [postId]);


  // const handleEditClick = () => {
  //   navigate(`/posts/${postId}/edit`);
  // };

  if (!post) {
    return <div className="loading_container">
      <img
        src={require("../assets/loading_gif.gif")}
        alt=""
        className="loading-gif-img"
      />
    </div>
  }

  return (
    <>
      <TopSection />
      <div className="post-page">
        <div className={dark ? "main-post_dark" : "main-post"}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p className="posted-by">Posted By: {post.username}</p>
          <p className="post-date">Posted At: {new Date(post.createdAt).toLocaleString()}</p>
        </div>
        <div className="comment-container">
          {/* <button onClick={handleEditClick}>Edit Post</button> */}
          <CommentSection
            postId={postId}
            comments={comments}
            setComments={setComments}
          />
        </div>
      </div>
    </>
  );
};

export default PostDetails;
