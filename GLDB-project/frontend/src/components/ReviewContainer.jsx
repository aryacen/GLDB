import React, { useState, useEffect, useContext } from 'react';
import RatingRead from './ui/RatingStarsRead';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ReviewContainer = ({ review }) => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState();
  const [profilePic, setProfilePic] = useState();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [pro, setPro] = useState(false);
  const navigate = useNavigate();
  const link = `/profile/${review.userId}`;
  const [likes, setLikes] = useState();
  const [loaded, setLoaded] = useState(false);

  const handleLike = (reviewId) => {
    if (user == null) {
      navigate('/login');
    } else if (!liked) {
      axios
        .post(`http://localhost:9000/api/review/like/${user._id}`, {
          reviewId: reviewId,
        })
        .then((response) => {
          console.log(response);
          setLiked(true);
          if (disliked) {
            setDisliked(false);
            setLikes(likes + 2);
          } else {
            setLikes(likes + 1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(`http://localhost:9000/api/review/unlike/${user._id}`, {
          reviewId: review._id,
        })
        .then((response) => {
          console.log(response);
          setLiked(false);
          setLikes(likes - 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDislike = (reviewId) => {
    if (user == null) {
      navigate('/login');
    } else if (!disliked) {
      axios
        .post(`http://localhost:9000/api/review/dislike/${user._id}`, {
          reviewId: reviewId,
        })
        .then((response) => {
          console.log(response);
          setDisliked(true);
          if (liked) {
            setLiked(false);
            setLikes(likes - 2);
          } else {
            setLikes(likes - 1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(`http://localhost:9000/api/review/undislike/${user._id}`, {
          reviewId: review._id,
        })
        .then((response) => {
          console.log(response);
          setDisliked(false);
          setLikes(likes + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    console.log('This is a loop checker');
    setLikes(review.likes.length - review.dislikes.length);
    if (user != null) {
      setLiked(review.likes.includes(user._id));
      setDisliked(review.dislikes.includes(user._id));
    }
    axios
      .get(`http://localhost:9000/api/users/${review.userId}`)
      .then((response) => {
        setUsername(response.data.username);
        setProfilePic(response.data.profile_picture);
        setPro(response.data.pro_user);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {loaded ? (
        <div className='review-container'>
          <Link to={user?(link):`/login`} className='review-user-details'>
            <img
              src={profilePic}
              alt='Profile Picture'
              className='profile-picture'
            />
            <span>{username}</span>
            {pro ? (
              <img
                src={require('../assets/prologo.png')}
                className='user-pro_logo'
              ></img>
            ) : (
              <></>
            )}
          </Link>
          <h2 className='review-title'>{review.title}</h2>
          <div className='review-content'>
            {review.content}
            <div className='rating'>
              <RatingRead rating={review.rating} />
            </div>
          </div>

          <div className='buttons-container'>
            <div className='likes-count'>{likes} likes</div>
            <button
              className={liked ? 'like-button-liked' : 'like-button'}
              onClick={() => handleLike(review._id)}
            >
              like
            </button>
            <button
              className={
                disliked ? 'dislike-button-disliked' : 'dislike-button'
              }
              onClick={() => handleDislike(review._id)}
            >
              dislike
            </button>
          </div>
        </div>
      ) : (
        <div className='loading_container'>
          <img
            src={require('../assets/loading_gif.gif')}
            className='loading-gif-img'
          />
          <h3>Loading Review...</h3>
        </div>
      )}
    </>
  );
};

export default ReviewContainer;
