import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DetailPoster from './DetailPoster';
import RatingRead from './ui/RatingStarsRead';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Recommendations = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useContext(AuthContext);
  let empty = true;

  const handleClick = (direction) => {
    if (direction === 'left') {
      setCurrentIndex(
        (currentIndex + movies.length + (direction === 'left' ? -1 : 1)) %
        movies.length
      );
    } else {
      setCurrentIndex((currentIndex + 1) % movies.length);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/movie/recommendations/${user._id}`)
      .then((response) => {
        setMovies(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  if (movies.length != 0) {
    empty = false;
  }

  return (
    <div className='featured-movies-recommendation'>
      <div className='featured-movies-recommendation__header'>
        <h1 className='featured-movies__writing'>Recommended movies for you</h1>
      </div>
      <div className='movie-list-recommendation'>
        {empty ? (
          <h1 className='empty-preference-text'>It seems like you have not set your preferred genres</h1>
        ) : (
          <>
            {movies.slice(currentIndex, currentIndex + 5).map((movie) => (
              <div key={movie.tmdb_id} className='movie'>
                <Link to={`/movie/details/${movie.tmdb_id}`}>
                  <div className='poster'>
                    <DetailPoster tmdb_id={movie.tmdb_id} />
                    <div className='movie_title_container'>
                      <h3 className='movie_title_writing'>{movie.title}</h3>
                    </div>
                    <span>
                      <RatingRead rating={movie.rating} />
                      <p>{Math.round(movie.rating * 10) / 10} / 5</p>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
            <button
              className='slide-button-recommendation left'
              onClick={() => handleClick('left')}
            >
              &#8249;
            </button>
            <button
              className='slide-button-recommendation right'
              onClick={() => handleClick('right')}
            >
              &#8250;
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
