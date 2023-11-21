import React, { useContext, useState, useEffect } from "react";
import GenreCapsule from "./ui/GenreCapsule";
import CastCapsule from "./ui/CastCapsule";
import KeywordCapsule from "./ui/KeywordCapsule";
import RatingRead from "./ui/RatingStarsRead";
import DetailPoster from "./DetailPoster";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DetailsContainer = ({ movie }) => {
  const api_key = "85c80594fd6c48b048f1ba880711aee4";
  const { user, dispatch } = useContext(AuthContext);
  const [posterUrl, setPosterUrl] = useState();
  const [inWishlist, setInWishlist] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const navigate = useNavigate();
  const { dark } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie.tmdb_id}?api_key=${api_key}&language=en-US`
      )
      .then((response) => {
        setPosterUrl(response.data.poster_path);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  const moviePoster = `https://image.tmdb.org/t/p/original${posterUrl}`;

  useEffect(() => {
    if (user != null) {
      axios
        .post("http://localhost:9000/api/wishlist/inwishlist", {
          id: user._id,
          movieId: movie.tmdb_id,
        })
        .then((response) => {
          if (response.data) {
            setInWishlist(true);
          } else {
            setInWishlist(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setInWishlist(false);
    }
  });

  useEffect(() => {
    if (user != null) {
      axios
        .post("http://localhost:9000/api/users/inwatchlist", {
          id: user._id,
          movieId: movie.tmdb_id,
        })
        .then((response) => {
          if (response.data) {
            setInWatchlist(true);
          } else {
            setInWatchlist(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setInWatchlist(false);
    }
  });

  const handleClickAdd = () => {
    axios
      .put(`http://localhost:9000/api/wishlist/add/${user._id}`, {
        movieId: movie.tmdb_id,
        movieTitle: movie.title,
        moviePoster: moviePoster,
      })
      .then((response) => {
        dispatch({
          type: "UPDATE_USER",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClickWatch = () => {
    axios
      .put(`http://localhost:9000/api/users/watch/${user._id}`, {
        movieId: movie.tmdb_id,
        movieTitle: movie.title,
        moviePoster: moviePoster,
      })
      .then((response) => {
        dispatch({
          type: "UPDATE_USER",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClickRemove = () => {
    axios
      .put(`http://localhost:9000/api/wishlist/remove/${user._id}`, {
        movieId: movie.tmdb_id,
        movieTitle: movie.title,
        moviePoster: moviePoster,
      })
      .then((response) => {
        console.log("removed movie to wishlist", response.data);
        dispatch({
          type: "UPDATE_USER",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClickUnwatch = () => {
    axios
      .put(`http://localhost:9000/api/users/removewatch/${user._id}`, {
        movieId: movie.tmdb_id,
        movieTitle: movie.title,
        moviePoster: moviePoster,
      })
      .then((response) => {
        dispatch({
          type: "UPDATE_USER",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      })
  };

  const handleGenreClick = (genre) => {
    console.log(`Clicked on ${genre}`);
  };

  const handleClickLoggedOut = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="detail-poster-container">
        <div className="detail-poster">
          <DetailPoster tmdb_id={movie.tmdb_id} title={movie.title} />
        </div>
        <div className="detail-poster-background">
          <DetailPoster tmdb_id={movie.tmdb_id} title={movie.title} />
        </div>
        <div className="detail-poster-background-black">Black</div>
      </div>

      <div className="movie-details">
        <div className="movie-detail-info">
          <h1 style={{ fontSize: "36pt" }}>{movie.title}</h1>

          <span>
            <strong style={{ fontSize: "18pt" }}>Genre: </strong>
            <div className="genre-list">
              {movie.genres.map((genre) => (
                <GenreCapsule
                  key={genre.id}
                  genre={genre.name}
                  onClick={() => handleGenreClick(genre.id)}
                />
              ))}
            </div>
          </span>
          
          <div>
            <strong style={{ fontSize: "18pt" }}>Director: {movie.director.name}</strong>
          </div>

          <div>
            <strong style={{ fontSize: "18pt" }}>Cast: </strong>
            <div className="cast-list">
              {movie.casts.map((cast) => (
                <CastCapsule
                  key={cast.cast_id}
                  cast={cast}
                  onClick={() => handleGenreClick(cast.id)}
                />
              ))}
            </div>
          </div>

          <span>
            <strong style={{ fontSize: "18pt" }}>Rating:</strong>
            <RatingRead rating={movie.rating} />
          </span>

          <div>
            <strong style={{ fontSize: "18pt" }}>Keywords: </strong>
            <span className="keyword-list">
              {movie.keywords.map((keyword) => (
                <KeywordCapsule
                  key={keyword.id}
                  keyword={keyword.name}
                  onClick={() => handleGenreClick(keyword.id)}
                />
              ))}
            </span>
          </div>
          <p style={{ fontSize: "18pt" }}>
            <strong>Tagline:</strong> {movie.tagline}
          </p>
          <div className="overview-container" style={{ fontSize: "18pt" }}>
            <strong>Overview: </strong>
            {movie.overview}
          </div>
        </div>
      </div>

      <div className="wishlist-icon_container">
        {inWishlist ? (
          <img
            src={require("../assets/add_wishlist.png")}
            className="wishlist-icon"
            onClick={user ? handleClickRemove : handleClickLoggedOut}
          ></img>
        ) : (
          <img
            src={require("../assets/wishlist.png")}
            className="wishlist-icon"
            onClick={user ? handleClickAdd : handleClickLoggedOut}
          ></img>
        )}
      </div>
      <div className="watched-icon_container">
          {inWatchlist ? (
            <>
            <img
              src={require("../assets/watched_icon.png")}
              className="watchlist-icon"
              onClick={user ? handleClickUnwatch : handleClickLoggedOut}
            />
            <h2>Watched</h2>
            </>
          ) : (
            <>
            <img
              src={require("../assets/watched_icon.png")}
              className="watchlist-icon"
              onClick={user ? handleClickWatch : handleClickLoggedOut}
            />
            <h3>Not Watched</h3>
            </>
          )}
      </div>
    </>
  );
};

export default DetailsContainer;
