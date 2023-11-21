import React, { useContext } from "react";
import Thumbnail from "./ThumnailContainer";
import { AuthContext } from "../context/AuthContext";
import RatingRead from "./ui/RatingStarsRead";

const ThumbnailList = ({ movies }) => {
  const { dark } = useContext(AuthContext);
  if (movies.length == 0) {
    return (
      <div className='loading_container'>
        <img
          src={dark ? require("../assets/loading_gif_transparent.gif") : require("../assets/loading_gif.gif")}
          className="loading-gif-img"
        />
      </div>
    )
  } else {
    return (
      <div className="thumbnailList">
        {movies.map((movie) => (
          <div key={movie.tmdb_id}>
            <Thumbnail
              title={movie.title}
              link={`/movie/details/${movie.tmdb_id}`}
              tmdb_id={movie.tmdb_id}
            />
            <RatingRead rating={movie.rating} />
          </div>
        ))}
      </div>
    );
  }
};

export default ThumbnailList;
