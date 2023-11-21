import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Rating from "./ui/RatingStars";

const NewReviewForm = (movieId) => {
  const { user } = useContext(AuthContext); // get the user from AuthContext
  const [rating, setRating] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reviewLeft, setReviewLeft] = useState(false);
  const [errorOccured, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newReview = {
      movieId: movieId.movieId,
      title: title,
      rating: rating,
      content: content, // set the author as the user ID
    };

    axios
      .post(`http://localhost:9000/api/review/post/${user._id}`, newReview)
      .then((response) => {
        console.log(response);
        setReviewLeft(true);
      })
      .catch((error) => {
        const errorMessage = error.response.data.match(/<pre>(.*?)<\/pre>/)[1];
        const message = errorMessage.split("<br>")[0];
        setError(message);
      });
  };

  return (
    <>
      {errorOccured ? (
        <div className="review-posted">
          <h2>{errorOccured}</h2>
        </div>
      ) : reviewLeft ? (
        <div className="review-posted">
          <h2>Thanks for your review!</h2>
        </div>
      ) : (
        <form className="new-review-form" onSubmit={handleSubmit}>
          <h2>New Review</h2>
          <h3>Review Title</h3>
          <input
            type="text"
            className="new-review-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          ></input>
          <Rating rating={rating} onRatingChange={setRating} />
          <h3>Content</h3>
          <textarea
            className="new-review-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          ></textarea>
          <button className="post-review" type="submit">
            Post
          </button>
        </form>
      )}
    </>
  );
};

export default NewReviewForm;
