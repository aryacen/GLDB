import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TopSection from "./TopSection";
import { AuthContext } from "../context/AuthContext";

const NewPostForm = () => {
  const { user } = useContext(AuthContext); // get the user from AuthContext
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postCreated, setPostCreated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      title: title,
      content: content,
      author: user._id, // set the author as the user ID
      username: user.username,
    };

    axios
      .post("http://localhost:9000/api/posts", newPost)
      .then((response) => {
        console.log(response);
        setTitle("");
        setContent("");
        setPostCreated(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <TopSection />
      <div className="new-post-form">
        <h2>Create New Post</h2>
        {postCreated && <p>Post successfully created!</p>}
        {user ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
            <div>
              <label>Content:</label>
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                required
              />
            </div>
            <input
              type="hidden"
              name="author"
              value={user._id} // set the author to the user ID
            />
            <button type="submit">Create Post</button>
          </form>
        ) : (
          <p>Please log in to create a post.</p>
        )}
        <Link to="/forums">
          <button>Back to Forums</button>
        </Link>
      </div>
    </>
  );
};

export default NewPostForm;
