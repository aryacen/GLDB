import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "../context/AuthContext";
import { fileToUrl } from "./utils/fileToUrl";
import axios from "axios";
import ProfilePicture from "./ui/ProfilePicture";
import UserReviewsButton from "./ui/UserReviewsButton";
import WatchTogetherButton from "./ui/WatchTogetherFab"

const ProfileView = () => {
  const [reqSent, setReqSent] = useState(false);
  const [banned, setBanned] = useState(false);
  const [bannedLoaded, setBannedLoaded] = useState(false);
  const [friends, setFriends] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [profilePicture, setProfilePicture] = useState();
  const [username, setUsername] = useState();
  const [border, setBorder] = useState();
  const [pro, setPro] = useState(false);

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { user } = useContext(AuthContext);
  const { dark } = useContext(AuthContext);

  const noClick = () => {};

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/users/${id}`)
      .then((response) => {
        setWishlist(response.data.wish_list);
        setProfilePicture(response.data.profile_picture);
        setUsername(response.data.username);
        setBorder(response.data.border_color);
        setPro(response.data.pro_user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:9000/api/users/friendrequeststatus", {
        senderId: user._id,
        receiverId: id,
      })
      .then((response) => {
        if (response.data) {
          setReqSent(true);
        } else {
          setReqSent(false);
        }
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:9000/api/users/friendstatus", {
        profileId: id,
        userId: user._id,
      })
      .then((response) => {
        if (response.data) {
          setFriends(true);
        } else {
          setFriends(false);
        }
      })
      .catch((error) => {
        console.error("Error checking friend status", error);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:9000/api/users/banstatus", {
        profileId: id,
        userId: user._id,
      })
      .then((response) => {
        if (response.data) {
          setBanned(true);
        } else {
          setBanned(false);
        }
        setBannedLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClickBan = () => {
    axios
      .post(`http://localhost:9000/api/banlist/ban/${user._id}`, {
        bannedId: id,
      })
      .then((response) => {
        console.log("banned user", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error banning user", error);
      });
  };

  const handleClickUnban = () => {
    axios
      .post(`http://localhost:9000/api/banlist/unban/${user._id}`, {
        unbanId: id,
      })
      .then((response) => {
        console.log("unbanned user", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error banning user", error);
      });
  };

  const wishlistDiv = wishlist
    .map((item) => {
      const movieLink = `/movie/details/${item.movieId}`;
      return (
        <div className="wishlist-view_visit" key={item.movieId}>
          <Link to={movieLink}>
            <img src={item.moviePoster} className="poster-preview"></img>
            <h2>{item.movieTitle}</h2>
          </Link>
        </div>
      );
    })
    .splice(0, 3);

  const handleClick = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/api/users/sendfriendrequest", {
        senderId: user._id,
        receiverId: id,
      })
      .then((response) => {
        console.log("friend reqeuest sent", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });
  };

  const wishlistLink = `/wishlist/${id}`;

  return (
    <>
      {!bannedLoaded ? (
        <div className="loading_container">
          <img
            src={dark ? require("../assets/loading_gif_transparent.gif") : require("../assets/loading_gif.gif")}
            className="loading-gif-img"
          />
        </div>
      ) : (
        <>
          <div className="profile-page">
            <div className="wishlist_container_view">
              <h1>Wishlist</h1>
              {wishlistDiv}
              <Link to={wishlistLink}>
                <button className="wishlist-button">View full wishlist</button>
              </Link>
            </div>
            <div className="profile-page_part2">
              <div className="profile-pictureview__container">
                <ProfilePicture var1={[
                  profilePicture,
                  'profile_picture_view',
                  border
                ]}/>
                
              </div>
              {pro ? (
                <>
                  <img
                    src={require('../assets/prologo.png')}
                    className='pro-badge_profileview'
                    title='This user is a pro user!'
                  />
                </>
              ) : (
                <>
                  <img
                    src={require('../assets/prologo.png')}
                    className='pro-badge_profileview_clear'
                  />
                </>
              )}
              <p>{username}</p>
              <div className="friend-button__container">
                {friends ? (
                  <img src={require("../assets/friend_icon.png")}
                  className="friend-icon_view"/>
                ) : (
                  <button
                    className={reqSent ? "req-pending-button" : "friend-button"}
                    onClick={reqSent ? noClick : handleClick}
                  >
                    {reqSent ? "Request pending" : "Send friend request"}
                  </button>
                )}
              </div>
              <div className="ban-list__container">
                {bannedLoaded ? (
                  <button
                    className={banned ? "unban-user-button" : "ban-user_button"}
                    onClick={banned ? handleClickUnban : handleClickBan}
                  >
                    {banned ? "Remove from ban list" : "Add to ban list"}
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <UserReviewsButton id = {id}/>
            {friends && <WatchTogetherButton userId={id} />}
          </div>
        </>
      )}
    </>
  );
};

export default ProfileView;
