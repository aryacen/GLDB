import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserMenuButton = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickBanned = () => {
    if (user) {
      navigate(`/bannedusers/${user._id}`);
    } else {
      navigate("/login");
    }
  };

  const handleClickReviews = () => {
    if (user) {
      navigate(`/review/userReviews/${user._id}`);
    } else {
      navigate("/login");
    }
  };

  const handleClickCalendars = () => {
    if (user) {
      navigate(`/calendar/${user._id}`);
    } else {
      navigate("/login");
    }
  };

  const handleClickWatchRequests = () => {
    if (user) {
      navigate(`/watchreqlist`);
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="usermenu-button-container">
      <button className="banned-user-button" onClick={handleClickBanned}>
        <img
          src={require("../../assets/banned_user_icon.png")}
          alt="View Banned Users"
          className="view-banned-logo"
          title="View Banned User"
        />
      </button>

      <button className="user-reviews-button" onClick={handleClickReviews}>
        <img
          src={require("../../assets/UserReviews_icon.png")}
          alt="View Reviews"
          className="view-review-logo"
          title="View Review"
        />
      </button>

      <button className="user-calendar-button" onClick={handleClickCalendars}>
        <img
          src={require("../../assets/calendar_icon.png")}
          alt="View Calendar"
          className="view-calendar-logo"
          title="View Calendar"
        />
      </button>

      <button className="watch-together-button" onClick={handleClickWatchRequests}>
        <img
          src={require("../../assets/review_icon.png")}
          alt="Request Watch Together"
          className="request-logo"
          title="View Watch Together Requests"
        />
      </button>
    </div>
  );
};

export default UserMenuButton;
