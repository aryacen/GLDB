import React, { useState } from 'react';

function Rating({ rating, onRatingChange }) {
  
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    onRatingChange(index);
  };

  return (
    <div className="rating-container">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className="star"
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1 <= (hoverRating || rating) ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export default Rating;