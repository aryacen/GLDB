import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const BannedUserContainer = ({ bannedUserId }) => {
  const { user } = useContext(AuthContext);
  const link = `/profile/${ bannedUserId }`;
  const [loaded, setLoaded] = useState(false);
  const [username, setUsername] = useState();
  const [profilePic, setProfilePic] = useState();
  const [pro, setPro] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/users/${bannedUserId}`)
      .then((response) => {
        setUsername(response.data.username);
        setProfilePic(response.data.profile_picture);
        setPro(response.data.pro_user);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  })

  return (
    <div className="banned-user-container">
      <Link
        to={user ? link : `http://localhost:3000/login`}
        className="review-user-details"
      >
        <img
          src={profilePic}
          alt="Profile Picture"
          className="profile-picture"
        />
        <span>{username}</span>
        {pro ? (
          <img
            src={require("../assets/prologo.png")}
            className="user-pro_logo"
          ></img>
        ) : (
          <></>
        )}
      </Link>
    </div>
  );
};

export default BannedUserContainer;
