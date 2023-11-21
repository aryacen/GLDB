import React from "react";
import UserReviewContainer from "./UserReviewContainer";

const UserReviewList = ({ reviews, userInfo }) => {
  if (reviews.length !== 0) {
    return (
      <div className="user-review-list">
        <h2>User Reviews</h2>
        {reviews.map((review) => (
          <UserReviewContainer key={review._id} review={review} userInfo={userInfo}/>
        ))}
      </div>
    );
  }
  else {
    return(<div><h2>User Reviews</h2><h2>No reviews</h2></div>)
  }
};

export default UserReviewList;
