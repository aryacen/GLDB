import React, { useContext } from "react";
import ReviewContainer from "./ReviewContainer";
import { AuthContext } from "../context/AuthContext";

const ReviewList = ({ reviews }) => {
  const { dark } = useContext(AuthContext);
  if (reviews.length !== 0) {
    return (
      <div className={dark ? "review-list-dark" : "review-list"}>
        <h2>User Reviews</h2>
        {reviews.map((review) => (
          <ReviewContainer key={review._id} review={review} />
        ))}
      </div>
    );
  } else {
    return (
      <div className={dark ? "review-list-dark" : "review-list"}>
        <h2>User Reviews</h2>
        <h2>No reviews</h2>
      </div>
    );
  }
};

export default ReviewList;
