import React, { useState, useEffect } from "react";
import axios from "axios";

const DetailPoster = ({ tmdb_id, title }) => {
  const [posterUrl, setPosterUrl] = useState("");
  const api_key = "85c80594fd6c48b048f1ba880711aee4";
  useEffect(() => {
    const fetchPoster = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=${api_key}&language=en-US`
      ).then(response => {setPosterUrl(response.data.poster_path);});
    };
    fetchPoster();
  }, []);
  return (
    <img
      src={`https://image.tmdb.org/t/p/original${posterUrl}`}
      alt={title}
    />
  );
};

export default DetailPoster;
