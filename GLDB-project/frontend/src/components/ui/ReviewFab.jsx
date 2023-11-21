import React, { useState, useContext} from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import NewReviewForm from '../NewReviewForm';

const AddReviewButton = (movieId) => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleClick = () => {
    if(user) {
      if (!showForm) {
        setShowForm(!showForm);
      }
      else {
        setShowForm(!showForm);
        window.location.reload();
      }      
    }
    else {
      navigate("/login");
    }
  };

  return (
    <div className="add-review-button-container">
      <button className="add-review-button" onClick={handleClick}>
      <img
          src={require("../../assets/review_icon.png")}
          alt="Add Review"
          className="review-logo"
          title="Add a review"
        />
      </button>
      {showForm && (
        <div>
          <NewReviewForm movieId = {movieId.movieId}/>
          <div className='new-review-background' onClick={handleClick}></div>
        </div>
      )}
    </div>
  );
};

export default AddReviewButton;