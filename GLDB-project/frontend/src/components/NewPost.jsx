import React from "react";
import NewPostForm from "./NewPostForm";
import { Link } from "react-router-dom";

const NewPost = () => {
  return (
    <div className="new-post">
      <h2>Create a New Post</h2>

      <Link to="/new-post">
        <NewPostForm />
      </Link>
    </div>
  );
};

export default NewPost;
