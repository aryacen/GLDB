import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

import Search from "../components/Search";
import TopSection from "../components/TopSection";
import DetailsContainer from "../components/MovieDetailsContainer";
import ReviewList from "../components/ReviewList";
import ReviewFAB from "../components/ui/ReviewFab";
import MoviePageRecommendation from '../components/ui/MoviePageRecommendation';

const MovieDetails = () => {
  const { user } = useContext(AuthContext);
  const { movieId } = useParams();
  const [movieInfo, setMovie] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { dark } = useContext(AuthContext);

  const actions = [
    { label: 'About', icon: <div sadsa />, onClick: console.log },
  ];

  useEffect(() => {
    let ReviewURL;
    if (user != null) {
      ReviewURL = `http://localhost:9000/api/review/getReviewRemoveBanned/${user._id}/${movieId}`;
      fetch(
        `http://localhost:9000/api/review/getRatingRemoveBanned/${user._id}/${movieId}`
      )
        .then((response) => response.json())
        .then((data) => setRating(data))
        .catch((error) => {
          console.log(error);
        });
    } else {
      ReviewURL = `http://localhost:9000/api/review/getMovieAll/${movieId}`;
    }
    Promise.all([
      fetch(`http://localhost:9000/api/movie/details/${movieId}`),
      fetch(ReviewURL),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([movieInfo, reviews]) => {
        setMovie(movieInfo);
        setReviews(reviews);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (movieInfo.length !== 0) {
    let movie = {
      tmdb_id: movieId,
      title: movieInfo.title,
      genres: movieInfo.genres,
      casts: movieInfo.casts,
      rating: movieInfo.rating,
      keywords: movieInfo.keywords,
      tagline: movieInfo.tagline,
      overview: movieInfo.overview,
      director: movieInfo.director,
      poster:
        'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg',
    };
    console.log(movie.genres);

    if (user != null) {
      movie.rating = rating;
    }
    return (
      <>
        {loaded ? (
          <>
            <TopSection />
            <Search />
            <DetailsContainer movie={movie}></DetailsContainer>
            <ReviewList reviews={reviews}></ReviewList>
            <ReviewFAB movieId={movieId} />
          </>
        ) : (
          <>
            <>
              {' '}
              <div className='loading_container'>
                <img
                  src={require('../assets/loading_gif.gif')}
                  className='loading-gif-img'
                />
              </div>
            </>
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        <>
          {' '}
          <div className='loading_container'>
            <img
              src={dark ? require("../assets/loading_gif_transparent.gif") : require("../assets/loading_gif.gif")}
              className="loading-gif-img"
            />
          </div>
        </>
      </>
    );
  }
};

export default MovieDetails;
