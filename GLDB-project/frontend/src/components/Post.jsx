import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Forums = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deletePost = (postId) => {
    axios
      .delete(`http://localhost:9000/api/posts/${postId}`)
      .then((response) => {
        setPosts(posts.filter((post) => post._id !== postId));
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const renderPosts = () => {
    return (
      <div className="post-list">
        {posts.map((post) => {
          return (
            <div key={post._id} className="post">
              <Link to={`/posts/${post._id}`}>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>
                <p className="post-details">Posted at: {new Date(post.createdAt).toLocaleString()}</p>
                {user && <p className="post-details">Posted By: {post.username}</p>}
              </Link>
              {user && user.username === post.username && (
                <button onClick={() => deletePost(post._id)}>Delete</button>
              )}
            </div>
          );
        })}
      </div>
    );
  };


  return (
    <div className="forums">
      <h2>Forums</h2>
      <Link to="/new-post" className="create-new-post-btn">Create New Post</Link>
      <div className="posts">{renderPosts()}</div>
    </div>
  );
};

export default Forums;
