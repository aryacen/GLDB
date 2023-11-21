import React, { useEffect, useState, useContext } from "react";
import TopSection from "../components/TopSection";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const WishList = () => {
  const { user, dark } = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);
  let authorized = false;
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  if (String(user._id) == id) {
    authorized = true;
  }
  const [username, setUsername] = useState();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/wishlist/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setWishlist(response.data.wish_list);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const handleOnClick = (movie) => {
    axios
      .put(`http://localhost:9000/api/wishlist/remove/${id}`, {
        movieId: movie.movieId,
        movieTitle: movie.movieTitle,
        moviePoster: movie.moviePoster,
      })
      .then((response) => {
        console.log("removed movie", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const wishlistDiv = wishlist.map((item, index) => {
    const movieLink = `/movie/details/${item.movieId}`;
    index = index + 1;
    return (
      <div className={dark ? "wishlist-container-dark" : 'wishlist-container'} key={item.movieId}>
        <b className="index_wishlist">{index}. </b>
        <Link to={movieLink}>
          <img src={item.moviePoster} className="movie-poster_wishlist"></img>
          <b className="movie-title_wishlist">{item.movieTitle}</b>
        </Link>
        {authorized ? (
          <img
            src={require("../assets/decline.png")}
            className="remove-movie_wishlist"
            onClick={() => handleOnClick(item)}
          />
        ) : (
          <></>
        )}
      </div>
    );
  });

  return (
    <>
      <TopSection />
      {loaded ? (
        <>
          {" "}
          <div className="wishlist-text_container">
            <Link to={`/profile/${id}`}>
              <h1 className="h1-hover_wishlist">{username}'s wishlist</h1>
            </Link>
          </div>
          <div className="wishlist-movies_container">{wishlistDiv}</div>{" "}
        </>
      ) : (
        <div className="loading_container">
          <img
            src={dark ? require("../assets/loading_gif_transparent.gif") : require("../assets/loading_gif.gif")}
            className="loading-gif-img"
          />
        </div>
      )}
    </>
  );
};

export default WishList;
