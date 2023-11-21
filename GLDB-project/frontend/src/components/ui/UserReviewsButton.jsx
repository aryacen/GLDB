import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserReviewsButton = (id) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickReviews = () => {
    if (user) {
      navigate(`/review/userReviews/${id.id}`);
    } else {
      navigate("/login");
    }
  };
  const handleClickCalendars = () => {
    if (user) {
      navigate(`/calendar/${id.id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="usermenu-button-container">
      <button className="user-reviews-button" onClick={handleClickReviews}>
        <img
          src={require("../../assets/UserReviews_icon.png")}
          alt="view review"
          className="review-logo"
          title="view review"
        />
      </button>
      <button className="user-calendar-button" onClick={handleClickCalendars}>
        <img
          src={require("../../assets/calendar_icon.png")}
          alt="view calendar"
          className="view-calendar-logo"
          title="calendar"
        />
      </button>
    </div>
  );
};

export default UserReviewsButton;