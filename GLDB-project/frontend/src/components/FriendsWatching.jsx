import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DetailPoster from './DetailPoster';
import RatingRead from './ui/RatingStarsRead';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const FriendsWatching = () => {
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
      .get(`http://localhost:9000/api/movie/friendswatching/${user._id}`)
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
    <div className='featured-movies-friend'>
      <div className='featured-movies-friend__header'>
        <h1 className='featured-movies__writing'>
          What your friends are watching
        </h1>
      </div>
      <div className='movie-list-friend'>
        {empty ? (
          <h1 className='nomovies-text'>It seems like none of your friends have tagged any movies as watched</h1>
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
          </>
        )}

        <button
          className='slide-button-friend left'
          onClick={() => handleClick('left')}
        >
          &#8249;
        </button>
        <button
          className='slide-button-friend right'
          onClick={() => handleClick('right')}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default FriendsWatching;
