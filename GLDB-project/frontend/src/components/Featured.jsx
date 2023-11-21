import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetailPoster from './DetailPoster';
import RatingRead from './ui/RatingStarsRead';
import { Link } from 'react-router-dom';

function Featured({ title }) {
  const [movies, setMovies] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

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
      .get(`http://localhost:9000/api/movie/featured`)
      .then((response) => {
        setMovies(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='featured-movies'>
      <div className='featured-movies__header'>
        <h1 className='featured-movies__writing'>Top Rated Movies</h1>
      </div>
      <div className='movie-list'>
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
          className='slide-button left'
          onClick={() => handleClick('left')}
        >
          &#8249;
        </button>
        <button
          className='slide-button right'
          onClick={() => handleClick('right')}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
export default Featured;
