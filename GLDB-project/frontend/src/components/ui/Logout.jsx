import React, { useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import DarkMode from "./Darkmode";
import Blank from "./Blank";
import ProfilePicture from "./ProfilePicture";

const Logout = () => {
  const navigate = useNavigate();

  const { user, loading, dispatch, dark } = useContext(AuthContext);
  const id = user._id;
  const link = `/profile/${id}`;
  const profile_picture = user.profile_picture;
  const border_color = user.border_color;
  const pro = user.pro_user;

  function handleSuccess() {
    navigate("/");
  }

  const handleClick = (event) => {
    event.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/");
    axios
      .get("http://localhost:9000/api/auth/logout")
      .then((response) => {
        console.log("Logout successful", response);
        handleSuccess();
      })
      .catch((error) => {
        console.log("Error logging out", error);
      });
  };

  return (
    <>
      <div className="logout__container">
        {pro ? <DarkMode /> : <Blank />}
        <h2>
          {loading ? (
            <img
              src={dark ? require("../../assets/loading_gif_transparent.gif") : require("../../assets/loading_gif.gif")}
              className="loading_profile_picture"
            />
          ) : (
            <Link to={link}>
              <ProfilePicture var1={[profile_picture, 'profile_picture', border_color]} />
            </Link>
          )}
        </h2>
        <button
          disabled={loading}
          className="logout__icon"
          onClick={handleClick}
        >
          Log out
        </button>
      </div>
    </>
  );
};

export default Logout;
