import React, { useState, useEffect, useContext } from "react";
import RatingRead from "./ui/RatingStarsRead";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UserReviewContainer = ({ review, userInfo }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const link = `/profile/${review.userId}`;
  const [likes, setLikes] = useState();
  const [movieName, setMovieName] = useState();

  useEffect(() => {
    setLikes(review.likes.length - review.dislikes.length);
    axios
      .get(`http://localhost:9000/api/movie/details/${review.movieId}`)
      .then((res) => {
        setMovieName(res.data.title);
      })
      .catch((error) => {console.log(error)});
  }, []);

  const handleDelete = () => {
    axios
      .post(`http://localhost:9000/api/review/delete/${review.userId}`, {reviewId: review._id})
      .catch((error) => {console.log(error)});
  }

  return (
    <div className="review-container">
      <Link to={`http://localhost:3000/movie/details/${review.movieId}`}>{ `<<${movieName}>>`}</Link>
      <Link
        to={user ? link : `http://localhost:3000/login`}
        className="review-user-details"
      >
        <img
          src={userInfo.userPic}
          alt="Profile Picture"
          className="profile-picture"
        />
        <span>{userInfo.userName}</span>
        {userInfo.userpro ? (
          <img
            src={require("../assets/prologo.png")}
            className="user-pro_logo"
          ></img>
        ) : (
          <></>
        )}
      </Link>
      <h2 className="review-title">{review.title}</h2>
      <div className="review-content">
        {review.content}
        <div className="rating">
          <RatingRead rating={review.rating} />
        </div>
      </div>
      <div className="buttons-container">
        <div className="likes-count">{likes} likes</div>
        {userInfo.auth?(<button onClick={() => handleDelete()}>Delete</button>):<></>}
      </div>
    </div>
  );
};

export default UserReviewContainer;
