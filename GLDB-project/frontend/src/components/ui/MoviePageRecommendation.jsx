import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import ThumbnailList from "../ThumbnailList";

const MoviePageRecommendation = (genres, tmdb_id) => {
    const [movie, setMovie] = useState([]);
    let empty = true;
    let genreName = []
    genres.genres.map((genre) => {
        genreName.push(genre.name);
    })
    console.log(genreName);

    useEffect(() => {
        axios
            .post(`http://localhost:9000/api/movie/similarrecommendation`, {
                genres: genreName,
                tmdb_id: tmdb_id,
            })
            .then((response) => {
                setMovie(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    if (movie.length != 0) {
        empty = false;
    }

    return (
        <>
            {empty ? (
                <h1>You have not left any review</h1>
            ) : (
                <div>
                    <ThumbnailList movies={movie} />
                </div>
            )}
        </>
    );
};

export default MoviePageRecommendation;